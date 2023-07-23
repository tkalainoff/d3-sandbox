// import * as d3 from "d3";
/* global d3 */

async function drawLineChart() {
  const dataset = await d3.json("./data/my_weather_data.json");

  const yAccessor = d => d.temperatureMax
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => dateParser(d.date)

// wrapper dimensions
  // contains chart elements beyond the actual data points
  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top:15,
      right: 15, 
      bottom: 40,
      left: 60,
    }
  }

// bounds dimensions
  // just contains the actual data points
  dimensions.boundedWidth = dimensions.width
    - dimensions.margins.left
    - dimensions.margins.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margins.top
    - dimensions.margins.bottom
  console.log(dimensions)
}

drawLineChart()