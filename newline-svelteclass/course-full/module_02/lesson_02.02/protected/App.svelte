<script>
  let data = [
    { name: "Antonio", hours: 44, grade: 50 },
    { name: "Sai", hours: 60, grade: 99 },
    { name: "Yohan", hours: 23, grade: 50 },
    { name: "Krishna", hours: 15, grade: 34 },
    { name: "Jennifer", hours: 10, grade: 20 },
    { name: "Cedric", hours: 25, grade: 65 },
    { name: "Jaylen", hours: 46, grade: 35 },
    { name: "Ethan", hours: 30, grade: 30 },
    { name: "Roy", hours: 8, grade: 10 },
    { name: "Denizhan", hours: 35, grade: 79 },
    { name: "J", hours: 52, grade: 65 },
    { name: "Greyson", hours: 39, grade: 50 },
    { name: "Marshall", hours: 16, grade: 30 },
    { name: "Jonny", hours: 30, grade: 53 },
    { name: "McKenna", hours: 40, grade: 56 },
    { name: "Drake", hours: 45, grade: 75 },
    { name: "Justin", hours: 14, grade: 49 },
    { name: "Joe", hours: 23, grade: 59 },
  ];

  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";

  let width = 400;
  let height = 400;

  let xScale = scaleLinear().domain([0, 100]).range([0, width]);

  let yScale = scaleLinear()
    .domain(extent(data, (d) => d.hours))
    .range([height, 0]);
</script>

<svg>
  {#each data as d}
    <circle
      cx={xScale(d.grade)}
      cy={yScale(d.hours)}
      r={10}
      fill="purple"
      stroke="black"
      stroke-width={1}
    />
  {/each}
</svg>
