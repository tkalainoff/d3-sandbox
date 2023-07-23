// import * as d3 from "d3";
 /* global d3 */

async function drawLineChart() {

  // load data
  const data = await d3.json("./data/my_weather_data.json");
  console.log(data)

  // accessor functions - why?
    // easy to change and adapt
    // always at the top
    // good for documentation legability
    // helpful for practical framing

  const yAccessor = d => d["temperatureMax"]
  console.log(yAccessor(data[0]))

  // without date format
  // const xAccessor = d => d["date"]

  // with date format
  const parseDate = d3.timeParse("%Y-%m-%d")
  const xAccessor = d => parseDate(d["date"])

  console.log(xAccessor(data[0]))
}

drawLineChart()