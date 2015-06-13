$(function(){
	for(var i = 0 ; i < PAGE_LINKS.length ; i++){
		var languagePage = PAGE_LINKS[i];
		for(var j = 0 ; j < languagePage.newsPages.length ; j++){
			var newsPage = languagePage.newsPages[j];
			feedNewsByRSS(newsPage.rss,newsPage.contentTag);
		}
	}
	function feedNewsByRSS(rssURL, contentTag){
	    $.get(rssURL, function(data) {
	    	var $XML = $(data),
		    items = $XML.find("item"),
		    p = $.when(1); // empty promise

			items.each(function(index,item){
				console.log("read at : "+index);
			    p = p.then(function(){
			    	console.log("read success : "+ index);
			        return getArticle(item,contentTag);
			    },function(){
			    	console.log("read failure : "+ index);
			    	return getArticle(item,contentTag);
			    });
			});
		});	
	};

	function getArticle(item,contentTag) {

        var $item = $(item),
        	articleSummary = {
	            title:       $item.find("title").text(),
	            link:        $item.find("link").text(),
	            description: $item.find("description").text(),
	            pubDate:     $item.find("pubDate").text(),
	            author:      $item.find("author").text()
        	};

        return $.ajax({
					url: articleSummary.link,
					context: document.body,
					dataType:'html'
				}).then(function (response){
					var webPage = $(response);
					$("#content").append("<h1>" + articleSummary.title +"</h1>");
					//$("#content").append("<h2>" + articleSummary.description +"</h2>");
					$("#content").append("<span>" + articleSummary.pubDate +"</span>");
					var contentElement  = webPage.find(contentTag);				
					var mainContent = contentElement.length > 1 ? $(contentElement.get(0)) : contentElement ;
				    mainContent.find("img").each(function(idx){
				    	imageElement = $(this);
				    	imageElement.removeClass();
				    	imageElement.addClass("img-responsive");
				    });
					$("#content").append(mainContent);
				}, function(reason){
					console.log("reason : ", reason);
				});
	}
});