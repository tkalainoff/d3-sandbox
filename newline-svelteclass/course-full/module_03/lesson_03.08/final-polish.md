---
title: Svelte Beeswarm Walkthrough - Wrapping Up
slug: final-polish-beeswarm
description: Finishing up our beeswarm chart
privateVideoUrl: https://fullstack.wistia.com/medias/kmm6gy5ivw
isPublicLesson: false
useMdx: true
---

import Embed from "~/components/Embed";
import TopPageMargin from "~/components/TopPageMargin";
import Blockquote from "~/components/Blockquote";
import Highlight from "~/components/Highlight";

<TopPageMargin />

We're basically there! The only final bit of polish we can add is related to the circles' initial entrance to the chart. In its current version, each circle springs into place, thanks to the physics simulation at work. 

We can instead transition each element's entrance into the chart using Svelte's built-in transitions. Specifically, we'll fade each circle in.

On the `<circle />` element in our markup, simply add the following line:

```js
in:fade={{ delay: 200 + 10 * i, duration: 400 }}
```

This will transition all circles in with a duration of 400ms. The delay ensures that the transitions are staggered, to give this nice, animated effect.

<Embed title="yimkb1" previewOnly runOnClick={1} module="02" lesson="final" />
