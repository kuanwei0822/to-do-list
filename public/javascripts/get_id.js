$(document).ready(function(){
	// 將資料庫內部每個項目的 id 、 message 帶入到按鈕的自定義屬性

	var global_todomessage = [];
	var global_todoId = [];

	const url ="http://127.0.0.1:5000/data/getid";
	$.ajax({
		type: 'POST',
		url: url ,
		dataType: "json",
		success: function(res){		// res 為物件 object 型態
			function dataCopy(setArray,resArray){			// 將傳來的 resArray 存入 setArray 中
				for( let i = 0 ; i<resArray.length ; i++ ){
					setArray.push(resArray[i]);
				}
			}

			dataCopy(global_todomessage,res["todomessage"]);
			dataCopy(global_todoId,res["todoId"]);

			// console.log( "getid-> ok");
			// console.log( "global_todomessage",global_todomessage );
			// console.log( "global_todoId",global_todoId );
			// console.log( "data:",$(".messageButton.delete_button").length);

			for(let i = 0 ; i < $(".messageButton.delete_button").length ;i++){	// 自定義屬性 : button帶入id & message
				$(".messageButton.delete_button").eq(i).parent().data("data-message",global_todomessage[i]);
				$(".messageButton.delete_button").eq(i).parent().data("data-id",global_todoId[i]);
				console.log( $(".messageButton.delete_button").eq(i).parent() );
				console.log( $(".messageButton.delete_button").eq(i).parent().data("data-id") );
			}
		} 
	});
});