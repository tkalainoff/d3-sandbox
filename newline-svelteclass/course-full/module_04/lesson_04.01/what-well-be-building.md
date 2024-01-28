---
title: Create an Interactive Globe Visualization With Svelte + D3.js
slug: what-we-ll-be-building-globe
description: An interactive, rotating globe visualizing the world's population
privateVideoUrl: https://fullstack.wistia.com/medias/3kd8cj0kmw
isPublicLesson: false
role: "INTRODUCTION"
useMdx: true
draft: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Throughout our third module, we'll be building a **rotating globe** that rotates on its own and responds to user interaction via click and pan. The final visualization looks like this:

<Embed title="k9lgmt" height="605px" previewOnly module="03" lesson="final" />

This module will introduce us to **geographic visualization**. We'll learn about various D3 modules that permit geographic visualization, and we'll integrate them into Svelte with declarative markup. 

The unique aspects that we'll learn in this module are:
* Geographic visualization (projections, paths, etc.)
* Timers and intervals (for auto rotation)
* User interaction with momentum (when the user clicks and drags the globe)

## Setup 

You can get started by scaffolding our [project template](https://github.com/connorrothschild/svelte-visualization-template) once again. 

:::note

**Important: Make sure you are in a new project directory, not `beeswarm/`.** From your last project's location, you can run `cd ../` to go back one level. We basically want to ensure we are starting in a new directory, not creating a new project in our existing directory.

:::

In that new location, run:

```shell
npx degit connorrothschild/svelte-visualization-template globe
```

And once it is cloned, run:

```shell
cd globe
npm install
npm run dev
```

And we're ready to get started!