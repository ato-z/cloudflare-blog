/**
 * 初始化操作
 */
const sha1 = require('sha1');
const sh = require('shelljs');
const { wranglerConfig, upWranglerConfig } = require('../helper');
const { d1Databases, kvNamespaces, r2Buckets } = wranglerConfig;

// 检查d1数据库是否完整
d1Databases.forEach(db => {
  if (typeof db.databaseId !== 'string') {
    const databaseName = `${wranglerConfig.name}_${sha1(
      Math.random(),
    )}`.substring(0, 12);

    const out = sh.exec(`wrangler d1 create ${databaseName}`);
    if (out.code !== 0) {
      upWranglerConfig({ d1Databases });
      throw new Error('🤡 D1创建失败');
    }

    const databaseId = /database_id\s?=\s?"(.+)"/.exec(out)[1];
    Object.assign(db, { databaseName, databaseId });
    upWranglerConfig({ d1Databases });
  }
});

// 检查kv是否完整
kvNamespaces.forEach(kv => {
  if (typeof kv.id !== 'string') {
    const binding = `${wranglerConfig.name}_${sha1(Math.random())}`.substring(
      0,
      12,
    );
    const out = sh.exec(`wrangler kv:namespace create ${binding}`);
    if (out.code !== 0) {
      upWranglerConfig({ kvNamespaces });
      throw new Error('🤡 kv创建失败');
    }

    const id = /id\s?=\s?"(.+)"/.exec(out)[1];
    Object.assign(kv, { id, previewId: id });
  } else if (kv.previewId !== 'string') {
    kv.previewId = kv.id;
  }

  upWranglerConfig({ kvNamespaces });
});

// 检查R2储存桶是否完整
r2Buckets.forEach(r2 => {
  if (typeof r2.bucketName !== 'string') {
    const bucketName = `static-${sha1(Math.random())}`.substring(0, 12);
    sh.exec(`wrangler r2 bucket create ${bucketName}`);
    r2.bucketName = bucketName;
    r2.previewBucketName = bucketName;
    upWranglerConfig({ r2Buckets });
  } else if (typeof r2.previewBucketName !== 'string') {
    r2.previewBucketName = r2.bucketName;
    upWranglerConfig({ r2Buckets });
  }
});
