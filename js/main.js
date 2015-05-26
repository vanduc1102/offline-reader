$(function(){
	$('input').on('click',function(){
		$('body').append('<h1>Hello </h1>');
	});
	function loadPage(){
		$('#content').load('http://thethao.vnexpress.net/photo/hinh-bong-da/cau-thu-u23-viet-nam-vui-dua-trong-be-boi-3224483.html'); 
	}; 
	loadPage();
	/*
	$.ajax({
		url: "http://www.google.com/intl/en/chrome/assets/common/images/devices/devices-selector-pixel.jpg#.jpg",
		type: "GET",
		dataType: "binary",
		processData: false,
		success: function(result){
			console.log("result : ", result);
		}
	});
	var loadImage = function(){
		var element = document.getElementById('content');
		var xhr = new XMLHttpRequest();
		var imageUrl = 'http://www.google.com/intl/en/chrome/assets/common/images/devices/devices-selector-pixel.jpg#.jpg';
		xhr.open('GET',imageUrl );
		xhr.responseType = 'blob';
		xhr.onload = function() {
			var img = document.createElement('img');
			img.setAttribute('data-src', imageUrl);
			img.className = 'icon';
			var objURL = this._createObjectURL(xhr.response);
			img.setAttribute('src', objURL);
			element.appendChild(img);
		};
		xhr.send();
	}
	loadImage();
	*/
	
});