PM2一键部署

http://pm2.keymetrics.io/

PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

#### 好处

1. 无需通过手工或是ftp的方式把本地代码拷贝到服务器上
2. 无需手工启动或是重启远程服务器的Node服务
3. 项目的升级及迭代非常方便
4. 具有负载均衡功能

#### pm2

##### 安装

```bash
npm i pm2 -g
```



##### 指令

```javascript
# 启动
pm2 start xxx

# 停止
pm2 stop xxx

# 重启
pm2 restart xxx

# 查看列表
pm2 list

...
其它参考:http://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet
```

#### 前提

1. 购买阿里云服务器，生成CentOS7.x的系统

2. 在CentOS7.x中安装必要的软件 Node、MongoDB、Apache、MySQL、FTPServer...

   参考:https://github.com/Duanzihuang/linuxtutorial

3. 本地和服务器安装pm2全局包

4. 对阿里云服务器的安全组规则进行配置

5. 要把代码发布到在线的Git仓库，比如Github或是码云

6. 在自己服务器配置好Git仓库的SSH Key


#### 实现步骤

1. 将本地代码发布到Git远程仓库(Github、码云)

2. 在阿里云服务器(CentOS)上生成SSH Key 并且将公钥设置到Github后台，方便拉取代码到CentOS服务器

         https://help.github.com/articles/connecting-to-github-with-ssh/
        
         https://help.github.com/articles/testing-your-ssh-connection/
         
         注意：还需要在服务器上面安装 git     
        	  yum install -y git

3. 在本地及服务器上面安装 pm2

   本地/服务器安装pm2：    

   ```bash
   npm i pm2 -g
   ```

4. 在本地项目根目录，使用 pm2 init 生成pm2的配置文件，并且更改相应的配置

   pm2文档地址:https://pm2.io/doc/en/runtime/guide/ecosystem-file/

   主要更改 apps下面的 name、script 等配置项目

   ​		deploy 下面的user、host、repo、path

5. 切换到本地项目根目录，运行 部署 指令即可

   参考：https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/

   ```bash
   pm2 deploy production setup
   pm2 deploy production
   ```

6. 代码更新&迭代、切换到本地项目根目录，运行 执行 指令即可

   ```bash
   pm2 deploy production update
   注意：在做这个之前，必须先把代码发布到Github
   ```


