$( document).ready(function(){

	console.log("edit_button ok");

	$(".messageButton.edit_button").click( function(){		// 編輯按鈕
		console.log("11");
		$(this).toggleClass("disappear");
		$(this).prevAll().toggleClass("disappear");
		$(this).nextAll().toggleClass("disappear");
	})

	$(".updataButton.cancel_button").click(function(){		// 編輯取消按鈕
			console.log("22");
			$(this).toggleClass("disappear");
			$(this).prevAll().toggleClass("disappear");
			$(this).nextAll().toggleClass("disappear");
	});

	$(".updataButton.check_button").click(function(){		// 編輯確定按鈕
			console.log( $(this).siblings(".updataInput").val() );

			const url ="http://127.0.0.1:5000/data/updata";
			$.ajax({
				type: 'POST',
				url: url ,
				data: {
					"updataMessage" : $(this).siblings(".updataInput").val(),
					"updataId"		: $(this).parent().data("data-id")
				},
				success: function(){
					console.log("delete function");

					// 刷新頁面:
					// form 表單送出之後會刷新頁面 -> render 進而有效
					// ajax 送出請求並不會刷新頁面 -> 必須再次刷新頁面
					location.replace("http://127.0.0.1:5000/data");
				} 
			});


	});

});

