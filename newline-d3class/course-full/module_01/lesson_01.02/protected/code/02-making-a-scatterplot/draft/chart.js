// import * as d3 from "d3";
 /* global d3 */

async function drawScatter() {
  const data = await d3.json("./data/my_weather_data.json")
  // console.log(data[0])

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity

  // console.log(xAccessor(data[0]))
  // console.log(yAccessor(data[0]))


}
drawScatter()