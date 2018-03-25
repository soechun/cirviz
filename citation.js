d3.csv("most_cited.csv", function(error, data) {
    if(error) return;

    console.log(data);
    var svg = d3.select("#svg1"),
    margin = {top: 20, right: 70, bottom: 100, left: 40},
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
        .call(d3.axisLeft(y));

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
})