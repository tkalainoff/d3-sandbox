---
title: Creating a Rotating Globe Visualization in Svelte
description: Making it spin!
privateVideoUrl: https://fullstack.wistia.com/medias/dmvzf2uodo
isPublicLesson: false
useMdx: true
draft: true
---

import Embed from "~/components/Embed";
import Highlight from "~/components/Highlight";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

We ended last lesson with a good-looking globe, with data embedded.

<Embed title='zkbkv5' module="03" lesson="04" />

In this lesson, we'll add globe rotation, both automatically and according to user interaction.

## Autorotation

We'll start by adding automatic rotation. In `App.svelte`, add the following code to the `script` tag:

```html
<script>
  // Auto rotate the globe, 0.5 degrees per second
  import { timer } from "d3-timer";

  let rotation = 0;
  const degreesPerFrame = 0.5;

  const t = timer(() => {
    rotation += degreesPerFrame;
    console.log(rotation);
  }, 0);
</script>
```

Here, we're instantiating `rotation` to be 0, and then, once per second, updating it by 0.5 degrees. We're also logging the rotation to the console, so we can see it in action. If you look at your console now, you'll see it gradually increasing.

Now, what do we do with this rotation? We need to pass it to the globe. In `App.svelte`, recall that we instantiated our `projection` like so:

```html
<script>
  $: projection = geoOrthographic()
    .scale(width / 2)
    .rotate([0, 0])
    .translate([width / 2, height / 2]);
</script>
```

Here, we're setting the rotation to be `[0, 0]` (where the structure is `[xRotation, yRotation]`). We'll change that to be `[rotation, 0]`, so that the rotation is updated according to our `rotation` variable:

```html
<script>
  $: projection = geoOrthographic()
    .scale(width / 2)
    .rotate([rotation, 0])
    .translate([width / 2, height / 2]);
</script>
```

Great! Our globe is now rotating. You can see it in action here:

![](./public/assets/rotation.gif)

## Add user interaction

Next, let's make it so that a user can control the rotation.

In particular, we'll want to leverage the [`d3-drag`](https://github.com/d3/d3-drag) module. This module allows us to add drag events to any DOM element. We'll use it to add drag events to our globe.

Your best bet for getting started here is seeing what others have done. In particular, check out [this example](https://observablehq.com/@michael-keith/draggable-globe-in-d3) on Observable. It's a bit more complex than what we're doing, but it's a good starting point.

In particular, you'll find the `drag` code here:

```js
svg.call(
  d3.drag().on("drag", () => {
    const rotate = projection.rotate();
    const k = sensitivity / projection.scale();
    projection.rotate([
      rotate[0] + d3.event.dx * k,
      rotate[1] - d3.event.dy * k,
    ]);
    path = d3.geoPath().projection(projection);
    svg.selectAll("path").attr("d", path);
  })
);
```

Here, the author is calling a `drag` function on the `svg` element. This function takes a callback, which is called whenever the user drags the globe. In this callback, the author is updating the rotation of the globe, and then updating the `path` variable, which is used to draw the globe.

In our case, we'll want to do something similar. Svelte is a bit different, so we'll need to select our `svg` element, and then, `onMount`, call the drag function on it. In your markup, add `bind:this={globe}` to your `svg` element, and declare it in your `script` tag:

```html
<script>
  let globe;
</script>
```

```jsx
<svg bind:this={globe} width={width} height={height} />
```

Now, we need the following (notice how similar it is to the Observable example):

```html
<script>
  // Add user interaction
  import { onMount } from "svelte";
  import { select } from "d3-selection";
  import { drag } from "d3-drag";

  let globe;
  const DRAG_SENSITIVITY = 0.5;

  onMount(() => {
    const element = select(globe);
    element.call(
      drag().on("drag", (event) => {
        rotation = rotation + event.dx * DRAG_SENSITIVITY;
      })
    );
  });
</script>
```

What's happening here? We're 1) importing the needed modules, 2) defining our globe element and our sensitivity, and 3) adding the drag event to our globe.

This works, but you'll notice that the drag "fights" with the autorotation.

![](./public/assets/fight-auto.gif)

To address this, we need to keep track of whether the user is dragging or not. We'll do this by adding a `dragging` variable, and setting it to `true` when the user starts dragging, and `false` when they stop dragging.

Then, in our existing autorotation timer, we'll check if the user is dragging. If they are, we'll do nothing. If they're not, we'll update the rotation.

So, we'll update our existing code to look like this:

```jsx
// Add user interaction
import { onMount } from "svelte";
import { select } from "d3-selection";
import { drag } from "d3-drag";

let globe;
let dragging = false;
const DRAG_SENSITIVITY = 0.5;

onMount(() => {
  const element = select(globe);
  element.call(
    drag()
      .on("drag", (event) => {
        dragging = true;
        rotation = rotation + event.dx * DRAG_SENSITIVITY;
      })
      .on("end", (event) => {
        dragging = false;
      })
  );
});
```

And in our timer, we'll add the following:

```jsx
const t = timer(() => {
  if (dragging) return;
  rotation += degreesPerSecond;
}, 1);
```

Now, the globe will pause if we are dragging it.

## Y-axis rotation

Our globe is rotatable on the x-axis, but not the y-axis. Let's fix that. Rename each instance of `rotation` to `xRotation`, and add a `yRotation` variable (we'll instantiate it as `-30`). Then, update your projection to look like this:

```jsx
$: projection = geoOrthographic()
  .scale(width / 2)
  .rotate([xRotation, yRotation])
  .translate([width / 2, height / 2]);
```

Then, in our drag handler, we'll copy our `xRotation` code and replace the relevant variables with their `y` alternatives:

```jsx
.on("drag", event => {
  dragging = true;
  xRotation = xRotation + event.dx * DRAG_SENSITIVITY;
  yRotation = yRotation - event.dy * DRAG_SENSITIVITY; // We subtract here because the y-axis is inverted
})
```

We'll also do the same in our timer, replacing `rotation` with `xRotation`:

```jsx
const t = timer(() => {
  if (dragging) return;
  xRotation += degreesPerSecond;
}, 1);
```

### Adding inertia

Our globe is now rotatable on both axes, but it doesn't have inertia. In other words, if we drag it, it will stop immediately. Let's fix that. We'll use Svelte's built in [`spring`](https://svelte.dev/tutorial/spring) function to add inertia.

On a high level, `spring` works by taking an initial value, and a set of options including `stiffness` and `damping`. For example:

```jsx
let coords = spring(
  { x: 50, y: 50 }, // Initial value
  {
    stiffness: 0.1, // How quickly the spring snaps to its target
    damping: 0.25, // How quickly the spring slows down
  }
);
```

In our case, we want to create separate spring functions for our `xRotation` and `yRotation`. We'll do this by replacing our initial `xRotation` and `yRotation` variables with the following:

```jsx
import { spring } from "svelte/motion";

let xRotation = spring(0, {
  stiffness: 0.08,
  damping: 0.4,
});

let yRotation = spring(-30, {
  stiffness: 0.17,
  damping: 0.7,
});
```

Now, we need to update the declarations to `xRotation` and `yRotation` to be prefixed with `$`. This is the general accessor for store based functions, like springs. Make sure you do this for every declaration (a find and replace will do the trick).

```jsx
$: projection = geoOrthographic()
  .scale(width / 2)
  .rotate([$xRotation, $yRotation]) // xRotation -> $xRotation, yRotation -> $yRotation
  .translate([width / 2, height / 2]);
```

Great! Now, when you drag the globe, it will have inertia. You can play around with `DRAG_SENSITIVITY` and the spring options to get the feel you 
want. (I changed my `DRAG_SENSITIVITY` to 3.)

:::note 

If you play around with the globe long enough, you may notice a funny bug: upon revisiting the browser tab after some time, occasionally the globe will enter a state of rapid and chaotic rotation. (It looks quite funny.) This is a [known issue](https://github.com/sveltejs/svelte/issues/7010) of Svelte's `spring` function, and will hopefully be fixed soon.

:::

### Style the cursor

As a final touch, let's style the cursor when the user is dragging the globe. We'll do this by adding a `dragging` class to our SVG element, only when the user is dragging. This is as simple as the following:

```jsx
<svg {width} {height} bind:this={globe} class:dragging>
  <!-- Inner content -->
</svg>
```

Then, in our `<style />` tag, we'll add the following:

```css
.dragging {
  cursor: grabbing;
}
```

<Embed title="oz6pt6" module="03" lesson="05"  />

<!-- TODO: Add help resources  -->
