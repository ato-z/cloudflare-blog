import { partRouter, partParams } from '@ato-z/helper';

export class Context<P = Record<string, string>> {
  public domain: string;
  public url: string;
  public params: P;
  public headers: Request['headers'];
  public method: string;

  private _body: unknown = null;

  constructor(public request: Request, public env: Env) {
    const { headers, method, url } = request;

    Object.assign(this, partRouter(url));

    this.headers = headers;
    this.method = method;
  }

  async getBody<B extends Record<string, unknown>>() {
    let body = this._body;
    if (body === null) {
      body = await this.withBody();
    }

    return body as B;
  }

  async toProp<B>() {
    const body = await this.withBody();
    const { url, params, domain, method, headers } = this;
    const headerAll: Array<[string, string]> = [];

    headers.forEach((...argv) => {
      const [value, key] = argv;
      headerAll.push([key, value]);
    });

    return {
      url,
      params,
      body: body as B,
      domain,
      method,
      headers: Object.fromEntries(headerAll),
    };
  }

  private async withBody() {
    const { request, headers, method } = this;
    if (!/post/i.test(method)) {
      return {};
    }

    if (this._body) {
      return this._body;
    }

    const contentType: string =
      headers.get('content-type') ??
      headers.get('Content-Type') ??
      headers.get('ContentType') ??
      headers.get('content-type'.toUpperCase()) ??
      '';

    if (/multipart\/form-data/i.test(contentType)) {
      const body = await request.formData();
      this._body = body;
    } else if (/application\/x-www-form-urlencoded/i.test(contentType)) {
      const urlencoded = await request.text();
      this._body = partParams(urlencoded);
    } else if (/application\/json/i.test(contentType)) {
      this._body = await request.json();
    } else {
      this._body = await request.text();
    }

    return this._body;
  }
}
