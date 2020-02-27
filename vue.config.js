const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ["vue-agile", "vuex-persist"],
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/"],
        postProcess(renderedRoute) {
          // Ignore any redirects.
          renderedRoute.route = renderedRoute.originalRoute;
          renderedRoute.html = renderedRoute.html
            .replace(/<script (.*?)>/g, "<script $1 defer>")
            .replace('id="app"', 'id="app" data-server-rendered="true"');
          return renderedRoute;
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          sortAttributes: true
        }
      })
    ]
  }
};
