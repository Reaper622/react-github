# React-Github

### 使用 React + Next.js + Koa + Redis 实现的第三方Github平台

- Next.js: 实现SSR功能

- Koa: Node.js Http服务端框架
- Redis:  高效内存数据库
- OAuth: 第三方授权登录系统



##### 如何使用？

- 下载代码

```
git clone https://github.com/Reaper622/react-github
```

- 安装依赖

```
npm install
```

- 根据config.sample.js 完成配置，并重命名为 config.js

> 需使用 Github OAuth， 具体在 Settings > Developer settings > OAuth Apps 进行设置

- 开发环境  执行完毕访问 [localhost:3000](http://localhost:3000)

```
npm run dev
```

- 生产环境

```
npm run start
```

- 打包

```
npm run build
```

