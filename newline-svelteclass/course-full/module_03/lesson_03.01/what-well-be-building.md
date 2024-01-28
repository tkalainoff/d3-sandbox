---
title: How to Build a Dynamic, Physics-Based Beeswarm Plot
slug: what-we-ll-be-building-beeswarm
description: A dynamic, physics-based beeswarm visualizing happiness by country
privateVideoUrl: https://fullstack.wistia.com/medias/slaouqcwy5
isPublicLesson: false
role: "INTRODUCTION"
useMdx: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Throughout our second module, we'll be building a [**beeswarm chart**](https://observablehq.com/@d3/beeswarm) that uses physics-based force layout to arrange bubbles with motion. The final chart looks like this:

<Embed title="yimkb1" height="500px" previewOnly module="02" lesson="final" />

The chart visualizes happiness data from the [2022 World Happiness Report](https://worldhappiness.report/ed/2022/#appendices-and-data). Each bubble represents a country, and you can arrange the bubbles by continent, by clicking anywhere on the chart. 

This visualization is a step up from our simple scatterplot, but it is built upon the same basic principles. Just like last time, the chart is responsive, includes hover interactions, and has meaningful peripheral elements.

The unique aspects that we'll learn in this module are:
* Physics-based force layout
* Tweened values
* Component bindings

In particular, we'll use [`d3-force`](https://github.com/d3/d3-force) to create a physics-based force layout and Svelte's [`tweened`](https://svelte.dev/tutorial/tweened) values to animate points smoothly. This will enable for a smooth, physics-based force layout to present our data.

## Setup 

You can get started by scaffolding our [project template](https://github.com/connorrothschild/svelte-visualization-template) once again. 

:::note

**Important: Make sure you are in a new project directory, not `simple-scatterplot/`.** From your last project's location, you can run `cd ../` to go back one level. We basically want to ensure we are starting in a new directory, not creating a new project in our existing directory.

:::

In that new location, run:

```shell
npx degit connorrothschild/svelte-visualization-template beeswarm
```

And once it is cloned, run:

```shell
cd beeswarm
npm install
npm run dev
```

And we're ready to get started!
