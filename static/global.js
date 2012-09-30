var EMBED_KEY = 'd8c645e9b9d643b49d1e0ccb3f66e89e';

$(function() {
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
console.log(data);
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
	            marginRight: 130,
	            marginBottom: 25
	        },
	        title: {
	            text: 'Total',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Aggregate views',
	            x: -20
	        },
	        xAxis: {
	            categories: data.x
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
				data: data.y
			}, {name: 'Domain 2',
				data: data.z
			}]
	    });
	});
}