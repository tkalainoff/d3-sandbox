// import * as d3 from "d3";
 /* global d3 */

async function drawScatter() {
  // load data
  const data = await d3.json("./data/pah_wikp_combo.json")
  console.log(data[0])

   // set up accessor functions for data
  const xAccessor = d => d.Fatalities
  const yAccessor = d => d.Wounded
  const colorAccessor = d => d.School

  console.log(xAccessor(data[1]))
  console.log(yAccessor(data[1]))

  // create chart dimensions
  // wrapper dimensions
  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])
  // will return whichever dimension is smaller
  // to ensure it fits in the window
  const dimensions = {
    width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    }
  }

  // bounds dimensions
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.right - dimensions.margin.left
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top - dimensions.margin.bottom

  // draw canvas
  // create workspace and connect JS file to HTML file
  // the wrapper container is an svg
  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    // .style("border", "1px solid")

  // add the bounding box to the wrapper
  // the bounding box is an svg group element -> "g"
  const bounds = wrapper.append("g")
    .style("transform", `translate(${
      dimensions.margin.left
    }px, ${
      dimensions.margin.top
    }px)`)

  // create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()
  console.log(xScale.domain())

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()
  console.log(yScale.domain())
  
  const colorScale = d3.scaleOrdinal()
    .domain(["C", "HS", "MS", "ES"])
    .range(["#B4F193", "#1299C6", "#00E0D5", "#FFA600"])

  // draw data
  const dots = bounds.selectAll("circle")
    .data(data)
  
  dots.join("circle")
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 5)
    // .attr("fill", "cornflowerblue")
    .attr("fill", d => colorScale(colorAccessor(d)))


  // draw peripherals
  // draw axes
  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  
  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`)

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  // draw labels
  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "currentcolor")
      .style("font-size", "1.4em")
      .html("Number of Fatalities")
  
  const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 10)
      .style("transform", `rotate(-90deg)`)
      .attr("fill", "currentcolor")
      .style("font-size", "1.4em")
      .html("Number of Injured")
      .style("text-anchor", "middle")

}
drawScatter()