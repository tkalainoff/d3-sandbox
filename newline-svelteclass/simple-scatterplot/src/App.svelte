<script>
  // this is where logic lives
  import data from "$data/data.js";
  import { scaleLinear } from "d3-scale";
  console.log(data);

  const margin ={
      top:20,
      right: 20,
      bottom: 20,
      left: 0
    }

  let width = 400;
  // $: console.log({width})
  $: innerWidth = width - margin.left - margin.right;
  $: xScale = scaleLinear()
    .domain([0, 100]) // input
    .range([0, innerWidth]); // output

  let height = 400;
  let innerHeight = height - margin.top - margin.bottom;
  let yScale = scaleLinear()
    .domain([0, 60]) // input
    .range([innerHeight, 0]); // output
  
  import AxisX from "$components/AxisX.svelte"
  import AxisY from "$components/AxisY.svelte"

  let hoveredData;
  $: console.log(hoveredData);

  import Tooltip from "$components/Tooltip.svelte"

  import { fly } from "svelte/transition"
</script>

<h1>Students who studied longer scored higher on their final exams</h1>

<div class='chart-container' bind:clientWidth={width}>
<!-- Svelte (each) block -->
<svg {width} {height}>
  <g transform="translate({margin.left} {margin.top})">
  <AxisX {xScale} height={innerHeight} width={innerWidth}/>
  <AxisY {yScale} width={innerWidth} />
  {#each data.sort((a, b) => a.grade - b.grade) as d}
    <!-- <p>{d.name} studied for {d.hours} hours and scored {d.grade}</p> -->
    <circle
      in:fly={{ x: -10, opacity: 0, duration: 500 }}
      cx={xScale(d.grade)}
      cy={yScale(d.hours)}
      r={hoveredData === d ? 15 : 10}
      opacity={hoveredData ? (hoveredData === d ? 1 : .45) : 1}
      fill="purple"
      stroke="black"
      stroke-width="1"
      on:mouseover={() => {
        hoveredData = d;
      }}
      on:focus={() => {
        hoveredData = d;
      }}
      tabIndex="0"
      on:mouseleave={() => {
        hoveredData = null
      }}
    />
  {/each}
  </g>
</svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale} width={innerWidth}/>
  {/if}
</div>

<style>
  :global(.tick text, .axis-title){
    font-weight: 400;
    font-size: 12px;
    fill: #8f8f8f;
  }

  circle {
    transition: r 300ms ease, opacity 500ms ease;
    cursor: pointer;
  }

  h1 {
    font-size: 1.35rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }
</style>
