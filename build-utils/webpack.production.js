const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    output: {
        filename: "[chunkhash].js",
        path: path.resolve(__dirname, "../", "build/"),
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
});
