# my-share

> 用到了vue socket 做的一个实时分享的项目。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:18080
npm run dev

# build for production with minification
npm run build
```
注意：

* 要用的config.js中的domain，要与项目启动后的地址一致。
* 在login.vue中密码用到了md5，请自已设置一组比对值。
* 在页面中有留给演示者的按钮后门，自己修改样式一定能找到它的。
