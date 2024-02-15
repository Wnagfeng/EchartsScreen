const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // 👇🏻 这个配置
    resolve: {
      symlinks: true,
      alias: {
        vue: path.resolve("./node_modules/vue"),
      },
    },
  },
  /* 
  这段代码是在webpack配置文件中的resolve字段中，用于解析模块的路径配置。具体解释如下：
 symlinks: false表示不解析符号链接，即webpack不会对项目中的符号链接进行处理。
 alias用于创建别名，将某个模块的路径映射到另一个路径上，这里是将"vue"模块的路径映射到node_modules/vue目录下。
 这样在项目中引用vue模块时，直接使用import Vue from "vue"即可，而不需要指定完整的路径。
  */
})

