// import * as d3 from "d3";
 /* global d3 */

async function drawLineChart() {
  // write your code here
  const data = await d3.json("data/my_weather_data.json")
  console.log(data)
}

drawLineChart()