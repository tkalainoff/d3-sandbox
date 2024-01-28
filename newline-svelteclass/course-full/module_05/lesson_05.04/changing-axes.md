---
title: How to Update Axes Based On Scroll Position With Scrollytelling
# slug: 
description: Using scroll position to update axes
privateVideoUrl: https://fullstack.wistia.com/medias/1a2djd6a0a
isPublicLesson: false
useMdx: true
draft: false
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Last lesson, we left off with a scrollytelling story where each step triggered a new behavior or action.

<Embed title="5dggtr" module="04" lesson="02" />

This lesson, we'll go one step further and dynamically hide or show axes based on the current step. We'll first render our axes, and then add Svelte's native transitions for a smooth transition between steps.

## Render axes

Recall that in Svelte, we can use `{#if}` blocks to dynamically render content. In our case, we want to render our x-axis only when data is arranged by grade, and the y-axis only when data is arranged by hour.

```html
{#if currentStep > 1}
    <AxisY width={innerWidth} {yScale} />
{/if}
{#if currentStep > 0}
    <AxisX height={innerHeight} width={innerWidth} {xScale} />
{/if}
```

Nice! This dynamically hides and shows our axes depending on current step. 

## Transition axes

But as with last lesson, the issue now is **abruptness**. To add transitions to each axis, we'll use Svelte's built-in transitions within each axis component.

### X axis

In `AxisX.svelte`, let's import `transition/fade` and add it to the `g` element.

```html
<script>
    // Alongside other script code...
    import { fade } from "svelte/transition";
</script>

<g transition:fade class="axis x" transform="translate(0, {height})">
    <!-- Axis markup lives here... -->
</g>
```

For a more granular transition, we can apply the transition directives to **individual elements** within the `g` element. For example, we can apply the transition to each `.tick` element, and stagger their delay. based on their index (which we get from our `{#each}` block).

```html
<g class="axis x" transform="translate(0, {height})">
  {#each xTicks as tick, index}
    <g
      transition:fade={{ delay: index * 100 }}
      class="tick"
      transform="translate({xScale(tick)}, 0)"
    >
      <line x1={0} x2={0} y1={0} y2={6} stroke="hsla(212, 10%, 53%, 1)" />
      <text
        y={6}
        dy={9}
        text-anchor={index === 0 ? "start" : "middle"}
        dominant-baseline="middle">{tick}%</text
      >
    </g>
  {/each}
  <text transition:fade class="axis-title" y={-9} x={width} text-anchor="end"
    >Final Grade &rarr;</text
  >
</g>
```

Now, you'll notice each individual tick fades in, and they fade in one after another. 

### Y axis

Let's do the same for the y-axis. In `AxisY.svelte`, let's import `transition/fade` and add it to each `.tick` element.

```html
<script>
  // Alongside other script code...
  import { fade } from "svelte/transition";
</script>

<g class="axis y">
  {#each yTicks as tick, index}
    <g
      transition:fade={{ delay: index * 200 }}
      class="tick"
      transform="translate(0, {yScale(tick)})"
    >
      <line
        x1={0}
        x2={width}
        y1={0}
        y2={0}
        stroke={index === 0 ? "#8f8f8f" : "#e5e7eb"}
      />
      <text y={-3}
        >{index === yTicks.length - 1 ? `${tick} hours studied` : tick}</text
      >
    </g>
  {/each}
</g>
```

And our y-axis is handled as well!

<Embed title="9yb0fq" module="04" lesson="03" />

<!-- ## Need help? Further reading -->