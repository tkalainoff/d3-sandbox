---
title: JavaScript and Scalable Vector Graphics in Svelte
description: An introduction to SVG and JavaScript
privateVideoUrl: https://fullstack.wistia.com/medias/la675sjmqb
isPublicLesson: false
useMdx: true
---

import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

Every chart that we make in this course will leverage two technologies that are worth familiarizing yourself with: SVG and Svelte. In particular, we will *use Svelte* to *create SVG.* What does that mean in practice?

### SVG

SVG, which stands for *Scalable Vector Graphics*, is actually an image format. An SVG image (`image.svg`) could be included in a webpage just like other more common image formats (`image.jpg`). 

The key difference between SVG and other image formats is the way that SVGs are constructed. SVG images are composed of [XML markup](https://developer.mozilla.org/en-US/docs/Web/XML) (think of HTML that creates an image). This means that we have *abundant control* over the way that images are designed, and can tweak SVG images’ appearance by simply changing our markup.

On a very basic level, an SVG image might look something like this:

```html
<svg>
	<rect width="100" height="100" x="0" y="0" fill="plum" />
	<circle r="10" cx="10" cy="10"  />
</svg>
```

Each element, such as `<rect/>` and `<circle/>`, will have its own attributes. You can read more about each elements’ attributes [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element). We could open the `.svg` file in our code editor and change attributes (e.g. change the `width` of our `<rect />` to be `300` instead of `100`), and immediately see the changes in our image. 

<!-- For an example, open `03/image.svg` in your directory as an image (probably by right clicking, and then selecting `Open With -> Chrome`). Then, open the same file using a code or text editor, and change some attributes. (Just change some of the numbers assigned to attributes like `width` and `height`.) Then, reopen the SVG image again. You’ll notice that the image itself changed as soon as you edited the code that generated it. -->

SVGs are also:

- **Scalable.** SVGs will look good at all resolutions and all scales
- **Interactive in nature.** Individual SVG elements can be animated via CSS, and they can also have their own event listeners for fine-tuned interaction
- **Accessible**. SVGs are more accessible to screen readers than other approaches

Although you are not *required* to use SVG to design visualizations on the web (you could use `<canvas>` or HTML elements instead), they will be the primary output format we use in this course, for the reasons listed above.

:::note 

Plenty of impressive visualizations in Svelte are done without SVG, like [this one](https://github.com/spiegelgraphics/nobel-laureates) from the Der Spiegel graphics team, which uses Canvas.

:::

### A simple SVG chart

Here is the simplest possible chart made with SVG. It includes five circles within an `<svg>` element, and so it roughly resembles a scatterplot.

```html
<svg>
	<circle cx="10" cy="10" r="10" fill="plum"/>
	<circle cx="20" cy="20" r="10" fill="plum"/>
	<circle cx="30" cy="30" r="10" fill="plum"/>
	<circle cx="40" cy="40" r="10" fill="plum"/>
	<circle cx="50" cy="50" r="10" fill="plum"/>
</svg>
```

Within each circle, we are assigning:

- An x position (`cx`)
- A y position (`cy`)
- A radius (`r`)
- A fill (`fill`)

Writing SVG charts this way would be painful. Among other issues, it would involve a lot of repetition, and it would be untenable for charts with more than a dozen data points. These charts would also not be *responsive* because we would be hardcoding our x and y positions.

So how can we create charts using SVG without the above problems? We use a JavaScript framework (Svelte) to integrate data into our SVG directly.

### JavaScript (Svelte) + SVG

Svelte is a great complement to SVG because our approach to designing data visualizations will leverage on writing markup directly. This means that we can write our SVG elements (like above), but append data inline to make for incredibly declarative visualizations.

As an example (which you don’t need to fully understand yet), we can make the **same SVG chart** from above using Svelte like this:

```html
<script>
	let data = [1, 2, 3, 4, 5]
</script>

<svg>
	{#each data as d}
		<circle cx={d * 10} cy={d * 10} r={10} fill="plum" />
	{/each}
</svg>
```

The above code functions in exactly the way you would expect if you simply read it out loud, line by line:

1. Create an SVG
2. Loop through *each* of the elements in our `data` array, and call each element, `d`
3. Create a `<circle/>` element for each element, and set its `cx` and `cy` attribute based on existing data

Now imagine if you had 500 datapoints instead of 5. Would you rather write out each line independently, or with Svelte? 

As this example illustrates, SVG is the best output format for our purposes — but writing SVG itself would be a pain. For that reason, Svelte is a perfect complement. The takeaway from this lesson, and something to remember throughout this course is that **we will use Svelte to bind data to SVG elements**. Our final charts will render SVG elements, and use Svelte to set the attributes of those elements.
