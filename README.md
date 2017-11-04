# imgUpload
简介：AJAX 多图片上传
## 基本功能
1. 可拖拽上传;
2. 动态生成预览图片;
3. 通过AJAX FormData()方法实现上传;

## 项目结构说明

```
├── build                                  
├── node_modules
├── public                      // web静态资源加载
│    ├── css
│    ├── font                   // iconfont
│    ├── js
│    │     ├── control.js       // ajax数据及判断
│    │     ├── domView.js       // dom操作
│    │     ├── upload.js        // 主框架
│    ├── lib
│    └── upload.html    
├── .babelrc                  
├── README.md          
├── index.js                    //入口文件
├── package-lock.json                 
├── package.json
└── webpack.config.js              
```
