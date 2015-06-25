$(function(){
	console.log("loading");
	var loadingButton = $('#myButton');
	var containerTag = $("#content");
	chrome.storage.local.clear(function(){

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
			//items.length = 2;
			//console.log(items);
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
			
			chrome.storage.onChanged.addListener(function(changes, namespace) {
				console.log('onChanged recieved');
		        for (key in changes) {
		          	var storageChange = changes[key];
		          	console.log('Storage key "%s" in namespace "%s" changed. ' +
		                      'Old value was "%s", new value is "%s".',
		                      key,
		                      namespace,
		                      storageChange.oldValue,
		                      storageChange.newValue);
		          	showContentAricle(containerTag, storageChange.newValue);
		     	}
		    });
		},function (error){
			console.log('cant read RSS cause by network');
			chrome.storage.local.get(function(data) {
				console.log(data);
				for (var i = data.length - 1; i >= 0; i--) {
					var article = data[i];
					showContentAricle(containerTag, article);
				};
			});
		});	
	};

	function showContentAricle(container, article){
		container.append("<h1>" + article.title +"</h1>");
		container.append("<span>" + article.pubDate +"</span>");
		// var contentElement  = webPage.find(newsPage.contentTag);				
		// var mainContent = contentElement.length > 1 ? $(contentElement.get(0)) : contentElement ;
		// mainContent.find("img").each(function(idx){
		// 	imageElement = $(this);
		// 	imageElement.removeClass();
		// 	imageElement.addClass("img-responsive");
		// });
		container.append(article.content);
	}

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
        console.log(articleSummary);
        if(isIgnoreLink(articleSummary.link, newsPage.ignoreLinks)){
        	return;
        }

        return $.ajax({
					url: articleSummary.link,
					context: document.body,
					dataType:'html'
				}).then(function (response){
					var key = getOnlyAphalNumbericString(articleSummary.link);
					console.log('set value with key : '+ key);
					console.log("response : ",response.length);
					var webPage = $(response);
					var content  = webPage.find(newsPage.contentTag).text();articleSummary
					articleSummary['content'] = content;
					var objectKeyValue = {};
					objectKeyValue[key] = articleSummary;
					chrome.storage.local.set(objectKeyValue, function() {
  						
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
	
	function getOnlyAphalNumbericString(str){
		return str.replace(/[^a-zA-Z0-9]/g, "");
	}
});