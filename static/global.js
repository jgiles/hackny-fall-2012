$(function() {

	// Move to first day
       var firstEl = $('.timeline li:first');
       $('.timeline .slider').css('top', firstEl.position().top);

	// Move to clicked day
	$('.timeline li').bind('click', function() {
		console.log("test");
   var el = $(this);
   $('.timeline .slider').animate({
	   top: el.position().top
   }, 500, function() {
      // Animation complete.
   });
});
});