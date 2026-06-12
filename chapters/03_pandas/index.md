# Chapter 3 · Data Manipulation with Pandas

```{div} chapter-meta
<span>📗 Part II: Working with Data</span>
<span>⏱ 5–8 hours</span>
<span>🔗 Prerequisites: <a href="../02_numpy/index.md">Chapter 2</a></span>
```

> **The data reality:** Real data never arrives clean. It arrives as CSVs with inconsistent column names, Excel sheets with merged cells, SQL dumps with nulls where nulls shouldn't be, and dates in six different formats. Pandas is the workhorse that tames this chaos.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Create, inspect, and navigate `Series` and `DataFrame` objects
- [ ] Load data from CSV, Excel, JSON, and SQL sources
- [ ] Identify and handle missing values, duplicates, and type mismatches
- [ ] Aggregate, pivot, and reshape datasets with `groupby`, `merge`, and `melt`
- [ ] Apply method chaining to write readable, pipeable transformations

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 3.1 · Series & DataFrames
:link: 01_series_dataframes
:link-type: doc

The core data structures. Index alignment. `.loc` vs `.iloc`. Column selection, assignment, and deletion. `dtypes` and memory usage.
:::

:::{grid-item-card} 3.2 · Loading & Inspecting Data
:link: 02_loading_inspecting
:link-type: doc

`read_csv`, `read_excel`, `read_json`, `read_sql`. `head`, `tail`, `info`, `describe`, `value_counts`. Understanding your data before touching it.
:::

:::{grid-item-card} 3.3 · Cleaning & Missing Values
:link: 03_cleaning_missing_values
:link-type: doc

`isna`, `fillna`, `dropna`, `interpolate`. Fixing dtypes, standardizing strings, parsing dates. The `.pipe()` pattern for clean transformation pipelines.
:::

:::{grid-item-card} 3.4 · Grouping, Merging & Reshaping
:link: 04_grouping_merging
:link-type: doc

`groupby` + aggregation functions. `merge`, `join`, and `concat`. `pivot_table`, `melt`, `stack`, `unstack`. Multi-level indexing.
:::
::::

---

## Common Operations at a Glance

```python
# Load
df = pd.read_csv('data.csv', parse_dates=['date_col'])

# Inspect
df.info()                          # dtypes + nulls
df.describe(include='all')         # statistics

# Select
df[['col_a', 'col_b']]             # columns
df.loc[df['col'] > 5, 'target']    # conditional row + column

# Clean
df['col'] = df['col'].fillna(df['col'].median())
df = df.drop_duplicates()

# Transform
df['new'] = df['a'] / df['b']

# Aggregate
df.groupby('category')['value'].agg(['mean', 'std', 'count'])

# Merge
merged = pd.merge(df_left, df_right, on='key', how='left')
```

---

## Datasets Used

- [Titanic](https://www.kaggle.com/c/titanic) — survival prediction, classic messy data
- [NYC Taxi Trips](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) — large-scale aggregation
- Synthetic sales data generated inline

## Resources

| Resource | Notes |
|---|---|
| {cite}`mckinney2022python` | Written by the creator of Pandas |
| [Pandas Docs — User Guide](https://pandas.pydata.org/docs/user_guide/) | Comprehensive reference |
| [Pandas Exercises](https://github.com/guipsamora/pandas_exercises) | 100+ practice problems |
