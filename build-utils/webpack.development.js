const path = require("path");
const { exec } = require("child_process");

// Logs the dev server address
exec("ipconfig getifaddr en0", (error, stdout, stderr) => {
    console.log("------------------------------------------");
    if (error) {
        console.log("------------------------------------------");
        console.log(
            `Error executing shell command "ipconfig getifaddr en0". Error: ${error}`
        );
        console.log(`Dev server available at "localhost:3000"`);
    } else if (stderr) {
        console.log(
            `Error executing shell command "ipconfig getifaddr en0". Error: ${stderr}`
        );
        console.log(`Dev server available at "localhost:3000"`);
    } else {
        console.log(`Dev server available at ${stdout.trim()}:3000`);
    }
    console.log("------------------------------------------");
});

module.exports = () => ({
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../", "dev/"),
    },
    devServer: {
        contentBase: "./src",
        stats: {
            children: false,
            maxModules: 0,
        },
        port: 3000,
        host: "0.0.0.0",
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    devtool: "inline-cheap-source-map",
});
