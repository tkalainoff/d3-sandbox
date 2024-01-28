---
title: How to Add Data to a Svelte Globe Visualization
description: Making our countries' fill represent population
privateVideoUrl: https://fullstack.wistia.com/medias/paum75cnwk
isPublicLesson: false
useMdx: true
draft: true
---

import Embed from "~/components/Embed";
import Highlight from "~/components/Highlight";
import TopPageMargin from "~/components/TopPageMargin";

<TopPageMargin />

We ended last lesson with a good-looking globe.

<Embed title='iiq1ti'  module="03" lesson="03" />

The issue now is that there is no data embedded. We'll address that in this lesson by adjusting each country fill according to it's population.

In order to do so, we'll need to include data. Download [this file](https://raw.githubusercontent.com/connorrothschild/better-data-visualizations-with-svelte/master/03/final/src/data/data.json) and include it in your `data/` folder, under `data.json`. It looks like this:

```
[
    {
        "country": "Aruba",
        "code": "AW",
        "id": "533",
        "population": 107195
    },
    {
        "country": "Afghanistan",
        "code": "AFG",
        "id": "004",
        "population": 39835428
    },
    {
        "country": "Angola",
        "code": "AO",
        "id": "024",
        "population": 33933611
    },
// continued...
]
```

The data includes the following attributes:

- `country`: the country name
- `code`: the country code
- `id`: the country id
- `population`: the country population

We'll use the `population` attribute to adjust the fill of each country.

---

In `App.svelte`, import the data:

```html
<script>
  import data from "$data/data.json";
</script>
```

Now that our data is imported, we can create a color scale (using `d3.scaleLinear`) that will be used to adjust the fill of each country. We'll use the `population` attribute to adjust the fill of each country.

Here, we'll set the domain from 0 to the greatest population in our data; we'll set a color range from <Highlight color="#26362e">#26362e</Highlight> to <Highlight color="#0DCC6C">#0DCC6C</Highlight>.

```html
<script>
  // Color scale
  import { max } from "d3-array";
  import { scaleLinear } from "d3-scale";

  const colorScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range(["#26362e", "#0DCC6C"]);
</script>
```

Now, if we provided a number like 500,000,000 to the `colorScale`, it would return a color between <Highlight color="#26362e">#26362e</Highlight> and <Highlight color="#0DCC6C">#0DCC6C</Highlight> that represents the population (in this case, <Highlight color="#1d6b44">#1d6b44</Highlight>).

```html
<script>
  console.log(colorScale(500000000)); // Returns #1d6b44
</script>
```

So, we can use this scale to adjust the fill of each country. We'll do so by adding a `fill` attribute to each country, and setting it to the `colorScale` of the country's population.

The problem, however, is that our countries are being rendered from our `countries` array, which looks like this:

```json
[
    {
        type: "Feature",
        id: "004",
        properties: Object,
        geometry: Object
    },
    /// etc...
]
```

In other words, the `population` attribute is not available in our `countries` array. We'll need to add it.

Under our import of `data`, we will restructure our `countries` array to include the `population` attribute. We'll want to loop through each country in our `countries` array, and find the corresponding country in our `data` array. Once we find it, we'll add the `population` attribute to the country in our `countries` array.

```html
<script>
  // Restructure countries array to include population
  countries.forEach((country) => {
    const metadata = data?.find((d) => d.id === country.id);
    if (metadata) {
      country.population = metadata.population;
      country.country = metadata.country;
    }
  });
</script>
```

Now, our `countries` array includes both each country's `population` and
`country` attributes.

```json
{
    type: "Feature"
    id: "004"
    properties: Object
    geometry: Object
    population: 39835428
    country: "Afghanistan"
}
```

Perfect!

Now we can use the `colorScale` to adjust the fill of each country.

```jsx
{#each countries as country}
    <path
    d="{path(country)}"
    fill="{colorScale(country.population || 0)}"
    stroke="none"
    />
{/each}
```

:::note

We add `|| 0` to the `colorScale` because some countries do not have a population in our data. If we don't add `|| 0`, the `colorScale` will return `undefined` for those countries, and the fill will be `undefined`. This way, they return the darkest color in the scale, <Highlight color="#26362e">#26362e</Highlight>.

:::

<!-- TODO: Add help resources -->

<Embed title='zkbkv5'  module="03" lesson="04" />
