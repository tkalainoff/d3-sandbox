<script>
    export let yScale;
    export let width;
    $: console.log({yScale})

    let yTicks = yScale.ticks(4);
    console.log({yTicks})
</script>

<g class='axis y'>
{#each yTicks as tick, index}
<g class='tick' transform="translate(0 {yScale(tick)})">
    <line
        x1="0"
        y1="0"
        y2="0"
        x2={width}
        stroke={index === 0 ? "#8f8f8f" : "#e5e7eb"}
        />
    <text x="0" y="-5">{tick}
        {index === yTicks.length - 1 ? " hours studied" : ""}</text>
</g>
{/each}
</g>