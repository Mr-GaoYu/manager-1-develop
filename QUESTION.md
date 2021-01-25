### HMR，ts 的类型检测 module 是 NodeMoudle 类型，且其中没有.hot 属性

- npm install @types/webpack-env -D

### windows下和linux下的文本文件的换行符不一致。Windows在换行的时候，同时使用了回车符CR(carriage-return character)和换行符LF(linefeed character),而Mac和Linux系统，仅仅使用了换行符LF,老版本的Mac系统使用的是回车符CR

- 如果你用的是windows，文件编码是UTF-8且包含中文，最好全局将autocrlf设置为false。

- git config --global core.autocrlf false
