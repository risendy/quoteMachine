var randomColor = function() {
	var safeColors = ['00','33','66','99','cc','ff'];

	var rand = function() {
	    return Math.floor(Math.random()*6);
	};

    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};

function randomizeBg()
{
		$('body').animate({
            backgroundColor: randomColor()
     });	
}

function resizeContainer()
{
	var heightText = $("#text").height();
	var heightQuoteBox = $(".quote_box").height();

    $(".quote_box").css({"height": (heightText+250)+"px"});
}

function getRandomQuote()
{
	$.LoadingOverlay("show");
	
	reddit.random("Showerthoughts").fetch(function(res) {
		var threadName=res[0]['data']['children'][0]['data']['title'];
		var authorName=res[0]['data']['children'][0]['data']['author'];
		var url=res[0]['data']['children'][0]['data']['url'];

		$('#text').html(threadName);
		$('.quote_author').html("- "+authorName);
		$('#redditLink').attr('href', url);

		resizeContainer();

		$.LoadingOverlay("hide");
	});

	randomizeBg();
}

function handleClick(event)
{
	event.preventDefault();

	getRandomQuote();
}

$(function() {

	getRandomQuote();

	$('#getNewQuoteButton').on('click', handleClick);
});
