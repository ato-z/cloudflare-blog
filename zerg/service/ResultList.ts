export type FnResult<R extends (...args: any[]) => unknown> =
  ReturnType<R> extends Promise<infer P> ? P : ReturnType<R>;
export type PromiseResult<N> = N extends Promise<infer R> ? R : N;

export type Getting<T> = {
  [P in keyof T]?: (val: T[P], key: P, data: T) => any;
};
type GettingResult<S, T> = {
  [P in keyof T | keyof S]: P extends keyof T
    ? T[P] extends (...args: any[]) => infer R
      ? PromiseResult<R>
      : any
    : P extends keyof S
    ? S[P]
    : never;
};

export type Appending<T extends unknown> = Record<string, (data: T) => unknown>;

export type AppendingResult<S, R extends Appending<unknown>> = S & {
  [P in keyof R]: FnResult<R[P]>;
};

export class ServiceResultList<
  T,
  G extends Getting<T>,
  H extends Array<string>,
  A extends Appending<T>,
> {
  constructor(
    readonly list: T[],
    readonly getting: G,
    readonly hideing: H,
    readonly appending: A,
  ) {}

  append(
    key: string | Record<string, (data: T) => unknown>,
    cb?: (data: T) => unknown,
  ) {
    if (typeof key === 'string') {
      Reflect.set(this.appending, key, cb);
    } else {
      Object.assign(this.appending, key);
    }

    return this;
  }

  hidden<S extends keyof T & string>(key: S | S[]) {
    if (key instanceof Array) {
      this.hideing.push(...key);
    } else {
      this.hideing.push(key);
    }

    return this;
  }

  /** 返回第一条数据 */
  get first() {
    const [first] = this.list;
    if (first === undefined) {
      return null;
    }

    return first as T;
  }

  async toJSON() {
    const { list } = this;
    const codeList = list.map(async data => {
      const result = await this.inGetting(data);
      const appendResult = await this.inAppend(result);
      const fillterHidden = this.inHideing(appendResult);

      return fillterHidden as unknown as AppendingResult<
        Omit<GettingResult<T, G>, H[number]>,
        A
      >;
    });

    const result = await Promise.all(codeList);

    return result;
  }

  private async inGetting(data: T) {
    if (typeof data !== 'object') return data;
    const vals: Array<Promise<unknown>> = [];
    const keys: string[] = [];
    this.eachData(data, (key, val) => {
      vals.push(val);
      keys.push(key);
    });

    const resultVals = await Promise.all(vals);
    const entries: Array<[string, unknown]> = keys.map((key, i) => [
      key,
      resultVals[i],
    ]);

    return Object.fromEntries(entries);
  }

  private inHideing<R>(data: R) {
    const keys = Object.keys(data as object);
    const { hideing } = this;
    const entries: Array<[string, unknown]> = [];
    keys.forEach(key => {
      if (!hideing.includes(key as keyof T & string)) {
        entries.push([key, (data as any)[key]]);
      }
    });

    return Object.fromEntries(entries);
  }

  private async inAppend<R>(data: R) {
    const appending = this.appending ?? {};
    const appendKeys = Object.keys(appending);
    const vals: unknown[] = [];
    const appendEntries: Array<[string, number]> = [];

    appendKeys.forEach(key => {
      const handle = Reflect.get(appending, key);
      if (typeof handle === 'function') {
        appendEntries.push([key, vals.push(handle(data as unknown as T))]);
      }
    });

    const appendVals = await Promise.all(vals);
    const appendData = Object.fromEntries(
      appendEntries.map(([key, index]) => [key, appendVals[index - 1]]),
    );

    return { ...data, ...appendData };
  }

  private eachData(data: T, cb: (key: string, val: Promise<unknown>) => void) {
    const { getting } = this;
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
      }

      const gettirgger = Reflect.get(getting, key);
      const val = data[key];
      if (typeof gettirgger === 'function') {
        const newVal = Promise.resolve(gettirgger(val, key, data));
        cb(key, newVal);
      } else {
        cb(key, Promise.resolve(val));
      }
    }
  }
}
