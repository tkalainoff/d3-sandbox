---
title: Why Use Svelte for Data Visualization Versus D3
# slug: what-is-svelte
description: Data visualization practitioners looking to enter the interactive space, or those looking for a relief from D3, are perfect students for this course.
privateVideoUrl: https://fullstack.wistia.com/medias/okxk45r1ga
isPublicLesson: true
useMdx: true
---

import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

This course is for you if you are a **data visualization practitioner** who falls in one of two categories:

1. You know the basics of data visualization but **are not yet well-versed in interactive data visualization on the web**
2. You know how to make interactive data visualization on the web **but are looking for a relief from existing tools, like D3 or React**

This course does not *require* much coding experience with the potential exception of intermediate JavaScript proficiency ([explained below](#knowledge-dependencies)).

### You’ll still benefit from this course if:

**You are an expert in D3.** This course will explain (and reiterate) how visualizations in Svelte require a different mental model from those built in D3. Adjusting to this new paradigm will take some time, but I’ll make the argument that visualizations built with Svelte are 1) more intuitive, 2) easier to debug, and 3) more readable than those made with D3.

**You know a bit of Svelte but not for data visualization.** This course will give leverage to the parts of Svelte that you already love — reactivity, data bindings, and state management — and introduce them in a visualization context. You will also learn the parts of Svelte that work great in visualization, which you might not have heard of (such as `tweened` values).

### Knowledge dependencies

In order to get the most out of this course, I would advise basic familiarity with [JavaScript](https://www.javascript.com/), the de facto language for programming on the web. JS is near-universal on the websites you visit every day ([at least 98% of them](https://w3techs.com/technologies/details/cp-javascript)).

In particular, this course will rely on some key JS concepts which you would benefit most from learning, such as:

- Data types
- Array methods
- If/else statements and the ternary operator
- Functions, including arrow functions

As the course progresses and introduces new JavaScript terms, we will link to documentation and provide a callout box the first time you see something, like this:


:::note The `map()` method 💡

The `map()` method **creates a new array** populated with the results of calling a provided function on every element in the calling array.

In simpler terms, `map()` will run the same function or operation on each element in an array, and return a new transformed element

**Example**: `[1, 2, 3].map(d ⇒ d * 2) // returns [2, 4, 6]`

:::

Importantly, the callout boxes will provide information for these new concepts, but they will *not* document the more basic concepts such as the [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (`=>`) used within `map`. This example in particular illustrates the baseline level of JavaScript knowledge you should have before beginning.

[This website](https://javascript.info/first-steps) serves as a good introduction to JavaScript, and can be a great reference if you encounter unknown topics throughout this course.

You do **not** need to know Svelte, or any other framework, and you do **not** need to know *anything* about D3. We will cover the important parts of D3 in this course (and purposely omit other parts of D3 — but more on that later).
