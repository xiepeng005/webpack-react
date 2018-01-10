const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //生成Source Maps（使调试更容易）
    devtool:"eval-source-map",
    entry:{
        "main": __dirname + "/app/main.js",
        "filterable": __dirname + "/app/filterable.js",
        vendor:['script-loader!react-polyfill','babel-polyfill','raf/polyfill','react','react-dom']
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].min.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    //webpack-dev-server本地服务器
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        port: "8080", //设置默认监听端口，如果省略，默认为”8080“
        inline: true, //实时刷新
        hot : true,
        progress: true
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
                        name:"../images/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff)(\?(\w|#)*)?$/,
                use: [{
                    loader:"file-loader",
                    options: {
                        name:"../font/[name].[ext]"
                    }
                }]
            }
        ]
    },
    plugins: [
        // 热加载模块
        new webpack.HotModuleReplacementPlugin(),
        //公共打包
        new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'libs.min.js'}),
        //css打包
        new ExtractTextPlugin('../css/[name].css')
    ]
};
