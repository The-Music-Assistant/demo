const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Gets the correct config file for dev or prod
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode }) => {
    return webpackMerge(
        {
            mode,
            entry: "./src/js/index.js",
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            useBuiltIns: "usage",
                                            corejs: { version: 3 },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
                        use: {
                            loader: "file-loader",
                            options: {
                                outputPath: (_, resourcePath, context) =>
                                    path
                                        .relative(context, resourcePath)
                                        .replace("src/", ""),
                                name: "[name].[ext]",
                            },
                        },
                    },
                    {
                        test: /\.(pdf|pptx|mp4)$/,
                        use: {
                            loader: "file-loader",
                            options: {
                                outputPath: (_, resourcePath, context) =>
                                    path
                                        .relative(context, resourcePath)
                                        .replace("src/", ""),
                                name: "[name].[ext]",
                            },
                        },
                    },
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    filename: "index.html",
                    template: "./src/index.html",
                }),
                new HtmlWebpackPlugin({
                    filename: "project-plan.html",
                    template: "./src/project-plan.html",
                }),
                new HtmlWebpackPlugin({
                    filename: "milestones.html",
                    template: "./src/milestones.html",
                }),
            ],
        },
        modeConfig(mode)
    );
};
