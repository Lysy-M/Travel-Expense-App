const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./static/js/script.js", // Ścieżka do pliku JavaScript
  },
  output: {
    filename: "bundle.js", // Nazwa pliku JavaScript
    path: path.resolve(__dirname, "dist"), // Katalog wyjściowy
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    open: "chrome", // Otwieranie w przeglądarce Chrome
    port: 3000,
    static: {
      publicPath: "/", // Ścieżka publiczna dla zasobów statycznych
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html", // Ścieżka do szablonu HTML
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'static/js') // Dodaj ścieżkę do folderu z plikami JS
    ],
    extensions: [".js", ".jsx"],
  },
};
