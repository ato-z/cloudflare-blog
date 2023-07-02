# cloudflare blog

基于 cloudflare 服务构建的博客系统

> 代码提交格式
>
> - 🚲 添加
> - 🛵 迭代
> - 🏍️ 修改
> - 🦼 删除

## 🚧 环境安装

```sh
npm install
# or
pnpm install
```

## ⚓️ 配置登录

```sh
npx wrangler login

# 如果是mac用户，使用
sudo npx wrangler log
```

## 🧩 线上域名配置

> 修改根目录下的 `.domain.json`， 查看[zoomId](https://developers.cloudflare.com/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) 获取

```json
{
  "zerg": {
    /** 接口地址，所配置域名区域id */
    "api": {
      "target": "<example.com|你的域名>",
      "zoneId": "<区域id>"
    },
    /** 界面地址，所配置域名区域id */
    "web": {
      "target": "<example.com|你的域名>",
      "zoneId": "<区域id>"
    }
  }
}
```

## 🛞 部署到线上 api

初始化 d1 r2 kv 环境，必须在 `npx wrangler login` 登录过后执行

```sh
npm run workers:init
```

创建 d1 数据库

```sh
npm run workers:install
```

对齐配置，每回修改`.wrangler.json` `.domain.json` 文件后执行一次

```sh
npm run workers:algin
```

### 🚠 workers 发布生产环境

发布 workers 到 cloudflare， 接口已可调用

```sh
npm run workers:deploy
```

### 🚟 workers 本地开发环境

```sh
npm run workers:dev
```
