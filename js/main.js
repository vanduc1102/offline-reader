$(function(){
	var loadingButton = $('#myButton');
	chrome.storage.local.set({ducnguyen:"hello workd"},function(){
			console.log('set data finished');
	});
	chrome.storage.local.get('ducnguyen',function(data){
			console.log("data : ", data);
	});
	for(var i = 0 ; i < PAGE_LINKS.length ; i++){
		var languagePage = PAGE_LINKS[i];
		for(var j = 0 ; j < languagePage.newsPages.length ; j++){
			var newsPage = languagePage.newsPages[j];
			feedNewsByRSS(newsPage.rss,newsPage);
		}
	}
	function feedNewsByRSS(rssURL, newsPage){
	    $.get(rssURL, function(data) {
	    	var $XML = $(data),
		    items = $XML.find("item"),
		    p = $.when(1); // empty promise

			items.each(function(index,item){
				console.log("read at : "+index);
			    p = p.then(function(){
			    	console.log("read success : "+ index);
			        return getArticle(item,newsPage);
			    },function(){
			    	console.log("read failure : "+ index);
			    	return getArticle(item,newsPage);
			    });
			});
		});	
	};

	function getArticle(item,newsPage) {
				loadingButton.button('loading');
        var $item = $(item),
        	articleSummary = {
	            title:       $item.find("title").text(),
	            link:        $item.find("link").text(),
	            description: $item.find("description").text(),
	            pubDate:     $item.find("pubDate").text(),
	            author:      $item.find("author").text()
        	};
        
        if(isIgnoreLink(articleSummary.link, newsPage.ignoreLinks)){
        	return;
        }

        return $.ajax({
					url: articleSummary.link,
					context: document.body,
					dataType:'html'
				}).then(function (response){
					var key = (new Date()).getTime();
					chrome.storage.local.set({ key: articleSummary,value: response}, function() {
  					console.log("Secret message saved : ");
  					chrome.storage.local.get({key: articleSummary}, function(data) {
  							console.log(data);
								var webPage = $(data);
								$("#content").append("<h1>" + articleSummary.title +"</h1>");
								$("#content").append("<span>" + articleSummary.pubDate +"</span>");
								var contentElement  = webPage.find(newsPage.contentTag);				
								var mainContent = contentElement.length > 1 ? $(contentElement.get(0)) : contentElement ;
								mainContent.find("img").each(function(idx){
									imageElement = $(this);
									imageElement.removeClass();
									imageElement.addClass("img-responsive");
								});
								$("#content").append(mainContent);
								loadingButton.button('reset');
							});
					}); 
					
				}, function(reason){
					console.log("reason : ", reason);
				});
	}
	
	function isIgnoreLink(link, ignoreList){
		for(var i = 0 ; i < ignoreList.length ; i++){
			var ignoreLink = ignoreList[i];
			if(link.indexOf(ignoreLink) > 0){
				return true;
			}
		}
		return false;		
	}
});