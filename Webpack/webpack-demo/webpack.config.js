/*
 * @Author: NeptLiang
 * @Date: 2021-06-02 18:42:28
 * @LastEditors: NeptLiang
 * @LastEditTime: 2022-02-13 16:12:43
 * @Description: 看完B站教程后尝试写个demo
 */
const { resolve } = require('path');
const webpack = require('webpack'); // 模块热替换HMR需要其中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // npm i html-webpack-plugin
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin'); // npm i workbox-webpack-plugin --save-dev
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // npm i mini-css-extract-plugin
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // npm i optimize-css-assets-webpack-plugin -D
// const PostCssPresetEnv = require('postcss-preset-env'); // npm i postcss-preset-env
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');   //npm i add-asset-html-webpack-plugin -D
// process.env.NODE_ENV = 'development'; // 设置nodejs环境变量，CSS兼容性处理需要
process.env.NODE_ENV = 'production'; // 定义nodejs环境变量，决定使用browserslist的哪个环境

const commonCssLoader = [ // 复用less与css文件共用的loader
  // 'style-loader',     //创建style标签，将JS中的样式资源插入，添加到HTML文档的head属性中生效。已实现CSS的模块热替换HMR
  MiniCssExtractPlugin.loader, // 这个loader取代style-loader。作用：提取js中的css成单独文件
  'css-loader', // 将CSS文件变成commonjs模块，加载到JS中，里面内容是样式字符串
  // npm i --save-dev style-loader css-loader
  /*
      css兼容性处理：postcss -> postcss-loader postcss-preset-env
      需要在package.json中定义browserslist配置，通过配置加载指定的css兼容性样式：
          "browserslist": {
              "development": [    //开发环境，设置node环境变量：process.env.NODE_ENV = development
                  "last 1 chrome version",    //开发环境只需兼容最新版本浏览器
                  "last 1 firefox version",
                  "last 1 safari version"
              ],
              "production": [     //生产环境：默认是看生产环境
                  ">0.2%",    //兼容市面上使用率大于0.2%的浏览器
                  "not dead",     //不兼容凉了的浏览器
                  "not op_mini all"   //不兼容Opera Mini
              ]
          }
  */
  // 'postcss-loader'    //使用postcss-loader的默认配置
  { // 修改postcss-loader的配置
    loader: 'postcss-loader',   //npm i --save-dev postcss-loader postcss
    options: {
      postcssOptions: {
        plugins: [
          "postcss-preset-env"
        ]
      }
      // ident: 'postcss',
      // plugins: () => [ // eslint似乎不允许在中间require
      //   // eslint-disable-next-line
      //   require('postcss-preset-env')(),    //npm i postcss-preset-env, postcss的插件
      //   // PostCssPresetEnv(), // const PostCssPresetEnv = require('postcss-preset-env')
      // ],
    },
  },
];

/*
    1. Webpack能处理JS/JSON资源，不能处理CSS/img等其他资源
    2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
    3. 生产环境比开发环境多一个压缩JS代码
*/ /* 
    缓存：
    bable缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      * hash: 每次webpack构建时会生成一个唯一的hash值。
        问题：因为js和css同时使用一个hash值，
          如果重新打包，会导致所有缓存失效（我却可能只改动了一个文件）。
      * chunkhash: 根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题：js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      * contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/ /*
    Tree Shaking: 去除无用代码
    前提：
      1. 必须使用ES6模块化
      2. 开启production环境
    作用：减少代码体积
    配置：
      在package.json中配置
        "sideEffects": false    //所有代码都没有副作用（都可以进行tree shaking）
          问题：可能会把CSS / @babel/polyfill （副作用）文件干掉
        "sideEffects": ["*.css"]
*/ /*
  PWA: 渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/ /*
  entry: 入口起点
  1. string, 如'./src/index.js'
    单入口
    打包形成一个chunk，输出一个bundle文件。
    此时chunk的名称默认是main
  2. array，如['./src/index.js', './src/add.js']
    多入口
    所有入口文件最终形成一个chunk，输出一个bundle文件
    只有在HMR功能中让html热更新生效
  3. object
    多入口
    有几个入口文件就形成几个chunk，输出几个bundle文件
    此时chunk的名称是配置项的key
    --> 特殊用法：
      {
        index: ['./src/index.js', './src/count.js'],    //形成一个chunk，输出一个bundle文件
        add: './src/add.js'   //形成一个chunk，输出一个bundle文件
      }
*/
// npm init -y
// npm i webpack webpack-cli --save-dev
module.exports = { // exports而非export
  // entry: './src/js/index.js',   //单入口
  // entry: ['./src/index.js', './scr/add.js'],
  entry: {    //多入口：有一个入口，最终输出就有一个bundle
    app: ['./src/index.js', './src/js/calc.js'],
    // add1s: './src/js/add1s.js'   //我们还要删除掉 add1s.js 的入口起点，因为现在已经在 index.js 模块中引用了它
    // 代码分割方式1：多入口起点，缺点：重复模块都会被引入到各个 bundle 中；解决：使用 SplitChunksPlugin
    polyfills: './src/js/polyfills.js', // 最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，尽管这会导致额外的 bundle 体积成本。否则，可把 import 放入一个新文件，并加入 whatwg-fetch polyfill
  },
  output: {
    filename: 'js/[name].[contenthash:10].bundle.js', // [name]: 取entry名；属性名“filename”是全小写字母而非驼峰法
    chunkFilename: 'js/[name].bundle.js', // chunkFilename决定 non-entry chunk(非入口 chunk) 的名称
    path: resolve(__dirname, 'dist'), // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    library: 'webpackNumbers', // 将你的 library bundle 暴露为名为 webpackNumbers 的全局变量，consumer 通过此名称来 import
    libraryTarget: 'umd', // 在 AMD 或 CommonJS require 之后可访问（libraryTarget:'umd'）
  },
  module: { // loader的配置
    rules: [ // rules属性而非rule
      {
        /*
            语法检查：
                eslint-loader eslint
            注意：只检查自己写的源码，第三方库不用检查
            设置检查规则：
                package.json中设置eslintConfig：
                ----------------------------------------------------
                    "eslintConfig": {
                        "extends": "airbnb-base"    //继承airbnb规范
                    }
                ----------------------------------------------------
                airbnb --> eslint eslint-config-airbnb-base eslint-plugin-import
                npm i eslint eslint-config-airbnb-base eslint-plugin-import eslint-loader
        */ /*
            一般来讲，一个文件只被一个loader处理，
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序，否则容易出问题，如：
            对于js文件，要先执行eslint，再执行babel，即先检查代码再转化
        */
        test: /\.js$/, // 匹配哪些文件
        exclude: /node_modules/,
        enforce: 'pre', // 优先执行本loader
        use: [ // 使用哪些loader进行处理
          {
            loader: 'eslint-loader', // loader属性设置loader
            options: { // options属性配置loader
              fix: true, // 自动修复eslint检测出的错误
              // output: __dirname + '[name]_[contenthash:10].[ext]',
              // esModule: false
            },
          },
        ],
      },
      {
        oneOf: [ // 以下loader只会匹配一个
          // 注意：一般不能有两个loader配置处理同一个类型的文件，否则输出往往会变得不确定，除非用enforce设置了优先级
          /* 
            { // 一些遗留模块依赖的 this 指向的是 window 对象。当模块运行在 CommonJS 上下文中，
              // this 指向的是 module.exports。在这种情况下，你可以通过使用 imports-loader 覆盖 this 指向
              test: require.resolve('index.js'),
              // test: require.resolve(__dirname, 'index.js'),
              use: 'imports-loader?this=>window',
            },
            { // 假设，某个 library 创建出一个全局变量，
              // 它期望 consumer(使用者) 使用这个变量，可以使用 exports-loader，将一个全局变量作为一个普通的模块来导出
              test: require.resolve('js/globals.js'),
              // test: require.resolve(__dirname, 'js/globals.js'),
              use: 'exports-loader?file,parse=helper.parse',
              // 将 file 导出为 file 以及将 helpers.parse 导出为 parse
            }, 
          */
          {
            /*
              js兼容性处理：babel-loader @babel/core
              npm i babel-loader @babel/core core-js @babel/preset-env @babel/polyfill
              1. 基本js兼容性处理：@babel/preset-env
                问题：只能转换基本语法，promise等不能转换
              2. 全部js兼容性处理：@babel/polyfill
                问题：只需要解决部分兼容性问题，却将所有兼容性代码全部引入，体积太大
              3. 只做需要做兼容性处理的：按需加载 --> core-js
            */
            test: /\.js$/,
            exclude: /node_modules/, // node_modules目录而非node_module
            include: resolve(__dirname, 'src'), // 对最少数量的必要模块使用 loader，使用 include 字段仅将 loader 应用在实际需要将其转换的模块所处路径
            use: [
              /* 
                开启多进程打包，
                进程启动大概需要600ms，进程通信也有开销。
                只有工作消耗时间比较长时，才需要多进程打包
              */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2    //2个进程
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [ // 预设：指示babel做什么样的兼容性处理
                    [
                      '@babel/preset-env',    //千万别拼错了（落泪
                      {
                        useBuiltIns: 'usage', // 按需加载
                        corejs: {
                          version: 3, // 指定core-js版本
                        },
                        targets: { // 指定兼容性做到哪个版本浏览器
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17',
                        },
                      },
                    ],
                  ],
                  cacheDirectory: true   //开启babel缓存，第二次构建时，会读取之前的缓存
                },
              }
            ]
            // loader: 'core-js',
          },
          {
            test: /\.css$/,
            use: [...commonCssLoader], // MiniCssExtractPlugin.loader, css-loader, postcss-loader
            // 要使用多个loader处理用use，use数组中loader执行顺序：从右到左，从下到上，依次执行
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader,
              'less-loader', // 将less文件编译成css文件，需要下载less-loader和less
            ],
          },
          {
            test: /\.html$/,
            loader: 'html-loader', // npm i -D html-loader, 处理HTML文件的img图片（负责引入img，从而能被url-loader进行处理）
          },
          {
            test: /\.(jpg|png|gif)$/, // 处理图片资源
            loader: 'url-loader', // 需下载url-loader, file-loader。只使用一个loader用loader属性
            options: {
              limit: 8 * 1024, // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力）；缺点：图片体积会更大（文件请求速度更慢）
              esModule: false, // url-loader默认使用ES6模块化解析，而html-loader引入图片是commonjs解析，
              // 会出问题（[object Module]），故须关闭url-loader的ES6模块化，使用commonjs解析
              name: '[hash:10].[ext]', // 默认输出的文件名是一长串哈希，故给图片进行重命名：[hash:10]取图片hash的前10位；[ext]取文件原来的拓展名
              outputPath: 'imgs',
            },
          },
          { // 打包其他资源（除了HTML, JS, CSS以外的资源）
            exclude: /\.(html)|(js)|(css)|(less)$/, // 排除HTML, CSS, JS资源
            loader: 'file-loader', // npm i --save-dev file-loader
            options: {
              outputPath: 'media'
            }
          },
          {
            test: /\.(csv|tsv)$/,
            loader: 'csv-loader',
          },
          {
            test: /\.xml$/,
            loader: 'xml-loader',
          },
          // npm i --save-dev csv-loader xml-loader
        ],
      },
    ],
  },
  plugins: [ // plugins而非plugin
    // new CleanWebpackPlugin(), // npm i --save-dev clean-webpack-plugin     #在每次构建前清理 /dist 文件夹
    new HtmlWebpackPlugin({ // npm i --save-dev html-webpack-plugin
      title: 'HTML Webpack Plugin Config Title',
      template: './template/index.html', // 复制./template/index.html文件，并自动引入打包输出的所有资源（如JS、CSS)
      minify: { // 压缩html代码
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new webpack.HotModuleReplacementPlugin(), // 模块热替换HMR需要的插件
    // new webpack.HashedModuleIdsPlugin(), // 使用HashedModuleIdsPlugin
    // 修复vendor bundle hash会随着自身的module.id的变化而发生变化的问题
    new webpack.ProvidePlugin({ // 把这个应用程序中的模块依赖，改为一个全局变量依赖，在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package
      // _: 'lodash'     //告诉 webpack，如果你遇到了至少一处用到 _ 变量的模块实例，那请你将 lodash package 引入进来，并将其提供给需要用到它的模块
      join: ['lodash', 'join'], // 暴露出某个模块中单个导出，无论 join 方法在何处调用，我们都只会获取到 lodash 中提供的 join 方法
    }),
    new WorkboxPlugin.GenerateSW({
      // * 这些选项帮助快速启用ServiceWorkers（帮助ServiceWorkers快速启动）
      // * 不允许遗留任何“旧的”ServiceWorkers（删除旧的ServiceWorkers）
      // 生成一个ServiceWorkers配置文件
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new WorkboxWebpackPlugin.GenerateSW({
    //   clientsClain: true,
    //   skipWaiting: true
    // }),
    // new CommonsChunkPlugin({ // 只提取包含 runtime 的 chunk，其他 chunk 都作为其子 chunk
    //   name: 'manifest',
    //   minChunks: Infinity,
    // }),
    new MiniCssExtractPlugin({ // 提取js中的css成单独文件，需配合一个loader使用
      filename: 'css/built.[contenthash:10].css', // 对输出的css文件进行重命名
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css
    // 告诉Webpack哪些库不参与打包，同时使用时的名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  // 模式
  // 生产模式自带Tree Shaking，但是要在package.json中配置sideEffects
  // 设置 production mode 配置后，webpack v4+ 会默认压缩你的代码，默认使用 TerserPlugin
  // mode: 'development',    //开发模式
  mode: 'production', // 生产模式，会自动压缩js
  /*
    source-map: 一种提供 源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射可以追踪源代码错误）
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    * source-map: 外部
      错误代码准确信息 和 源代码的错误位置
    * inline-source-map: 内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    * hidden-source-map: 外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    * eval-source-map: 内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    * nosources-source-map: 外部
      错误代码准确信息，但是没有任何源代码信息
    * cheap-source-map: 外部
      错误代码准确信息 和 源代码的错误位置
      只能精确到行
    * cheap-module-source-map: 外部
      错误代码准确信息 和 源代码的错误位置
      module会将loader的source map加入
    内联 和 外部 的区别：1. 外部生成了文件，内联没有；2. 内联构建速度更快
    开发环境：速度快，调试更友好
      速度快（eval > inline > cheap > ...）：
        eval-cheap-source-map
        eval-source-map
      调试更友好：
        source-map
        cheap-module-source-map
        cheap-source-map
      --> 故开发环境一般选择 eval-source-map (如React) / eval-cheap-module-source-map
    生产环境：源代码要不要隐藏？调试要不要更友好？加载速度重于构建速度
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码的错误信息
      --> 生产环境一般用 source-map (如Vue) / cheap-module-source-map
  */
  // 启用 source map，在大多数情况下，最佳选择是 cheap-module-eval-source-map（Webpack4可用，Webpack5不支持）
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'source-map',
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
  */
  optimization: {
    runtimeChunk: 'single', // 使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle
    splitChunks: { // 代码分割方法2：SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的 entry chunk 中，或者提取到一个新生成的 chunk，适用于小型代码库，但是在大型代码库中却非常耗费性能
      cacheGroups: { // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      // chunks: 'all'
    },
    // usedExports: true
  },
  externals: [{ // 把 lodash 当作 peerDependency。也就是说，
    // consumer(使用者) 应该已经安装过 lodash 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer
    jquery: 'jQuery',   //忽略库名 -- npm包名
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  }],
  devServer: { // npm i --save-dev webpack-dev-server，开发服务器devServer：
    // 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器。特点：只会再内存中编译打包，不会有任何输出。启动devServer指令为：npx webpack-dev-server
    contentBase: './dist', // 项目构建后路径
    compress: true, // 启动gzip压缩
    /*
      HMR: Hot Module Replacement 热模块替换/模块热替换
      作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
        极大提升构建速度
      * 样式文件：可以使用HMR功能，因为style-loader内部实现了
      * js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
          注意：HTR功能对js的处理，只能处理非入口js文件的其他文件
      * html文件：默认不能使用HMR功能。同时会导致问题：html文件不能热更新了（不用做HMR）
          解决：修改entry入口，将html文件引入
    */
    hot: true, // 启用模块热替换HMR。当修改了webpack配置、想要让新配置生效，必须重新webpack服务
    host: 'localhost',
    port: 3000, // 端口号
    open: true, // 自动打开浏览器
  },
};
