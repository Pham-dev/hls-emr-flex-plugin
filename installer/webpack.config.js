const path = require('path');

module.exports = {
    entry: './src-admin/index.js',
    watch: process.env.NODE_ENV !== 'production' && true,
    output: {
        filename: 'administration.js',
        path: path.resolve(__dirname, 'assets')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js|ts|tsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader", // 1. Turns sass into css
                ],
            },
        ]
    }
}