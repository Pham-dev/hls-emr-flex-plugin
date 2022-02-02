const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'out.js',
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
            }
        ]
    }
}