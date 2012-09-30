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
	
	// Bubble visualization
	initBubbles();

	
	// Query
	$('#queryForm').bind('submit', function() {
		var query = $(this).find('.query').val();


		
		//$('#embedWrapper').html('<a href="' + query + '"></a>')
		//	.embedly({key: EMBED_KEY});
		
		$.get('http://api.embed.ly/1/oembed?key=' + EMBED_KEY + '&url=' + query, function(data) {
			console.log(data);
			if (data && data.thumbnail_url) {
				if (data.html) {
					$('#embedHtml').html(data.html).show();
					$('#embedPic').hide();
				}
				else if(data.thumbnail_url) {
					$('#embedPic').attr('src', data.thumbnail_url).show();
					$('#embedHtml').hide();
				}
			}
		});
		
		return false;
	});
});


function initBubbles() {
	var r = 960,
	    format = d3.format(",d"),
	    fill = d3.scale.category20c();
	
	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([r, r])
	    .padding(1.5);
	
	var vis = d3.select("#chart").append("svg")
	    .attr("width", r)
	    .attr("height", r)
	    .attr("class", "bubble");
	
	d3.json("/static/flare.json", function(json) {
	  var node = vis.selectAll("g.node")
	      .data(bubble.nodes(classes(json))
	      .filter(function(d) { return !d.children; }))
	    .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	
	  node.append("title")
	      .text(function(d) { return d.className + ": " + format(d.value); });
	
	  node.append("circle")
	      .attr("r", function(d) { return d.r; })
	      .style("fill", function(d) { return fill(d.packageName); });
	
	  node.append("text")
	      .attr("text-anchor", "middle")
	      .attr("dy", ".3em")
	      .text(function(d) { return d.className.substring(0, d.r / 3); });
	});
	
	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
	  var classes = [];
	
	  function recurse(name, node) {
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, className: node.name, value: node.size});
	  }
	
	  recurse(null, root);
	  return {children: classes};
	}
}