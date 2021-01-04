$(document).ready(function(){


	$(".messageButton.delete_button").click(function(){

		console.log($(this));
		console.log($(this).parent().data("data-message"));
		console.log($(this).parent().data("data-id"));

		const url ="http://127.0.0.1:5000/data/delete";
		
		$.ajax({
			type: 'POST',
			url: url ,
			data: {
				"deleteMessage" : $(this).parent().data("data-message"),
				"deleteId"		: $(this).parent().data("data-id")
			},
			success: function(){
				console.log("delete function");

				// 刷新頁面:
				// form 表單送出之後會刷新頁面 -> render 進而有效
				// ajax 送出請求並不會刷新頁面 -> 必須再次刷新頁面
				location.replace("http://127.0.0.1:5000/data");
			} 
		});
		console.log("delete!");
	})
});