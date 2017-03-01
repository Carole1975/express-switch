$(document).ready(function(){
	console.log('coucou');

	$.ajax({
		type: "Post",
		url : "../data/blog.json",
		datatype: "json",
		success: function(data){
		console.log('coucou2');
		}

	})

});