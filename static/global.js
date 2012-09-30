var EMBED_KEY = 'd8c645e9b9d643b49d1e0ccb3f66e89e';

$(function() {
	// Timeline
	var topDiff = 3;

	// Move to first day
    var firstEl = $('.timeline li:first');
    $('.timeline .slider').css('top', firstEl.position().top - topDiff);

	// Move to clicked day
	$('.timeline li').bind('click', function() {
		console.log("test");
   		var el = $(this);
   		$('.timeline .slider').animate({
	   		top: el.position().top - topDiff
   		}, 350, function() {
      		// Animation complete
 	  	});
	});
	
	

	
	// Query
	$('#queryForm').bind('submit', function() {
		var query = $(this).find('.query').val();


		
		//$('#embedWrapper').html('<a href="' + query + '"></a>')
		//	.embedly({key: EMBED_KEY});
		
		$.get('http://api.embed.ly/1/oembed?key=' + EMBED_KEY + '&url=' + query, function(data) {
			console.log(data);
			if (data && data.thumbnail_url) {
				if (data.html) {
					$('#embedHtml').html(data.html);
				}
				else if(data.thumbnail_url) {
					$('#embedPic').attr('src', data.thumbnail_url);
				}
			}
		});
		
		return false;
	});
});

function getData(url) {
    alert(url);
    alert(encodeURIComponent(url));
    $.getJSON('/data/' + encodeURIComponent(url), function(data) {
        alert(JSON.stringify(data));
        return data;
    });
}
