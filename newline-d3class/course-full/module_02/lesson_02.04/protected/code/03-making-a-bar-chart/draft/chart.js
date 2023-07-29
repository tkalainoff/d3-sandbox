// import * as d3 from "d3";
 /* global d3 */

 async function drawBars() {
  // access data
  const data = await d3.json("./data/my_weather_data.json")
  console.log(data[0])

  // create accessor funtions
  const xAccessor = d => d.humidity
  console.log(xAccessor(data[0]))

  const yAccessor = d => d.length // looks at the count within each of the buckets/bins

  // create chart dimensions
  const width = 600
  let dimensions = {
    width, 
    height: width * 0.6,
    margin: {
      top: 30, 
      right: 10,
      bottom: 50,
      left: 50,
    }
  }

  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top - dimensions.margin.bottom

  // draw canvas
  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px`)

  // create scales
  const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()

  const binGenerator = d3.bin()
      .domain(xScale.domain())
      .value(xAccessor)
      .thresholds(12)

  const bins = binGenerator(data)
  console.log(bins)
  console.log(bins[0].x0) // shows the lower bound (inclusive)
  console.log(bins[0].x1) // shows the upper bound (exclusive)

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, yAccessor)]) // x, is always 0 for a histogram
      .range([dimensions.boundedHeight, 0])
      .nice()

}
drawBars()