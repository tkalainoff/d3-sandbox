// import * as d3 from "d3";
/* global d3 */

async function drawScatter() {

  // 1. Access data
  let dataset = await d3.json("./data/my_weather_data.json")

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity

  // 2. Create chart dimensions

  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
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
  
  // 4. Create scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()
  
  // bounds.append("circle")
  //     .attr("cx", 100)
  //     .attr("cy", 100)
  //     .attr("r", 100)

// draws one set of dots first, and the remaining dots second
  // const drawDots = (dataset, color) => {
  // const dots = bounds.selectAll("circle")
  //     .data(dataset)
  //   .enter().append("circle")
  //     .attr("cx", d => xScale(xAccessor(d)))
  //     .attr("cy", d => yScale(yAccessor(d)))
  //     .attr("r", 5)
  //     .attr("fill", color)
  // }
  // drawDots(dataset.slice(0,100), "gray")
  // setTimeout(() => {
  //   drawDots(dataset, "cornflowerblue")
  // }, 1000)
  // }

  const dots = bounds.selectAll("circle")
      .data(dataset)

    dots.join("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", "cornflowerblue ")
  }
  
drawScatter()