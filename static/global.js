var EMBED_KEY = 'd8c645e9b9d643b49d1e0ccb3f66e89e';

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
	            formatter: function() {
	            	circles();
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
function circles(arr) {
	
	// Make test data
	arr = [
		{
			name: 'Facebook',
			p: Math.random() // .46
		},
		{
			name: 'Twitter',
			p: Math.random() //.2
		},
		{
			name: 'Tumblr',
			p: Math.random() //.2
		},
		{
			name: 'YouTube',
			p: Math.random() //.14
		}
	];
	
	var maxRadius = 75;
	var containerWidth = $('#container').width() * 0.66; // Graph width * ratio
	var circleWidth = containerWidth / arr.length;
	var circleHtml = $(document.createElement('div'));
	
	for (var i = 0; i < arr.length; i++) {
		var a = arr[i];
		
		// Add circle
		var circle = $(document.createElement('div'));
		var height = a.p * 2 * maxRadius;
		circle.css({
			marginLeft: i > 0 ? circleWidth : 0,
			verticalAlign: 'middle',
			display: 'inline-block',
			height: height,
			borderRadius: height / 2,
			background: getDomainColor(a.name),
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
		}).html(a.name);
		circle.append(domainName);
	}
	
	$('#circles').html(circleHtml.html());
}

function getDomainColor(name) {
	name = name.toLowerCase();
	switch (name) {
		case 'facebook':
			return '#3b5a9b';
			break;
		case 'twitter':
			return '#36c8f9';
			break;
		case 'tumblr':
			return '#32506a';
			break;
		case 'youtube':
			return '#ee3537';
			break
		default:
			return '#d7d7d7';
	}
}