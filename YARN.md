### yarn 配置详情和命令详解

- yarn -v

  查看 yarn 版本

- yarn config list

  查看 yarn 配置

- yarn config set registry https://registry.npm.taobao.org/

  修改 yarn 的源镜像为淘宝源

- yarn config set global-folder "D:\nodejs\node_global"

  修改全局安装目录的 bin 目录位置, bin 目录需要自己创建, 而且需要把此目录加到系统环境变量(D:\nodejs\node_global\bin)

- yarn config set cache-folder "D:\nodejs\node_cache"

  修改全局缓存目录, 先创建好目录(cache), 和 global 放在同一层目录下

- yarn config list

  查看所有配置

- yarn global bin

  查看当前 yarn 的 bin 的位置

- yarn global dir

  查看当前 yarn 的全局安装位置

- yarn install

  在本地 node_modules 目录安装 package.json 里列出的所有依赖。

- yarn install --check-files

  验证 node_modules 中已安装的文件没有被移除。

- yarn install --flat

  安装所有依赖，但每个依赖只允许有一个版本存在。 第一次运行这个命令时，会提示你在每个依赖包的多个版本范围中选择一个版本。 这会被添加到你的 package.json 文件的 resolutions 字段。

  ```js
    "resolutions": {
      "package-a": "2.0.0",
      "package-b": "5.0.0",
      "package-c": "1.5.2"
    }
  ```

- yarn install --force

  这回重新拉取所有包，即使之前已经安装的。

- yarn install --har

  从安装期间的所有网络请求输出一个 HTTP archive。 HAR 文件通常用于排查网络性能，并能用 Google’s HAR Analyzer 或 HAR Viewer 这样的工具分析。

- yarn install --ignore-scripts

  不执行项目 package.json 及其依赖定义的任何脚本。

- yarn install --modules-folder <path>

  为 node_modules 目录指定另一位置，代替默认的 ./node_modules。

- yarn install --no-lockfile

  不读取或生成 yarn.lock 锁文件。

- yarn install --production[=true|false]

  如果 NODE_ENV 环境变量设为 production，Yarn 将不安装任何列于 devDependencies 的包。 使用此标志指示 Yarn 忽略 NODE_ENV 并用它取代“生产”与否的状态。

  (注意： --production 等同 --production=true。--prod 是 --production 的别名。)

- yarn install --pure-lockfile

  不生成 yarn.lock 锁文件。

- yarn install --frozen-lockfile

  不生成 yarn.lock 锁文件，并且，如果需要更新则会报错。

- yarn install --silent

  执行 yarn install 而不显示安装日志

- yarn install --ignore-engines

  忽略引擎检查。

- yarn install --ignore-optional

  不安装可选依赖。

- yarn install --offline

  运行 yarn install 于离线模式。

- yarn install --non-interactive

  禁用询问交互，比如当没有合适版本的依赖时

- yarn install --update-checksums

  当跟对应包的校验和不一致时， 更新 yarn.lock 锁文件的校验和
