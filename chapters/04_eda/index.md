# Chapter 4 · Exploratory Data Analysis

```{div} chapter-meta
<span>📗 Part II: Working with Data</span>
<span>⏱ 4–6 hours</span>
<span>🔗 Prerequisites: <a href="../03_pandas/index.md">Chapter 3</a></span>
```

> **Never skip EDA.** Every model failure has a tell — an outlier ignored, a distribution misunderstood, a variable that turned out to be a proxy for the target. Exploratory Data Analysis is the discipline of looking *before* you model.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Compute and interpret descriptive statistics beyond mean and standard deviation
- [ ] Identify distributional shapes: skewness, kurtosis, multimodality
- [ ] Quantify and visualize relationships between variables using correlation
- [ ] Detect outliers using multiple methods and decide how to handle them
- [ ] Produce a complete EDA report for a new dataset

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 4.1 · Descriptive Statistics
:link: 01_descriptive_statistics
:link-type: doc

Measures of central tendency, spread, and shape. Percentiles and the IQR. When to use mean vs median. The danger of summary statistics (Anscombe's Quartet).
:::

:::{grid-item-card} 4.2 · Distributions & Skewness
:link: 02_distributions
:link-type: doc

Histograms, KDE plots, and QQ-plots. Right-skewed vs left-skewed distributions. Log transformations. Identifying multi-modal distributions.
:::

:::{grid-item-card} 4.3 · Correlation & Covariance
:link: 03_correlation_covariance
:link-type: doc

Pearson, Spearman, and Kendall correlations. Heatmaps and pair plots. Confounding and spurious correlations. The limits of linear correlation.
:::

:::{grid-item-card} 4.4 · Outlier Detection
:link: 04_outlier_detection
:link-type: doc

Z-score and IQR methods. Box plots. Isolation Forest. When outliers are data errors vs genuine signals. Treatment strategies: remove, cap, or transform.
:::
::::

---

## EDA Checklist

Use this checklist at the start of every new dataset:

- [ ] **Shape** — How many rows and columns?
- [ ] **Types** — Are types correct (dates as dates, not strings)?
- [ ] **Missingness** — Which columns have nulls? Are they MCAR, MAR, or MNAR?
- [ ] **Distributions** — Is each numeric feature roughly normal, skewed, or bounded?
- [ ] **Outliers** — Any extreme values that require investigation?
- [ ] **Correlations** — Any highly correlated features? Target correlation?
- [ ] **Class balance** — If classification, are classes balanced?
- [ ] **Leakage** — Any features that encode the target directly?

---

## Datasets Used

- [Ames Housing](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) — rich, messy, great for EDA
- [World Development Indicators](https://databank.worldbank.org/source/world-development-indicators) — cross-country comparisons
- Anscombe's Quartet (built into seaborn)

## Resources

| Resource | Notes |
|---|---|
| {cite}`james2021introduction` Ch. 1 | Statistical learning motivation |
| [Pandas Profiling / YData Profiling](https://github.com/ydataai/ydata-profiling) | Auto-generates EDA reports |
| Tufte, *The Visual Display of Quantitative Information* | Classics of data visualization |
