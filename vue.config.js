module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vue-agile", "vuex-persist"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  }
};
