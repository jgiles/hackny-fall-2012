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
	
	// Prefill the Query with Gangnam style
	$('#queryForm .query').val('http://www.youtube.com/watch?v=9bZkp7q19f0');
	
	// Query
	$('#queryForm').bind('submit', function() {
		var query = $(this).find('.query').val();
		
		$.get('http://api.embed.ly/1/oembed?key=' + EMBED_KEY + '&url=' + query, function(data) {
			if (data && data.thumbnail_url) {
				$('body').css('background', '#424242 url(\'' + data.thumbnail_url + '\') repeat');

			}
		});

        getData(query,  function(data) {
            graph_lines(data.x, data.y);
            return data;
        });

		return false;
	}).trigger('submit');
});

function getData(url, fn) {
    $.getJSON('/data/' + encodeURIComponent(url), fn);
}

function graph_lines(x, y) {
	console.log(x);
	console.log(y);
	var chart;
	$(document).ready(function() {
	    chart = new Highcharts.Chart({
	        chart: {
	            renderTo: 'container',
	            type: 'line',
	            marginRight: 130,
	            marginBottom: 25
	        },
	        title: {
	            text: 'Title',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Subtitle',
	            x: -20
	        },
	        xAxis: {
	            categories: x
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            formatter: function() {
	                    return '<b>'+ this.series.name +'</b><br/>'+
	                    this.x +': '+ this.y +'°C';
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -10,
	            y: 100,
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Domain 1',
	            data: y
	        }]
	    });
	});
}	