import { jumpHandle } from './method/isLoose';
import { touchValidate, type Validate } from './method/touchValidate';
export * from './method';

export class Dto {
  static params: Record<string, unknown> = {};

  async check() {
    this.merge();
    const validate = [...touchValidate(this)];
    let cur: Validate | undefined;
    const trigger = async () => {
      cur = validate.shift();
      if (cur === undefined) {
        return false;
      }

      const [name, handle] = cur;
      const value = Reflect.get(this, name);
      if (!(handle === jumpHandle && (value === undefined || value === null))) {
        await handle(value);
        await trigger();
      }
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
      this[key] = Dto.params[key];
    });
  }
}
