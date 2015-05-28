$(function(){
	$('input').on('click',function(){
		$('body').append('<h1>Hello </h1>');
	});
	$.ajax({
		url: "http://giaitri.vnexpress.net/tin-tuc/gioi-sao/quoc-te/chang-duong-6-nam-yeu-nhau-cua-hieu-minh-angelababy-3225188.html"
		,context: document.body,
		dataType:'html'
	}).done(function(data) {
		var webPage = $(data);
		var contentPart = webPage.find("div.main_content_detail");
		var titleNews = contentPart.find("div.title_news").find("h1").text();
		$("#content").append("<h1>"+titleNews+"</h1>");
		var shortIntro = contentPart.find("div.short_intro");
		$("#content").append(shortIntro);
		var mainContent = contentPart.find("div.fck_detail.width_common");
	    mainContent.find("img").each(function(idx){
	    	$(this).addClass("img-responsive");
	    });
		$("#content").append(mainContent);
	});

	$.ajax({
    	url: "http://www.bloomberg.com/news/articles/2015-05-27/the-wrath-of-hank-ex-aig-ceo-greenberg-won-t-give-up-at-age-90"
    	,context: document.body,
    	dataType:'html'
  	}).done(function(data) {
    	var webPage = $(data);
	    var contentPart = webPage.find("main#content");
	    var titleNews = contentPart.find("span.lede-headline__highlighted").text();
	    $("#content").append("<h1>"+titleNews+"</h1>");
	    //var shortIntro = contentPart.find("div.short_intro");
	    //$("#content").append(shortIntro);
	    var mainContent = contentPart.find("section.article-body");
	    contentPart.find("img").each(function(idx){
	    	$(this).addClass("img-responsive");
	    });
	    $("#content").append(mainContent);
  });
	
});