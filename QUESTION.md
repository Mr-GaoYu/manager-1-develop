### HMR，ts 的类型检测 module 是 NodeMoudle 类型，且其中没有.hot 属性

- npm install @types/webpack-env -D

### windows 下和 linux 下的文本文件的换行符不一致。Windows 在换行的时候，同时使用了回车符 CR(carriage-return character)和换行符 LF(linefeed character),而 Mac 和 Linux 系统，仅仅使用了换行符 LF,老版本的 Mac 系统使用的是回车符 CR

- 如果你用的是 windows，文件编码是 UTF-8 且包含中文，最好全局将 autocrlf 设置为 false。

- git config --global core.autocrlf false
