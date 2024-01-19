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

  // 5. Draw data

  const dots = bounds.selectAll("circle")
    .data(dataset)
    .join("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("tabindex", "0")

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis.append("text")
      .attr("class", "x-axis-label")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .html("Dew point (&deg;F)")

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)

  const yAxis = bounds.append("g")
      .call(yAxisGenerator)

  const yAxisLabel = yAxis.append("text")
      .attr("class", "y-axis-label")
      .attr("x", -dimensions.boundedHeight / 2)
      .attr("y", -dimensions.margin.left + 10)
      .text("Relative humidity")

// 7. Set up interactions

// helps with hover accuracy/effectiveness
  const delaunay = d3.Delaunay.from(
    dataset,
    d => xScale(xAccessor(d)),
    d => yScale(yAccessor(d)),
  )
  console.log(delaunay)

  const voronoi = delaunay.voronoi()
  voronoi.xmax = dimensions.boundedWidth
  voronoi.ymax = dimensions.boundedHeight
  console.log(voronoi)

  bounds.selectAll(".voronoi")
    .data(dataset)
    .join("path")
      .attr("class", "voronoi")
      .attr("d", (d,i) => voronoi.renderCell(i))
      .on("mouseenter", onMouseEnter)
      .on("mouseleave", onMouseLeave)

  const tooltip = d3.select("#tooltip") 

  function onMouseEnter (event, d) {
    // const selection = d3.select(event.currentTarget)
    // console.log(selection)

    const date = d["date"]
    const dateParser = d3.timeParse("%Y-%m-%d")
    const formatDate = d3.timeFormat("%A, %B %-d, %Y")

    tooltip.select("#date")
      .text(formatDate(dateParser(date)))

    tooltip.select("#humidity")
      .text(yAccessor(d))

    tooltip.select("#dew-point")
      .text(xAccessor(d))

    const x = xScale(xAccessor(d))
      + dimensions.margin.left
    const y = yScale(yAccessor(d))
      + dimensions.margin.top

    tooltip.style("transform", `translate(`
      + `calc( -50% + ${x}px),`
      + `calc(-100% + ${y}px)`
      + `)`)

    const dayDot = bounds.append("circle")
      .attr("class", "tooltip-dot")
      .attr("cx", xScale(xAccessor(d)))
      .attr("cy", yScale(yAccessor(d)))
      .attr("r", 6.5)
      .style("fill", "maroon")
      .style("pointer-events", "none")

    tooltip.style("opacity", 1)
  }

  function onMouseLeave (event, d) {
    tooltip.style("opacity", 0)

    d3.selectAll(".tooltip-dot")
      .remove()
  }
  
}
drawScatter()