# Chapter 5 · Data Visualization

```{div} chapter-meta
<span>📗 Part II: Working with Data</span>
<span>⏱ 4–6 hours</span>
<span>🔗 Prerequisites: <a href="../04_eda/index.md">Chapter 4</a></span>
```

> **A chart is an argument.** Every design choice — axis range, color, chart type — nudges the viewer toward a conclusion. Learning to visualize well means learning to argue clearly with data, and to spot when someone else is arguing dishonestly.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Build publication-quality static figures with Matplotlib
- [ ] Choose the right chart type for each statistical relationship
- [ ] Apply Seaborn for distribution, categorical, and relational plots
- [ ] Create interactive, zoomable charts with Plotly
- [ ] Apply design principles: clarity, data-ink ratio, color theory

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 5.1 · Matplotlib Fundamentals
:link: 01_matplotlib_fundamentals
:link-type: doc

Figure/Axes architecture. Line, scatter, bar, and histogram plots. Subplots and gridspecs. Annotations, legends, and saving figures at publication resolution.
:::

:::{grid-item-card} 5.2 · Statistical Plots with Seaborn
:link: 02_seaborn_statistical
:link-type: doc

Relational (`scatter`, `line`), distribution (`hist`, `kde`, `ecdf`), and categorical (`box`, `violin`, `bar`, `strip`) plots. `FacetGrid` for small multiples. Themes and palettes.
:::

:::{grid-item-card} 5.3 · Interactive Charts with Plotly
:link: 03_plotly_interactive
:link-type: doc

`plotly.express` for quick charts. `plotly.graph_objects` for full control. Hover tooltips, zooming, filtering. Choropleth maps. Embedding in Jupyter and the web.
:::

:::{grid-item-card} 5.4 · Visualization Design Principles
:link: 04_dashboard_design
:link-type: doc

Choosing chart types (and the charts you should never use). The data-ink ratio. Perceptually uniform colormaps. Accessibility: color blindness, contrast, alt text. Dashboard layout.
:::
::::

---

## Chart Type Selector

| Relationship | Recommended Chart |
|---|---|
| Distribution (1 variable) | Histogram · KDE · Box plot · Violin |
| Two numeric variables | Scatter · Hex bin · Contour |
| Numeric over time | Line · Area |
| Category vs numeric | Bar · Box · Strip · Violin |
| Correlation matrix | Heatmap |
| Part-to-whole | Stacked bar · Treemap (avoid pie) |
| Geographic | Choropleth · Bubble map |
| High-dimensional | Pair plot · Parallel coordinates |

---

## Datasets Used

- [Gapminder](https://www.gapminder.org/data/) — classic animated scatter (life expectancy vs GDP)
- [Penguins](https://github.com/allisonhorst/palmerpenguins) — replaces Iris for visual demos
- [Global CO₂ Emissions](https://ourworldindata.org/co2-emissions) — time series

## Resources

| Resource | Notes |
|---|---|
| [Matplotlib Gallery](https://matplotlib.org/stable/gallery/index.html) | Copy-pasteable examples |
| [Seaborn Tutorial](https://seaborn.pydata.org/tutorial.html) | Excellent structured walkthrough |
| [Plotly Docs](https://plotly.com/python/) | Complete API reference |
| Wilke, *Fundamentals of Data Visualization* | Free online, color-focused design guide |
