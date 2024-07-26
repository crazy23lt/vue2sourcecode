# Vue2 源码学习

## 源码如何编译

*采用`rollup`编译工具，script 命令 `node scripts/build.js`*

*`scripts/config.js` builds 描述了所有环境的编译*

*`runtime-with-compiler.ts` 为 `rollup` 编译配置入口文件*

## new Vue({xxxx}) 做了哪些工作



## 前端模块化

_cjs、amd、umd、esm_

_amd 异步加载模块 (客户端)_

1. html 文件依赖 script 标签加载 require.js
2. 定义 amd 模块 define(fn...)
3. 配置加载 amd 模块 require.config(...) require(...)

_cjs 同步加载模块 (服务端)_

1. 导出模块 module.export = {...}
2. 加载模块 require('xxx.xxx....')

_esm 模块加载_

1. 导出模块 export default {}
2. 导入模块 import xxx from 'xxxxx'
3. html 加载 `<script type='module' src='xxxx'><script>`
4. esm 模块加载需要同源，存在跨域限制（解决：vscode 安装 live server 扩展）

_umd 模块加载 （commonjs、requirejs、broswer）_

1. 判断模块环境，umd 会首先检测代码运行环境。
2. 根据不同环境，对代码进行导出
   1. cjs 环境 module.export = fn()
   2. amd 环境 define(fn)
   3. browser global.vue = fn()
3. 执行 fn

## Rollup 编译工具

_代码编译成符合 es 模块规范的代码包。_

- 命令行执行
  - `rollup -c` 默认使用 rollup.config.js 配置文件对工程进行编译
  - `rollup -c -w` 监听入口文件，对象工程进行编译
  - `rollup -c --environment BIULD:production` ==> (process.env.BUILD = production)
- 非命令行执行

- [Rollup 命令行参数说明](https://rollupjs.org/command-line-interface/)
- [Rollup 完整配置](https://github.com/rollup/awesome)
- [awesome Rollup 插件](https://rollupjs.org/configuration-options/)

## 代码规范化

**本地编辑阶段**

- _eslint_ 负责语法检查

  - .eslintrc 、.eslintignore

- _prettier_ 负责格式化代码

  - .prettierrc

- _editorconfig_ 负责编辑器编码时格式
  - .editorconfig




## 参考

- [Relsola](https://relsola.github.io/blog/)
- [React技术揭秘](https://react.iamkasong.com/)
- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
- [regexper](https://regexper.com/)
- [Vue2 Template Explorer](https://v2.template-explorer.vuejs.org/)
- [Vue3 Template Explorer](https://template-explorer.vuejs.org/)