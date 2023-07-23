// import * as d3 from "d3";
 /* global d3 */

async function drawLineChart() {
  const data = await d3.json("./data/my_weather_data.json");

  const yAccessor = d => d.temperatureMax
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => dateParser(d.date)

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)
  
  // Create scales
    
  const yScale = d3.scaleLinear()
    // .domain([0, 100])
    .domain(d3.extent(data, yAccessor))
    // domain is input space (min, max values to be charted)
    .range([dimensions.boundedHeight, 0])
      // range is output space (space of data from top of the chart)
      console.log(yScale(0))
      // if we have a temp of 0, plot a point 345 px from the top
      console.log(d3.extent(data, yAccessor))
      // returns the minimum-maximum temp, and the maximum-maximum temp

  const freezingTemperaturePlacement = yScale(32)
  const freezingTemperatures = bounds.append("rect")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", dimensions.boundedHeight -freezingTemperaturePlacement)
      .attr("fill", "#e0f3f3")

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
}

drawLineChart()