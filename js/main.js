$(function(){
	$('input').on('click',function(){
		$('body').append('<h1>Hello </h1>');
	});
	$.ajax({
		url: "http://vnexpress.net/tin-tuc/thoi-su/thu-truong-thong-tin-truyen-thong-trung-quoc-rao-riet-lan-bien-bat-hop-phap-3225006.html"
		,context: document.body,
		dataType:'html'
	}).done(function(data) {
		var webPage = $(data);
		var contentPart = webPage.find("div.main_content_detail");
		var titleNews = contentPart.find("div.title_news");
		$("#content").append(titleNews);
		var shortIntro = contentPart.find("div.short_intro");
		$("#content").append(shortIntro);
		var mainContent = contentPart.find("div.fck_detail.width_common");
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
	    $("#content").append(titleNews);
	    //var shortIntro = contentPart.find("div.short_intro");
	    //$("#content").append(shortIntro);
	    var mainContent = contentPart.find("section.article-body");
	    $("#content").append(mainContent);
  });
	
});