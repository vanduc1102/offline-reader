$(function(){
	$('input').on('click',function(){
		$('body').append('<h1>Hello </h1>');
	});
	rssUrl = 'http://www.tinhte.vn/rss';
    $.get(rssUrl, function(data) {
    	var $XML = $(data);
	    $XML.find("item").each(function() {
	        var $this = $(this),
	            item = {
	                title:       $this.find("title").text(),
	                link:        $this.find("link").text(),
	                description: $this.find("description").text(),
	                pubDate:     $this.find("pubDate").text(),
	                author:      $this.find("author").text()
	            };
	            console.log(item);
				$.ajax({
					url: item.link,
					context: document.body,
					dataType:'html'
				}).then(function (response){
					// var data = response;
					// var webPage = $(data);
					// var contentPart = webPage.find("div.main_content_detail");
					// var titleNews = contentPart.find("div.title_news").find("h1").text();
					// $("#content").append("<h1>"+titleNews+"</h1>");
					// var shortIntro = contentPart.find("div.short_intro");
					// $("#content").append(shortIntro);
					// var mainContent = contentPart.find("div.fck_detail.width_common");
				 //    mainContent.find("img").each(function(idx){
				 //    	$(this).addClass("img-responsive");
				 //    });
				//$("#content").append(mainContent);


					var data = response;
					var webPage = $(data);
					var contentPart = webPage.find("div#content");

					$("#content").append("<h1>"+item.title+"</h1>");

					var mainContent = contentPart.find("div.messageInfo.primaryContent:first");
				    mainContent.find("img").each(function(idx){
				    	$(this).addClass("img-responsive");
				    });

					$("#content").append(mainContent);
				}, function(reason){

				});
	    });
	});	
});