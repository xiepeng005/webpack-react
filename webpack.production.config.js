const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        "main": __dirname + "/app/main.js",
        "filterable": __dirname + "/app/filterable.js",
        vendor:['script-loader!react-polyfill','babel-polyfill','raf/polyfill','react','react-dom']
    },
    output: {
        path: __dirname + "/public/js/",
        filename: "[name].min.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                use:['babel-loader'],
                exclude: /node_mudules/
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true //css压缩
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                            }
                        }
                    }, {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test:/\.(gif|png|jpe?g)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "../images/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff)(\?(\w|#)*)?$/,
                use: [{
                    loader:"file-loader",
                    options: {
                        name: "../font/[name].[ext]"
                    }
                }]
            }
        ]
    },
    plugins: [
        //公共打包
        new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'libs.min.js'}),
        //代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //css打包
        new ExtractTextPlugin('../css/[name].css')
    ]
};
