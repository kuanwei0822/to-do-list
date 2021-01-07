const express = require("express");
const router = express.Router();

const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;	// 使用到 mongodb 的id 讀取套件

var id_num = 1;

router.get("/",function(req, res){	// 首頁 + 載入全部資料 1 完成

	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
			col.find({type:"todoItem" }).toArray(function(err,fd){		//find({}) 為找到全部項目
				console.log("findData=",fd);				// 找到的 fd 資料為JSON形式:[{obj1},{obj2},{obj3}]
				
				var todomessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				var todoId =[];  //###
				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					todomessage.push(fd[i]["message"]);
					todoId.push(fd[i]["_id"]);		//###
				}

				console.log("todomessage=",todomessage);
				console.log("todoId=",todoId);	//###


			//	res.set('Content-Type', 'get_id/js'); 				// ###
			//	res.setHeader('Content-Type','get_id/js');			// ###
			//	res.end( {"to_do_Id":todoId} );					// ### 
				
				res.render('index',{ message:todomessage });  // render: 渲染網頁	//###
				console.log("mongodb is connect!");
			});
		})
		console.log("find!");
		
		client.close(); //關閉連線
	});
})


router.post("/add",function(req, res){	// 資料庫 新增資料 2 完成
	console.log("req.body.inputdata = ",req.body.inputdata)
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
		    col.insert({ id:id_num, message: req.body.inputdata , type:"todoItem" });	// 資料庫新增資料
		    if( id_num < 100 ){ id_num++ ;}
		    	else{ id_num = 1}
		    col.find({type:"todoItem" }).toArray(function(err,fd){					// 新增資料後，刷新頁面(同"/data 效果")
				console.log("findData=",fd);				// 找到的 fd 資料為JSON形式:[{obj1},{obj2},{obj3}]
				
				var todomessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					todomessage.push(fd[i]["message"]);
				}

				console.log("todomessage=",todomessage);

				res.render('index',{ message:todomessage });  // render: 渲染網頁
				console.log("show all message! ");

			});
		})

		console.log('Document add Successfully');
		client.close(); //關閉連線
	});
})

router.post("/updata",function(req, res){	// 資料庫 更改資料 4 完成
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
		    col.update({ "_id": ObjectId(req.body.updataId) },{ $set: { message: req.body.updataMessage } },{w:1},function(err, result){
		    	if(err) throw err;
         		console.log('Document Updated Successfully');});

			col.find({type:"todoItem" }).toArray(function(err,fd){		// 更新資料後，刷新頁面(同"/data 效果")
				var todomessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					todomessage.push(fd[i]["message"]);
				}

				console.log("todomessage=",todomessage);

				res.render('index',{ message:todomessage });  // render: 渲染網頁
				console.log("show all message!!!!");
			});

		})
		console.log('mongodb is connect!');
		client.close(); //關閉連線
	});
})

router.post("/delete",function(req, res){	// 資料庫 刪除資料 5 完成
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
			console.log("deleteMessage = ",req.body.deleteMessage);
			console.log("deleteId = ",req.body.deleteId);

		    col.remove({ "_id": ObjectId(req.body.deleteId) },{w:1},function(err, result){	//解析ID專用函式:ObjectId
		    	if(err) throw err;
         		console.log('Document Removed Successfully');
         	});
		    col.find({type:"todoItem" }).toArray(function(err,fd){		// 刪除資料後，刷新頁面(同"/data 效果")
				console.log("findData=",fd);				// 找到的 fd 資料為JSON形式:[{obj1},{obj2},{obj3}]
				
				var todomessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					todomessage.push(fd[i]["message"]);
				}

				console.log("todomessage=",todomessage);

				res.render('index',{ message:todomessage });  // render: 渲染網頁
				console.log("show all message!!!!");

			});

		})
		console.log('mongodb is connect!');
		client.close(); //關閉連線
	});
})


router.post("/getid",function(req, res){	// 每次 render 都會取得 id & Message 完成

	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
			col.find({type:"todoItem" }).toArray(function(err,fd){		//find({}) 為找到全部項目
				console.log("findData=",fd);				// 找到的 fd 資料為JSON形式:[{obj1},{obj2},{obj3}]
				
				var getdataMessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				var getdataId =[];  //###

				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					getdataMessage.push(fd[i]["message"]);
					getdataId.push(fd[i]["_id"]);		
				}

				console.log("getdataMessage =",getdataMessage);
				console.log("getdataId=",getdataId);	


				res.setHeader('Content-Type', 'application/json');	//
				res.send( {
					"todoId":getdataId,
					"todomessage":getdataMessage
				} );					// 送回 JSON 檔案

				console.log("getdata is Success");
			});
		})
		console.log("find!");
		
		client.close(); //關閉連線
	});
})
module.exports = router;