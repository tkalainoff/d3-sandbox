<script>
//   import transform from "d3-geo/src/transform";

    export let xScale;
    export let height;
    export let width;
    console.log({xScale})
    let xTicks = [0, 25, 50, 75, 100]
</script>
<g class='axis x' transform="translate(0 {height})">
{#each xTicks as tick, index}
    <g class='tick' transform="translate({xScale(tick)} 0)">
        <line
            x1="0"
            x2="0"
            y="0"
            y2="6"
            stroke="hsla(212, 10%, 53%, 1)"/>
        <text
            x={0}
            y={6}
            dy={10}
            dominant-baseline="middle"
            text-anchor={index === 0 ? "start" : "middle"}
        >{tick}%</text>
    </g>
{/each}
<text x={width} y="0"
    dy="-6"
    dominant-baseline="start"
    text-anchor="end"
    class='axis-title'
>Final Grade &rarr;
</text>
</g>

<!-- dy propoerty -->
<!-- dominant-baseline property-->

<style></style>