
# vue+express+mongoDB实现的

###一.技术栈:
  1. 前端使用vue+vuex+axios；
  2. nodejs的express框架；
  3. 数据库mongoDB；
  4. nginx反向代理；
  5. pm2托管进程；
  
  
###二.简介
  &nbsp;&nbsp;由于时间关系，没有写样式，页面比较简陋。主要是为了实验实现的功能能否正常使用。实现的功能有：
  1. 用户登录登出（帐号：admin， 密码：123456）
  2. 商品列表及价格区间筛选；
  3. 添加到购物车，商品数量加减按钮，删除商品等功能；
  4. 用户地址管理，默认地址和地址删除  
  &nbsp;&nbsp;后端代码放在server2文件中，在本地运行vue时，同时也要运行server2；
  &nbsp;&nbsp;本地安装完mongoDB后，我又装了robo3t，方便导入数据；
  
  
 ###三.项目截图  
 
    首页：
    ![](https://raw.githubusercontent.com/AUSERGEE/vue-express-mongoDB-/master/page-img/01.png) 
    购物车：
    ![](https://raw.githubusercontent.com/AUSERGEE/vue-express-mongoDB-/master/page-img/2.png)  
    地址管理：
    !![](https://raw.githubusercontent.com/AUSERGEE/vue-express-mongoDB-/master/page-img/3.png)  
    登录页面
    ![](https://raw.githubusercontent.com/AUSERGEE/vue-express-mongoDB-/master/page-img/4.png)  
    
 
  



