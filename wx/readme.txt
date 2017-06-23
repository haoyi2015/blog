//tomato-fe-core目录结构说明

tomato-fe-core

----demo
		//test、demo等，暂定此目录不发布
		
----source						资源目录/此目录下所有资源为公用资源，非公用资源勿放于此
		
--------static					静态资源
------------css					
------------images
------------js					js library
----------------avalon
----------------common			公共js
----------------jquery
----------------utils			工具类
				...				其他待用、待添加
				
--------widget					公用组件
			
----views						视图
	
--------c						视图components、对应于各pages模块的私有资源、公有资源放于source下对应目录
------------module1				../pages/module1 的资源文件
------------module2				../pages/module2 的资源文件
			
--------pages					页面
------------module1				module1 页面，其对应的资源文件为 ../c/module1
------------module2				module2 页面，其对应的资源文件为 ../c/module2


fis server start  启动
fis release -wL   编译