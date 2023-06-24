import { useApp } from '../useApp';
import { Context } from './Context';
import { Queue, type JobCurrent } from './Queue';
import { Result } from './Result';

export class App {
  private readonly queue = new Queue();

  use(handle: JobCurrent) {
    this.queue.push(handle);
  }

  async fetch(request: Request, env: Env): Promise<Response> {
    const ctx = new Context(request, env);

    await useApp(ctx);

    const result = await this.queue.up(ctx);
    if (result instanceof Response) {
      return result;
    }

    return new Result(result).response();
  }

  get to(): { fetch: (typeof App.prototype)['fetch'] } {
    const { fetch } = this;
    const handle = fetch.bind(this) as (
      request: Request,
      env: Env,
    ) => Promise<Response>;

    return { fetch: handle };
  }
}
