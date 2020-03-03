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
1. 搜作者，search结果为author
2. 点击作者详情，detail结果为author
3. 在作者详情页点击论文详情，detail结果为paper
4. 回退作者详情页，detail类型不匹配

解决方案：
1. 每一次到详情页面的跳转都记录下请求的url，回退/前进时（监听浏览器的前进/回退事件），都再次发起请求（有http缓存），同时改变method
2. 每次详情数据返回时，都将method改为请求url中的method


- 刷新后页面数据全消失，且会跳转到首页
- 打包体积太大，懒加载，tree shaking