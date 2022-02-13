# B站Webpack课程Webpack性能优化总结

* **开发环境**性能优化
* **生产环境**性能优化

## 开发环境性能优化

* 优化打包构建速度
    * HMR
* 优化代码调试
    * `source-map`

## 生产环境性能优化

* 优化打包构建速度
    * `oneOf`
    * Babel缓存
    * 多进程打包
    * externals
    * DLL
* 优化代码运行性能
    * 缓存 (`hash`, `chunkhash`, `contenthash`)
    * Tree Shaking
    * Code Split
    * 懒加载/预加载
    * PWA