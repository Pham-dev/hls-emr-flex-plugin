const path = require('path');

module.exports = {
    entry: './src/DeployApp.tsx',
    output: {
        filename: 'index.js',
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