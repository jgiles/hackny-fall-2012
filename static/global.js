var EMBED_KEY = 'd8c645e9b9d643b49d1e0ccb3f66e89e';
var theData = {};

$(function() {
	// Prefill the Query with Gangnam style
	$('#queryForm .query').val('http://www.youtube.com/watch?v=9bZkp7q19f0')
		.bind('click', function() { // Highlight entire input
			$(this).select();
		});

	// Query
	$('#queryForm').bind('submit', function() {
		var query = $(this).find('.query').val();

		$.get('http://api.embed.ly/1/oembed?key=' + EMBED_KEY + '&url=' + query, function(data) {
			if (data && data.thumbnail_url) {
				$('body').css('background', '#424242 url(\'' + data.thumbnail_url + '\') repeat');

			}
		});

        getData(query,  function(data) {
        	console.log(data);
        
            graph_lines(data.x, data.y);
            circles([]);
            graph_lines(data);
            
            theData = data;
            
            return data;
        });

		return false;
	}).trigger('submit');
});

function getData(url, fn) {
    $.getJSON('/data/' + encodeURIComponent(url), fn);
}

function graph_lines(data) {
	var chart;
	$(document).ready(function() {
	    chart = new Highcharts.Chart({
	        chart: {
	            renderTo: 'container',
	            type: 'line',
	            marginRight: 20,
	            marginBottom: 25,
	            backgroundColor: '#000',
	            //plotBorderColor: '#fff'
	            style: {
	            	opacity: '0.8'
	            }
	        },
	        title: {
	        	text: 'Link Clicks'
	        },
	        /* title: {
	            text: 'Title',
	            text: 'Total',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Aggregate views',
	            x: -20
	        }, */
	        xAxis: {
	            labels: {
	            	enabled: false
	            },
	            categories: data.x
	        },
	        yAxis: {
	            title: {
	                text: 'Link Clicks'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            formatter: function(a) {
	            	if (theData.referrers) {
		            	circles(theData.referrers, this.point.config);
		            }
	            	var day = new Date(0);
	            	day.setUTCSeconds(this.x);
	              	return '<b>'+ Math.round(this.y) +' Clicks</b><br/>'
	              		+ ' on ' + (day.getMonth() + 1) + '.' + day.getDate() + '.' + day.getFullYear();
	            },
	            crosshairs: true
	        },
	        legend: {
	        	enabled: false
	        },
	        /* legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -10,
	            y: 100,
	            borderWidth: 0
	        }, */
	        series: [{
	            name: 'Domain 1',
				data: data.y
			}, {name: 'Domain 2',
				data: data.z
			}]
	    });
	});
}	

// Prints equally spaced circles with proportional size
function circles(obj, i) {
	for (var key in obj) {
	}
	
	// Make test da
	
	var maxRadius = 75;
	var containerWidth = $('#container').width() * 0.66; // Graph width * ratio
	var circleWidth = containerWidth / obj.length;
	var circleHtml = $(document.createElement('div'));
	
	for (var key in obj) {
		var p = obj[key][i];
		console.log(p);
		
		// Add circle
		var circle = $(document.createElement('div'));
		var height = p * 2 * maxRadius;
		circle.css({
			marginLeft: i > 0 ? circleWidth : 0,
			verticalAlign: 'middle',
			display: 'inline-block',
			height: height,
			borderRadius: height / 2,
			background: getDomainColor(key),
			width: height,
			position: 'relative'
		});
		circle.addClass('shadow');
		circleHtml.append(circle);
		
		// Add domain name
		var domainName = $(document.createElement('p'));
		domainName.css({
			position: 'absolute',
			textAlign: 'center',
			left: '50%',
			right: '50%',
			marginLeft: -circleWidth / 2,
			width: circleWidth,
			top: -20,
			fontWeight: 'bold',
			color: '#fff'
		}).html(key);
		circle.append(domainName);
	}
	
	$('#circles').html(circleHtml.html());
}

function getDomainColor(name) {
	name = name.toLowerCase();
	if (/facebook/.test(name)) {
		return '#3b5a9b';
	}
	else if (/twitter/.test(name)) {
		return '#36c8f9';
	}
	else if (/tumblr/.test(name)) {
		return '#32506a';
	}
	else if (/youtube/.test(name)) {
		return '#ee3537';
	}
	else {			
		return '#d7d7d7';
	}
}