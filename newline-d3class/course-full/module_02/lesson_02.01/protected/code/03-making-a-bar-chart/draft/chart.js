// import * as d3 from "d3";
 /* global d3 */

async function drawBars() {
  // access data
  const data = await d3.json("./data/my_weather_data.json")
  console.log(data[0])

  // create accessor funtions
  const xAccessor = d => d.humidity
  console.log(xAccessor(data[0]))

}
drawBars()