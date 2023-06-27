const withCursor = <T extends Record<string | number | symbol, unknown>, S>(
  input: T,
): input is T & { cursor: S } => input['cursor'] !== undefined;

export class KvStore<
  S extends Record<string | number, unknown>,
  R extends Record<string | number, unknown>,
> {
  constructor(
    protected readonly kv: KVNamespace,
    protected type: 'text' | 'json' | 'arrayBuffer' | 'stream' = 'json',
  ) {}

  /**
   * 查询一组元数据集合
   * @param limit 数量
   * @param _cursor 上回查询游标
   * @param prefix key前缀
   */
  async list(
    limit: number,
    _cursor: string | null = null,
    prefix: string | null = null,
  ) {
    const result = await this.kv.list<S>({
      limit,
      cursor: _cursor,
      prefix,
    });
    const list = result.keys.map(({ name, metadata }) => ({
      key: name,
      data: metadata!,
    }));

    let cursor: null | string = null;
    if (withCursor<KVNamespaceListResult<S>, string>(result)) {
      cursor = result.cursor;
    }

    return {
      list,
      over: result.list_complete,
      cursor,
    };
  }

  /**
   * 查询包含完整数据数据，不存在则返回null
   * @param key 唯一key
   */
  async get(key: string) {
    const { kv } = this;
    const { value, metadata } = await kv.getWithMetadata<R, S>(key, 'json');

    if (value !== null) {
      const s = (metadata ?? {}) as S;
      return { value, metadata: s };
    }

    return null;
  }

  /**
   * 获取值，不存在返回null
   * @param key 唯一key
   * @param cacheTtl 缓存查询时间，接受一个秒数。如600缓存600秒查询的结果
   */
  async getSimple(key: string, cacheTtl?: number) {
    const { kv, type } = this;
    const _type = type as unknown as 'json';
    if (cacheTtl !== undefined) {
      const value = await kv.get<R>(key, { cacheTtl, type: _type });
      return value;
    }

    if (cacheTtl === undefined) {
      const value = await kv.get<R>(key, { type: _type });
      return value;
    }

    return null;
  }

  /**
   * 写入或者创建数据
   * @param key 唯一key，存在则更新。不存在创建
   * @param value 值
   * @param op.metadata 元数据
   * @param op.expiration 使用以 UNIX 纪元以来的秒数指定的绝对时间设置密钥的过期时间. 例如，如果您希望密钥在 2019 年 4 月 1 日凌晨 12:00 UTC 过期，您可以将密钥的过期时间设置为1554076800。
   * @param op.expirationTtl 使用从当前时间算起的相对秒数设置密钥的有效期 (TTL)。例如，如果您希望密钥在创建后 10 分钟过期，您可以将其过期 TTL 设置为600。
   */
  async push(
    key: string,
    value: R,
    op: {
      metadata?: Partial<S>;
      expiration?: number;
      expirationTtl?: number;
    },
  ): Promise<void> {
    const { kv } = this;
    const json = JSON.stringify(value);

    await kv.put(key, json, op);
  }

  /**
   * 删除一条数据
   * @param key 唯一key
   */
  async remove(key: string) {
    const { kv } = this;
    await kv.delete(key);
  }
}
