export class Result {
  protected charset = 'UTF-8';
  protected body = '';
  protected bodyType = 'text/plain';

  constructor(protected content: unknown, protected code: number = 200) {
    this.checkContentType();
  }

  /** 响应内容 */
  response(headers: Record<string, unknown> = {}) {
    const { body, bodyType, code, charset } = this;
    return new Response(body, {
      status: code,
      headers: {
        'content-type': `${bodyType}; charset=${charset}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        ...headers,
      },
    });
  }

  /** 重定向 */
  redirect(url: string, code = 301) {
    return Response.redirect(url, code);
  }

  private checkContentType() {
    const { content } = this;
    if (typeof content === 'string') {
      this.body = content;
      try {
        JSON.parse(content);
        this.body = content;
        this.bodyType = 'application/json';
      } catch {
        if (/<[a-z][\s\S]*>/.test(content)) {
          this.bodyType = 'text/html';
        }
      }
    } else {
      try {
        const body = JSON.stringify(content);
        this.body = body;
        this.bodyType = 'application/json';
      } catch {
        this.body = content?.toString() ?? '';
      }
    }
  }
}
