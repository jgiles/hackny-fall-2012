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
      		// Animation complete.
 	  	});
	});
	
	
	// Query
	$('#queryForm').bind('submit', function() {
		alert('hey cunt');
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
