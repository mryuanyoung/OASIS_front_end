# OASIS_front_end #
- 使用create-react-app搭建
- 用react-app-rewired扩展功能,可在config-overrides.js中配置
- 技术选型: react/redux/react-router/antd
- 若未安装nodejs, 先在 https://nodejs.org/zh-cn/ 中下载LTS版本并安装
- 若外网连接速度慢, 可将npm源改为淘宝镜像源:
  - npm config set registry http://registry.npm.taobao.org/

## 启动 ##
1. npm install (仅首次启动项目时需要执行)
2. npm run start


## 构建 ##
- npm run build

## 测试 ##
- npm run test

## git流程 ##
1. git pull (一定不要忘了先pull)
2. coding...
3. git add .
4. git commit -m 'xxx'
5. git push


## problems
- 刷新加载原来的/服务端渲染
- 分页请求


- 首次发起的请请求：清空res，page，total，oldmethod，oldkeyword

  - 如果total超过50，res.length = total,前50个用res替代，page和offset改变

  - 不超过50则直接返回结果，改变res、total     offset不改变
- offset={page}，替换掉res中相应的条目