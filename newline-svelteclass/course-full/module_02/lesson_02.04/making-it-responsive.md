---
title: Using Svelte's Dimension Bindings for Responsive Scatterplots
# slug: what-is-svelte
description: Using Svelte's dimension bindings to make our chart visible on all screen sizes
privateVideoUrl: https://fullstack.wistia.com/medias/zmoot8f66o
isPublicLesson: false
useMdx: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Here's where we left off in the last lesson:

<Embed title="gvknwt" module="01" lesson="02" />

One obvious problem with this chart is that it is not responsive. That is to say, it will remain at its fixed size (currently 400x400), no matter the screen size. On mobile, this would mean that the chart would get cut off; and on large screens, there would be unnecessary white space.

The goal of this module is to make our chart responsive. We want our chart to scale up or down as much as is necessary to have it fit and fill the available screen size.

Typically, responsiveness is a pain in data visualization. Surprisingly, you'll find that this lesson is one of our shortest — that's because of the tools that Svelte provides out of the box for responsive design.

This lesson will include two simple steps:

1. Creating a container `div` element and binding its `clientWidth` property to a variable
3. Making our existing scales reactive

### 1. Create a container `div` element

The first step in making our chart responsive is to wrap our SVG element in a container HTML `div`. Here, we're going to leverage Svelte's [dimension bindings](https://svelte.dev/tutorial/dimensions).

:::note

There are four dimension bindings available for each block-level element: `clientWidth`, `clientHeight`, `offsetWidth` and `offsetHeight`. 

Whereas `clientWidth` and `clientHeight` include the space taken up **excluding margin and padding**, `offsetWidth` and `offsetHeight` include the space taken up **including margin and padding**.

:::

<!-- FIXME: Image goes here -->

In short, we want to bind our chart container's `clientWidth` property to a variable that we'll call `width`. 

```html
<script>
    let width = 400;
    // Other logic goes here
</script>

<div class='chart-container' bind:clientWidth={width}>
    <svg width={width} height={height}>
        <!-- Chart goes here... -->
    </svg>  
</div>
```

:::note

`width` could be instantiated with an initial value of `0`, `undefined`, or anything else. Immediately  after the app loads, `width` will be set to the value of the `clientWidth` property of the `div` element.

:::

<!-- FIXME: Add interactive example of resizing and console.logging the width -->

### 2. Make our existing scales reactive

Recall that in `App.svelte`, we created two scales: `xScale` and `yScale`.

```html
<script>
    let xScale = scaleLinear()
        .domain([0, 100])
        .range([0, innerWidth]);

    let yScale = scaleLinear()
        .domain([0, max(data, d => d.hours)])
        .range([innerHeight, 0]);
</script>
```

You might think that with our newly created `width` variable, our `xScale` should automatically be updated; but if you resize your screen now, you'll see that's not the case: our `xScale` is still at its original domain and range, and our chart does not update as we would hope.

That's because our `xScale` is instantiated with the `let` keyword. (In other words, it is just a normal JavaScript variable.) In order to make it update alongside the `width` variable, we need to make it **reactive**. How do we do this? [The dollar label.](https://svelte.dev/tutorial/reactive-declarations) 

:::note

The dollar label (`$:`) in Svelte represents a reactive variable. Variables that follow that label will automatically update whenever any of their dependencies change. In the following example:

```html
<script>
    let count = 1;
    $: doubled = count * 2;
</script>

<p on:click={() => {count += 1}}>{count} doubled is {doubled}</p>
```

`doubled` will automatically update both in our `<script>` tag and in our markup. You can read more about reactive declarations [here](https://svelte.dev/tutorial/reactive-declarations).

:::

In our `App.svelte`, we'll replace our existing instantiations of `innerWidth` and of `xScale` (which both used `let`) with the dollar label (`$:`).

```html
<script>
    $: innerWidth = width - margin.left - margin.right;
    $: xScale = scaleLinear()
        .domain([0, 100])
        .range([0, innerWidth]);
</script>
```

Now anytime `width` changes, `innerWidth` will update automatically; and whenever `innerWidth` changes, our `xScale` will update. Go ahead and resize the chart below to see the effect in action:

<Embed title="8ir3pm" module="01" lesson="03" />

Voila! Reactivity is as simple as that.

<!-- :::note

We could also bind our chart's `clientHeight` to our height variable (to make it responsive to vertical resizing as well), but it's typical in newsrooms and studios to leave charts with a fixed height.

::: -->

### Need help? Further reading

#### Dimension bindings
* [`offsetWidth`, `clientWidth`, `scrollWidth` and `Height`, respectively in CSS](https://www.geeksforgeeks.org/offsetwidth-clientwidth-scrollwidth-and-height-respectively-in-css/)
* [Dimension bindings](https://svelte.dev/tutorial/dimensions)
* [Get dimensions of element in Svelte](https://natclark.com/tutorials/svelte-get-dimensions-of-element/)

#### Reactive declarations
* [Reactive declarations](https://svelte.dev/tutorial/reactive-declarations)
* [Reactive declarations using the dollar label in Svelte](https://www.connorrothschild.com/post/svelte-reactivity)
* [Svelte tutorial for beginners - reactive declarations and statements](https://www.youtube.com/watch?v=irpuHKmdW2k)
* [The many meanings of $ in Svelte](https://geoffrich.net/posts/svelte-$-meanings/)
