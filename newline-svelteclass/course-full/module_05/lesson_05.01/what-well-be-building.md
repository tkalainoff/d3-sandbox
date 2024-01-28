---
title: How to Build an Interactive Scrollytelling Scatterplot
slug: what-we-ll-be-building-scrollytelling
description: An interactive, scrollytelling version of our initial scatterplot
privateVideoUrl: https://fullstack.wistia.com/medias/rlqvlhms0l
isPublicLesson: false
role: "INTRODUCTION"
useMdx: true
draft: false
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

In our final module, we will make a "scrollytelling" article. Scrollytelling is a technique often employed in newsrooms, as it leverages the primary behavior on the web—scrolling—to progressively reveal more information. For example, this 2015 [piece from Bloomberg](https://www.bloomberg.com/graphics/2015-auto-sales/) progresses the narrative in steps that are controlled by the user's scroll.

In this module, we'll create our first scrollytelling article. To focus on the important parts of scrollytelling, we'll repurpose the very first chart we created in this course: a simple scatterplot (rather than creating a new chart from scratch).

<Embed title="9ycuts" height="555px" previewOnly module="04" lesson="final-preview" />

This module will introduce us to a new few Svelte concepts, but also dive deeper into CSS. We'll also learn how to leverage existing solutions to make our lives easier.

## Setup 

You can get started by copying your module 1 code into a new directory. If you're on CodeSandbox, you can do this by forking your project; if you're on your local machine, you can do this by copying the directory.

<!-- Perhaps the safest way to copy the code is via Git, so that we don't copy any hidden files that might cause problems. To do this, we'll create a new repository on GitHub, and then push our code to it. -->

You can also download the folder <a href="https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fconnorrothschild%2Fbetter-data-visualizations-with-svelte%2Ftree%2Fmaster%2F01%2Ffinal">here</a> and unzip it into a new directory.

<!-- You can get started by scaffolding our [project template](https://github.com/connorrothschild/svelte-visualization-template) once again. 

:::note

**Important: Make sure you are in a new project directory, not `globe/`.** From your last project's location, you can run `cd ../` to go back one level. We basically want to ensure we are starting in a new directory, not creating a new project in our existing directory.

:::

In that new location, run:

```shell
npx degit connorrothschild/svelte-visualization-template scrollytelling
```

And once it is cloned, run:

```shell
cd scrollytelling
npm install
npm run dev
```

And we're ready to get started! -->

Once you have your new folder, let's navigate into it, install our dependencies, and get started.

```shell
cd scrollytelling
npm install
```

Once dependencies install, open the folder in VSCode (`code .` if you're on Mac and have installed the extension), and run `npm run dev` in the integrated terminal.

And we're ready to get started!