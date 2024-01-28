---
title: Build a Responsive Globe Visualization With Svelte Dimension Bindings
slug: responsiveness-globe
description: Making our globe responsive
privateVideoUrl: https://fullstack.wistia.com/medias/5911awqmur
isPublicLesson: false
useMdx: true
draft: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

We ended last lesson having made a globe complete with countries and borders:

<Embed title="0n0h30" module="03" lesson="01" />

Right now, if you adjust your chart window, you'll see the globe remains at a fixed 400x400 size. We want to make it responsive, so that it fills the available space.

As you're hopefully used to by this point, we will create a `.chart-container` div and use a dimension binding that is equal to `width`.

```html
<div class="chart-container" bind:clientWidth={width}>
  <svg width={width} height={height}>
    <!-- Chart content goes here -->
  </svg>
</div>
```

One quirk of this chart is that it is a circle: we want its width to always be equal to its height. And so if the window width is exceedingly large, we don't want to continue to make the globe bigger (lest it exceed the window height). And so we want to **bound the width of the globe**.

Let's do this using CSS, by applying a simple property to our `.chart-container` div: `max-width`.

```css
.chart-container {
    max-width: 468px;
}
```

The chart is now bound, but its left aligned. We can fix that by applying an additional rule.

```css
.chart-container {
    max-width: 468px;
    margin: 0 auto;
}
```

Here, `margin: 0 auto;` applies a margin of `0` above and below the chart (vertically), and a margin of `auto` to the left and right (horizontally). This centers the chart.

<Embed title="slrh2n" module="03" lesson="02" />

As a note, what we've just completed might be a helpful starter kit for any globe-centric project you work on in the future. Feel free to fork and save this for future reference.

## Need help? Further reading

* [`Horizontal centering`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin#horizontal_centering)