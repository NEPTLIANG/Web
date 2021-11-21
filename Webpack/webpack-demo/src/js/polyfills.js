import 'babel-polyfill'; // npm i --save babel-polyfill
import 'whatwg-fetch'; // npm i --save whatwg-fetch
// 最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，
// 尽管这会导致额外的 bundle 体积成本。
// 否则，可把 import 放入一个新文件，
// 并加入 whatwg-fetch polyfill
