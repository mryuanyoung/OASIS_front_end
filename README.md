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


## todo
- 结果再搜索
- 论文搜索：排序
- 论文详情：相关论文推荐？ 引用趋势变化？
- 作者详情：学术关系图、活跃度图、研究方向与研究兴趣、标志某一方向的关键学者（图计算？）
- 机构详情：机构活跃度图、研究方向图（词云?)、识别关键机构？
- 学者详情页面到机构的跳转