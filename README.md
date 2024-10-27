# “慧眼扫站”--加油站安全作业智能管理系统web前端代码

## 本项目地址：https://ps.gwcampus.cn
* 测试期间账号：
    * 总公司权限：20230101
    * 分公司权限：20230102
    * 加油站权限：20230109
    * 密码均为：123456

## 项目介绍
### 项目功能
“慧眼扫站”作品基于YOLOv5等模型和方法，实现了对加油站6种重点违规行为的智能监测，实现了对违规行为截图、上传图片、语音播报和短信提醒等功能，实现了违规行为数据可以在不同级别的管理部门中及时共享、展示和处理等功能。
作品以中国石油广东销售公司为研究对象，以企业真实诉求和数据为基础，通过“视频监控+AI算法”，将“人防”转变为“人防+技防”，提升监管效率，帮助企业解决痛点和难点问题。
该作品需要开发基于Web的安全管理子系统，供成品油销售公司的管理人员使用。同时，需要根据成品油销售公司的组织架构和安全管理需求，将该系统划分为三个级别的子系统：即省公司总控系统、分公司分控系统和加油站管理系统，分别服务于成品油销售公司的三级管理部门。三个子系统需要分工明确，但又相互影响，配合实现对加油站现场的安全管理。
### 系统功能模块图
![alt text](image.png)
### 前端开发技术栈
前端使用Vue框架来搭建项目，通过Vue-cli脚手架来辅助开发，页面路由使用了Vue的官方路由Vue-router并通过路由懒加载模式来渲染页面，以此降低资源浪费。网络请求通过axios来实现，组件使用ElementUI组件库来提高开发效率，可视化视图使用了Echarts图表库来编写，配置了souce-map来增强打包后代码调试。
### 前端开发重难点
（1）权限管理复杂
如何将三级权限的身份有序的编写在同一个系统中为本系统前端开发的重难点。三级权限之间既有相同的功能共同使用，也有分权的功能来进行相互沟通并相互影响，系统应做到按权展示对应功能模块并协调好权限秩序。本项目根据用户权限来动态生成请求URL及功能菜单再映射对应路由。

（2）使用路由懒加载技术提高系统响应速度
本系统集成了三种权限身份的对应功能，页面资源、数据资源体量较大，如何减少不必要的资源消耗是一个重难点。系统通过路由懒加载的方法，来避免系统进入时一次性加载完未打开的页面资源和非本权限可查看的页面资源，有效减少了资源浪费及用户进入系统等待时间过长的问题，提升了用户体验；
（3）设计多种数据统计和展示方法
为了让不同级别的管理部门都能清晰地看到违规行为数据的统计结果，及时进行安全管理，如何直观又详细地将违规行为数据及安全巡检数据呈现给用户是前端开发的重难点问题。
本系统采用可视化查看和列表查看两种方式来实现“直观”和“详细”的目的：可视化查看功能使用Echarts库的饼图和折线图来渲染呈现统计后的数据，列表查看功能详细展示了每条数据的具体信息。


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

