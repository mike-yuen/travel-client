const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vue-agile", "vuex-persist"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "img/**/**",
          to: path.resolve(__dirname, "dist")
        }
      ]),
      new ImageminPlugin({
        pngquant: {
          quality: "95-100"
        }
      })
    ]
  }
};
