/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

const MARGIN = { LEFT: 70, RIGHT: 20, TOP: 10, BOTTOM: 40 };
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const g = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 38)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month");

g.append("text")
  .attr("class", "y axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -HEIGHT / 2)
  .attr("y", -48)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Revenue");

d3.csv("data/revenues.csv").then((data) => {
  data.forEach((d) => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([0, WIDTH])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.revenue)])
    .range([HEIGHT, 0]);

  const xAxisCall = d3.axisBottom(x);
  g.append("g").attr("class", "x axis").attr("transform", `translate(0, ${HEIGHT})`).call(xAxisCall);

  const yAxixCall = d3.axisLeft(y).tickFormat(d3.format("$"));
  g.append("g").attr("class", "y axis").call(yAxixCall);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => y(d.revenue))
    .attr("x", (d) => x(d.month))
    .attr("width", x.bandwidth)
    .attr("height", (d) => HEIGHT - y(d.revenue))
    .attr("fill", "grey");
});
