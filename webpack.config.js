    var webpack = require('webpack');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    var path = require('path')
    module.exports = {
        devtool: 'eval-source-map',
        entry: __dirname + "/index.js",
        output: {
            path: __dirname + "/bulid/",
            filename: "bundle.js"
        },
        resolve: {
            extensions: [' ', '.js', '.es6', '.vue'],
            alias:{
                jquery: './public/lib/jquery-vendor.js',
                bootconfig:'./node_modules/bootstrap-webpack/bootstrap.config.js'
            }
        },

        externals: {
            'jquery': 'window.jQuery',
            'photoUpload' : 'window.PhotoUpload'
        },

        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules|vendor|bootstrap/,
                include: path.resolve(__dirname, 'public/js'),
                loader: 'babel-loader',
                query:{
                    presets:['es2015']
                }
            }, {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                }) //添加对样式表的处理
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&outputPath=img/' //  <= 8kb的图片base64内联
            }, {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=[name].[hash:7].[ext]&outputPath=fonts/',

            }, {
                test: require.resolve('jquery'), // 此loader配置项的目标是NPM中的jquery
                loader: 'expose-loader?$!expose-loader?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`

            }, {
                test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'window.$': 'jquery',
            }),
            new ExtractTextPlugin({
                filename:"upload.min.css",
            }),
        ],

    }