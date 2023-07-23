// import * as d3 from "d3";
 /* global d3 */

async function drawScatter() {

  // 1. Access data
  let dataset = await d3.json("./data/my_weather_data.json")

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity

  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])
  const dimensions = {
    width,
    height: width, 
    margins: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    }
  }

dimensions.boundedWidth = dimensions.width
  - dimensions.margins.right - dimensions.margins.left
dimensions.boundedHeight = dimensions.height
  - dimensions.margins.top - dimensions.margins.bottom

  // different ways to get the smallest value
  const arr = [6, 2, 3, null, undefined]
  // const arr = [] // will return undefined, infinity
  console.log({
    d3: d3.min(arr), // will ignore null, undefined
    Math: Math.min(...arr)
  })



}
drawScatter()