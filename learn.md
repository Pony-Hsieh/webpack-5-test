
## 學習版本
- v5

## 指令
- `$ npm init -y`
  - 快速創建一個 npm 空白專案
- `$ npm install webpack webpack-cli --save-dev`
  - 安裝 webpack

## 相關設定
- 我們先到 package.json，在 scripts 裡加入 build 的指令，如此可以用 webpack 來執行打包程序

## 單點知識點
- dist 其實就是 distribution，這裡可以理解為 "發布"的意思
- webpack-cli typeerror webpack.optimize.uglifyjsplugin is not a constructor
  - 問題原因
    - 對於 webpack 5.27 版本，內置的 JS 壓縮插件不能使用了
- webpack 只能理解 JavaScript，其內容可以設定 loader 使其讀取相關檔案
- 插件可以想像成要自動化做某些事情，例如自動清除某些檔案、建置某個資料夾
- 


## 目的
- 自動清空輸出資料夾
  - `output.clean = true`
### HTML
- HTML 壓縮
  - `html-webpack-plugin`
    - 該插件將為你生成一個 HTML5 文件， 在 body 中使用 script 標籤引入你所有 webpack 生成的 bundle
    - 安裝：
      - `$ npm install html-webpack-plugin --save-dev`
    - 用法：
      - ```
        const HtmlWebpackPlugin = require('html-webpack-plugin');

        plugins: [new HtmlWebpackPlugin()]
        module.exports = {
          plugins: [new HtmlWebpackPlugin()]
        };
        ```
### CSS
- 將 Sass 編譯為 CSS
  - `sass-loader`
    - 安裝：
      - `$ npm install sass-loader sass webpack --save-dev`
      - sass-loader 需要預先安裝 Dart Sass 或 Node Sass  
        官方推薦使用 Dart Sass
    - 用法：
      - 將 sass-loader、css-loader 與 style-loader 進行鍊式調用，可以將樣式以style 標籤的形式插入 DOM 中，或者使用 mini-css-extract-plugin.loader 將樣式輸出到獨立的文件中
      - ```javascript
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                // 將 JS 字串生成為 style 節點
                // 下列兩者二擇一使用
                // 不要同時使用 style-loader 與 mini-css-extract-plugin
                'style-loader',
                MiniCssExtractPlugin.loader,
                // 將 CSS 轉化成 CommonJS 模塊(？
                'css-loader',
                // 將 Sass 編譯成 CSS
                'sass-loader',
              ],
            },
          ],
        ```
- CSS prefix
  - `postcss-loader`
    - 安裝：
      - `$ npm install postcss-loader postcss --save-dev`
    - 用法：
      - `postcss-preset-env`
        - PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.
          - PostCSS Preset Env 讓您可以將現代 CSS 轉換成大多數瀏覽器可以理解的內容，根據您的目標瀏覽器或運行時環境確定您需要的 polyfill
        - 也會自動幫助我們添加 autoprefixer  
          （所以相當於已經內置了 autoprefixer）
      - Extract CSS (提取 CSS)
        - 使用 `mini-css-extract-plugin`
- CSS 壓縮
  - `css-minimizer-webpack-plugin`
    - 安裝：
      - `$ npm install css-minimizer-webpack-plugin --save-dev`
    - 用法：
      - ```javascript
        const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

        module.exports = {
          optimization: {
            minimizer: [
              new CssMinimizerPlugin(),
            ],
          },
        };
        ```
    - 這將僅在 production 開啟CSS 優化  
      如果想在 development 啟用 CSS 優化，請將 optimization.minimize 設置為 true
- CSS tree shaking
- 將 CSS 加入至 HTML 檔中
  - `html-webpack-plugin`
- CSS linter
### JS
- JS minify
- JS uglify
- JS babel
- Babel
  - 安裝：
    - 一行
      - `$ npm install -D babel-loader @babel/core @babel/preset-env`
    - 多行
      - `$ npm install babel-loader -D`
      - `$ npm install @babel/core -D`
      - `$ npm install @babel/preset-env -D`



## 比較
- CSS 編譯
  1. `style-loader` 用於創建 style 標籤，將 CSS 代碼添加到 html 中
  2. `mini-css-extract-plugin` 會將處理好的 CSS 代碼編譯到新的 CSS 文件中，並在html 文件中引入
  3. `css-minimizer-webpack-plugin` 壓縮 CSS 文件中的代碼
- `filename`, `chunkFilename` 的差異為何？
  - filename
    - 對應於 entry 裡面生成出來的文件名
  - chunkFilename
    - 決定了非入口(non-entry) chunk 文件的名稱
    - 未被列在 entry 中，但有些場景需要被打包出來的文件命名配置。比如按需加載（異步）模塊的時候。
- babel
  - babel 只是轉換語法，  
    後為了解決 API 的兼容性，又引入了 pollify 概念，  
    再後來為了解決組件開發者的環境多樣性，又引入了 runtime
  - 為了解決這個問題，@babel/runtime 出現了，它將這些輔助函數整合到了一起，我們可以通過包來複用這些代碼。  
    這樣解決了代碼複用的問題，但是每次手動引入過於麻煩，於是 @babel/plugin-transform-runtime 登場。
  - 


## loader
- loader 是從右向左加載的
### `babel-loader`
- 使用 Babel 加載 ES2015+ 代碼，並將其轉換為 ES5
### `css-loader`
### `style-loader`
### `postcss-loader`

## plugin
### `mini-css-extract-plugin`
- 本插件會將 CSS 提取到單獨的文件中，為每個包含 CSS 的 JS 文件創建一個 CSS 文件，並且支援 CSS 和 SourceMaps 的按需加載。
- 建議 `mini-css-extract-plugin` 與 `css-loader` 一起使用。
- 在上個段落中，雖然讓 Webpack 可以認識 CSS，但是打包後的 CSS 會被寫在 js 檔案裡面，如果希望將 CSS 獨立出來就要使用到插件
- 如果使用了 mini-css-extract-plugin 插件，就可以不用style-loader 了
- 將 js 中 import 導入的樣式文件，單獨打包成一個 css 文件，結合 html-webpack-plugin，以 link 的形式插入到 html 文件中。
- 此插件不支援 HMR(Hot Module Replacement)，若修改了樣式文件，無法即時在瀏覽器中顯示出來，需要手動刷新頁面。
  - 可以在 production mode 使用 `MiniCssExtractPlugin.loader`，dev mode 選用 style-loader

### `css-minimizer-webpack-plugin`


## 未分類
- `entry`
  - 指示 webpack 應該使用哪個模塊，來作為構建其內部 dependency graph 的開始。
  - 進入入口起點後，webpack 會找出有哪些模塊和庫是入口起點（直接和間接）依賴的。
  - 預設值是 `./src/index.js`，但你可以透過在 webpack configuration 中配置 entry 屬性，來指定一個（或多個）不同的入口起點。
- `output`
  - 告訴 webpack 在哪裡輸出它所創建的 bundle，以及如何命名這些文件。
  - 主要輸出文件的預設值是 `./dist/main.js`，其他生成文件預設放置在 `./dist` 資料夾中
  - 透過在 webpack configuration 中配置 output 屬性，來配置這些處理過程：
- `plugin`
  - UglifyjsWebpackPlugin
    - 用途
      - 
    - 安裝
      - `$ npm install uglifyjs-webpack-plugin --save-dev`
  - clean-webpack-plugin
    - 用途
      - 每次編譯前，都要先刪掉舊檔案
    - 安裝
      - `$ npm install --save-dev clean-webpack-plugin`
  - html-webpack-plugin
    - 用途
      - 當使用 webpack打包時，創建一個 html 文件，並把 webpack 打包後的靜態文件自動插入到這個 html 文件當中。
  - mini-css-extract-plugin
    - 建議 mini-css-extract-plugin 與 css-loader 一起使用。
    - 用途
  - 
- `mode`
  - 'production' | 'development' | 'none'
  - 如果沒有設置，mode 預設值為 'production'
  - 'development'
    - 會將 DefinePlugin 中 process.env.NODE_ENV 的值設置為 development
  - 'production'
    - 會將 DefinePlugin 中 process.env.NODE_ENV 的值設置為 production

## 參考文章
- [Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/i-am-mike/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d)
- [前端也需要編譯？Transpile、Compile、Minify、Uglify 基本介紹](https://ithelp.ithome.com.tw/articles/10191992)
- [style-loader、mini-css-extract-plugin 的區別](https://blog.csdn.net/weixin_42420703/article/details/103747523)
- [深入Webpack5 等構建工具系列二(10) - postcss-preset-env 和配置抽取](https://juejin.cn/post/7000141573480513550)
- [webpack5基礎篇！看了馬上會！我說的！](https://juejin.cn/post/7199106255036661815)
- [webpack5進階篇！看完就會辣！](https://juejin.cn/post/7226267942148390949)
- [2023前端面試系列-- webpack & Git篇](https://juejin.cn/post/7196630860811075642)
- [@babel/preset-env和@babel/plugin-transform-runtime傻傻分不清](https://www.jianshu.com/p/cde9f1975686)