d3.csv("most_cited.csv", function(error, data) {
    if(error) return;

    console.log(data);
    var svg = d3.select("#svg1"),
    margin = {top: 50, right: 50, bottom: 100, left: 550},
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");
    
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	data.sort(function(a, b) { return a.lenlist - b.lenlist; });
  
  	x.domain([0, d3.max(data, function(d) { return d.lenlist; })]);
    y.domain(data.map(function(d) { return d.title; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .attr('style','word-wrap: break-word; text-align:center;');

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.title); })
        .attr("width", function(d) { return x(d.lenlist); })
        .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX +5 + "px")
              .style("top", d3.event.pageY - 100 + "px")
              .style("display", "inline-block")
              .html((d.title) + "<br>" + (d.lenlist));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
    
    svg.append("text")
      .attr("x", margin.left )
      .attr("y", 40)
      .attr("class", "text-label")
      .attr("text-anchor", "middle")
      .text("Paper Title");

    // x axis label
    svg.append("text")
      .attr("x", (width + (margin.left + margin.right) )*2/3)
      .attr("y", height + margin.bottom)
      .attr("class", "text-label")
      .attr("text-anchor", "middle")
      .text("Number of citations");

})


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}