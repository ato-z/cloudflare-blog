import { partRouter, partParams, partMultipartFormData } from '@ato-z/helper';

export class Context {
  public domain: string;
  public url: string;
  public params: unknown;
  public headers: Request['headers'];
  public method: string;

  private _body: unknown = null;

  constructor(public request: Request, public env: Env) {
    const { headers, method, url } = request;

    Object.assign(this, partRouter(url));

    this.headers = headers;
    this.method = method;
  }

  async getBody<S>() {
    let body = this._body;
    if (body === null) {
      body = await this.withBody();
    }

    return body as S;
  }

  async toProp<P, B>() {
    const body = await this.withBody();
    const { url, params, domain, method, headers } = this;
    const headerAll: Array<[string, string]> = [];

    headers.forEach((...argv) => {
      const [value, key] = argv;
      headerAll.push([key, value]);
    });

    return {
      url,
      params: params as P,
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

    const clone = new Response(request.body, request);
    const contentType: string =
      headers.get('content-type') ??
      headers.get('Content-Type') ??
      headers.get('ContentType') ??
      headers.get('content-type'.toUpperCase()) ??
      '';

    if (/multipart\/form-data/i.test(contentType)) {
      const reg = /boundary=(.+)$/i;
      const regResult = reg.exec(contentType);
      if (regResult === null) {
        this._body = {};
        return this._body;
      }

      const [, boundary] = regResult;
      const _body = await clone.text();
      this._body = partMultipartFormData(_body, boundary);
    } else if (/application\/x-www-form-urlencoded/i.test(contentType)) {
      const urlencoded = await clone.text();
      this._body = partParams(urlencoded);
    } else if (/application\/json/i.test(contentType)) {
      this._body = await clone.json();
    } else {
      this._body = await clone.text();
    }

    return this._body;
  }
}
