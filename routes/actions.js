const express = require("express");
const router = express.Router();

const mongo = require('mongodb').MongoClient;

router.get("/",function(req, res){	// 首頁 + 載入全部資料 1

	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
			col.find({type:"todoItem" }).toArray(function(err,fd){		//find({}) 為找到全部項目
				console.log("findData=",fd);				// 找到的 fd 資料為JSON形式:[{obj1},{obj2},{obj3}]
				
				var todomessage =[];						// 把 fd 中每筆資料的 message 項目拆解出來
				for(let i=0 ; i<fd.length ;i++){			// todomessage 用來裝所有 todo 資料的 message
					todomessage.push(fd[i]["message"]);
				}

				console.log("todomessage=",todomessage);

				res.render('layout_1',{ message:todomessage });  // render: 渲染網頁
				console.log("mongodb is connect!");

			});
		})
		console.log("find!");
		
		client.close(); //關閉連線
	});
})


router.post("/add",function(req, res){	// 資料庫 新增資料 2
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
		    col.insert({ id:3, message:"3*string", type:"todoItem" });
		})
	
		console.log('Document add Successfully');
		client.close(); //關閉連線
	});
})

router.get("/search",function(req, res){	// 資料庫 關鍵字查尋 3

})

router.get("/update",function(req, res){	// 資料庫 更改資料 4
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
		    col.update({id:4},{ $set: { firstName:'sss', lastName:'iii'} },{w:1},function(err, result){
		    	if(err) throw err;
         		console.log('Document Updated Successfully');});
		})
	
		console.log('mongodb is connect!');
		client.close(); //關閉連線
	});
})

router.get("/delete",function(req, res){	// 資料庫 刪除資料 5
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
		    col.remove({id:4},{w:1},function(err, result){
		    	if(err) throw err;
         		console.log('Document Removed Successfully');});
		})
	
		console.log('mongodb is connect!');
		client.close(); //關閉連線
	});
})

router.get("/find",function(req, res){	// 資料庫找到資料
	mongo.connect("mongodb://localhost:27017/mymondb",function (err,client){
		if(err){throw err;};

		const db = client.db("test");
		
		db.collection('Persons',function(err,col){
			col.find({firstName:"aaa"}).toArray(function(err,fd){
				console.log("findData=",fd);
			});
		})
	
		console.log("find!");
		client.close(); //關閉連線
	});
})


module.exports = router;