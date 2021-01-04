const express = require("express");
const app = express();
const bodyParser = require("body-parser");		// actions.js 中 POST 需要使用到
app.use(bodyParser.urlencoded({ extended: false }));

const actions = require("./routes/actions") 	// ./ 表示當前路徑，引入 actions 檔案(處理路由)

app.use(express.static('public'));		// 引入靜態檔案

app.set("view engine","pug");		// app 中設定 樣板引擎種類
app.set("views",'./views');			// 第一個 views 為固定字，./views 為指定的目錄(樣版資料夾)

app.use("/data",actions)						// app.use 載入自定義的模組
// 載入之後 actions 這個檔案會幫我處理以下事情
// app.get('/', function (req, res) {
//     res.render('index');  // render: 渲染網頁
// });


 
var server = app.listen(5000, function () {
    console.log('Node server is running..');
});