const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(process.cwd(), './src/index.html'),            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[contenthash].css",
            ignoreOrder: true
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                styles: {
                    // Add/remove this line
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    reuseExistingChunk: true,
                    priority: 10
                }
            }
        },
        minimize: true,
        minimizer: [
            new CSSMinimizerWebpackPlugin({
                 test: /\.css$/g
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 2,
                            modules: false
                        }
                    }
                ]
            }
        ]
    }
}