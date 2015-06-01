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
					$.ajax({
						url: item.link,
						context: document.body,
						dataType:'html'
					}).then(function (data){
						var webPage = $(data);
						$("#content").append("<h1>"+item.title+"</h1>");
						var contentElement  = webPage.find(contentTag);				
						var mainContent = contentElement.length > 1 ? $(contentElement.get(0)) : contentElement ;
					    mainContent.find("img").each(function(idx){
					    	$(this).addClass("img-responsive");
					    });
						$("#content").append(mainContent);
					}, function(reason){

					});
		    });
		});	
	};
});