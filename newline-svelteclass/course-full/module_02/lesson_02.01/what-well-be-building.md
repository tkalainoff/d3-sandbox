---
title: How to Create Your First Svelte Scatterplot
# slug: what-is-svelte
description: An introduction to your first Svelte scatterplot
privateVideoUrl: https://fullstack.wistia.com/medias/0r7pkofsum
isPublicLesson: false
role: "INTRODUCTION"
useMdx: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Throughout our first module, we'll be building a scatterplot that looks like this:

<Embed title="ohk8k9" module="01" lesson="final" />

Although it is a relatively simple presentation, it includes multiple features that are crucial to data visualization. For example, the chart is **fully responsive** (meaning it can be accessed on a variety of screen sizes), it features **hover interactions** (go ahead and hover over a circle to see what happens), and it has **meaningful peripheral elements** (such as axis titles and tick labels).

In the modules that follow, we'll build this chart step by step, beginning with the broad strokes and then learning about more advanced features, like responsiveness and hover interactions.

## Setup 

You can get started by scaffolding our [project template](https://github.com/connorrothschild/svelte-visualization-template) once again. 

:::note

**Important: Make sure you are in a new project directory, not `my-first-svelte-app/`.** From your last project's location, you can run `cd ../` to go back one level. We basically want to ensure we are starting in a new directory, not creating a new project in our existing directory.

:::

In that new location, run:

```shell
npx degit connorrothschild/svelte-visualization-template simple-scatterplot
```

And once it is cloned, run:

```shell
cd simple-scatterplot
npm install
npm run dev
```

And we're ready to get started!
