// import * as d3 from "d3";
 /* global d3 */

async function drawLineChart() {

  // load data
  const data = await d3.json("./data/pah_wikp_combo.json")
  console.log((data[0]))

  // set up accessor functions for data
  const yAccessor = d => d["Fatalities"]
  console.log(yAccessor(data[0]))

  const parseDate = d3.timeParse("%m/%d/%Y")

  const xAccessor = d => parseDate(d["Date"])
  console.log(xAccessor(data[0]))

  // create chart dimensions
  // wrapper dimensions
  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    }
  }

  // bounds dimensions
  dimensions.boundedWidth = dimensions.width
    - dimensions.margins.left
    - dimensions.margins.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margins.top
    - dimensions.margins.bottom
  console.log(dimensions)

  // create workspace and connect JS file to HTML file
  // the wrapper container is an svg
  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  // add the bounding box to the wrapper
  // the bounding box is an svg group element -> "g"
  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margins.left
    }px, ${
      dimensions.margins.top
    }px)`)

  // create scales
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))   // input space
    .range([dimensions.boundedHeight, 0])    // output space
  
  
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))   // input space
    .range([0, dimensions.boundedWidth])    // output space

  // draw data
  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  const line = bounds.append("path")
    .attr("d", d => lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "cornflowerblue")
    .attr("stroke-width", 2)

  // draw the axes
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
  
  const yAxis = bounds.append("g")
    .call(yAxisGenerator)
  
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  
  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${
      dimensions.boundedHeight
    }px)`)

  // draw axes labels
  const xAxisLabel = xAxis.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margins.bottom -10)
    .attr("fill", "currentcolor")
    .style("font-size", "1.4em")
    .html("Years")
  
  const yAxisLabel = yAxis.append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -dimensions.margins.left + 10)
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle")
    .attr("fill", "currentcolor")
    .style("font-size", "1.4em")
    .html("Fatalities")

}

drawLineChart()