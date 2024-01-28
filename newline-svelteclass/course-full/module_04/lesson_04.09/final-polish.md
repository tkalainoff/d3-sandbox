---
title: Adding a Title to a Svelte Rotating Globe Visualization
slug: final-polish-globe
description: Finishing off with a title!
privateVideoUrl: https://fullstack.wistia.com/medias/esrj6imkzv
isPublicLesson: false
useMdx: true
draft: true
---

import Embed from "~/components/Embed";
import Highlight from "~/components/Highlight";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Let's finish up by adding a simple title and subtitle. These are regular old HTML elements, so you probably remember how this works by now:

```html
<div class="chart-container">
  <h1>The World at a Glance</h1>
  <h2>Population by Country, 2021</h2>
  <!-- Rest of chart -->
</div>
```

You can style them however you'd like; I prefer these styles:

```css
h1,
h2 {
  color: white;
  text-align: center;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 200;
  margin-bottom: 1rem;
}
```

<Embed title="k9lgmt" module="03" lesson="final" height="605px" />

<!-- <iframe src="https://connorrothschild.github.io/better-data-visualizations-with-svelte/module-3-final-visualization-better-data-visualizations-with-svelte/" 
style={{ width: "100%", height: "570px", border: "0" }} /> -->
