var z = d3.scaleOrdinal()
    .range(["#abdbf2",
    "#84caec",
    "#5cbae5",
    "#27a3dd",
    "#1b7eac",
    "#156489",
    "#d7eaa2",
    "#c6e17d",
    "#b6d957",
    "#9dc62d",
    "#759422",
    "#5b731a",
    "#fde5bd",
    "#fbd491",
    "#fac364",
    "#f8ac29",
    "#dd8e07",
    "#b57506",
    "#d5dadc",
    "#bac1c4",
    "#9ea8ad",
    "#848f94",
    "#69767c",
    "#596468",
    "#f99494",
    "#f66364",
    "#f33334",
    "#dc0d0e",
    "#b90c0d",
    "#930a0a"]);

var svg = d3.select("svg"),
    margin = {top: 30, right: 70, bottom: 100, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.5)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

d3.csv("author_count.csv", function(d, i, columns) {
  for (i = 2, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  // if (error) throw error;

  var keys = data.columns.slice(2);
  console.log(keys);
  data.sort(function(a, b) { return b.total - a.total; });
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.name); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 5)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(20)")
      .style("text-anchor", "start");;

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32d")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .attr("transform", function(d, i) { return "translate(0,-8)"; })
      .text("Number of publications");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width + 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width + 70)
      .attr("y", 9.5)
      .attr("dy", "0.32d")
      .text(function(d) { return d; });
});
