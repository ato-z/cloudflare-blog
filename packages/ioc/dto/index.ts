import { jumpHandle } from './method/isLoose';
import { touchValidate, type Validate } from './method/touchValidate';
export * from './method';

export class Dto {
  static params: Record<string, unknown> = {};

  constructor() {
    Object.defineProperty(this, '_withNames', {
      value: new Set<string>(),
      enumerable: false,
      writable: false,
    });
  }

  async check() {
    this.merge();
    const validate = [...touchValidate(this)];
    const _withNames = <Set<string>>Reflect.get(this, '_withNames');
    let cur: Validate | undefined;
    const trigger = async () => {
      cur = validate.shift();
      if (cur === undefined) {
        return false;
      }

      const [name, handle] = cur;
      if (!_withNames.has(name)) {
        const value = Reflect.get(this, name);
        if (handle === jumpHandle && (value === undefined || value === null)) {
          _withNames.add(name);
        } else {
          await handle(value);
        }
      }

      await trigger();
    };

    try {
      await trigger();
    } catch (err: unknown) {
      if (err instanceof Error) {
        const [name] = cur ?? [''];
        const msg = `${name} ${err.message}`;
        throw new TypeError(msg);
      }

      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  toJSON() {
    this.merge();
    return this;
  }

  private merge() {
    const props = Object.keys(this);
    props.forEach(key => {
      if (key !== '_withNames_') {
        this[key] = Dto.params[key];
      }
    });
  }
}
