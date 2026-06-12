# Chapter 11 · Feature Engineering

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 5–7 hours</span>
<span>🔗 Prerequisites: <a href="../10_model_evaluation/index.md">Chapter 10</a></span>
```

> **"Applied machine learning is basically feature engineering." — Andrew Ng.** No amount of algorithmic sophistication compensates for poorly prepared features. This chapter is about transforming raw data into representations that algorithms can learn from effectively.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Encode categorical features correctly: ordinal, one-hot, target, and hash encoding
- [ ] Scale and normalize features and know which scaling is required by which algorithm
- [ ] Select informative features using filter, wrapper, and embedded methods
- [ ] Apply PCA to reduce dimensionality while retaining explained variance
- [ ] Build end-to-end `Pipeline` + `ColumnTransformer` preprocessing pipelines

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 11.1 · Encoding Categorical Variables
:link: 01_encoding_categorical
:link-type: doc

Label encoding (ordinal only). One-hot encoding: `pd.get_dummies` vs `OneHotEncoder`. Target encoding for high-cardinality. Frequency encoding. Hash encoding. Handling unseen categories.
:::

:::{grid-item-card} 11.2 · Scaling & Normalization
:link: 02_scaling_normalization
:link-type: doc

`StandardScaler` (zero mean, unit variance). `MinMaxScaler` (bound to [0,1]). `RobustScaler` (IQR-based, outlier resistant). `PowerTransformer` for skewed features. When NOT to scale (tree methods).
:::

:::{grid-item-card} 11.3 · Feature Selection
:link: 03_feature_selection
:link-type: doc

Filter methods: variance threshold, correlation, mutual information. Wrapper methods: `RFE`, `RFECV`. Embedded methods: Lasso paths, tree-based importance. `SelectFromModel`. Avoiding the feature selection trap.
:::

:::{grid-item-card} 11.4 · Dimensionality Reduction with PCA
:link: 04_pca
:link-type: doc

Geometric intuition: projection onto principal components. Explained variance ratio. Choosing the number of components: scree plot and 95% rule. PCA as preprocessing vs as visualization. `KernelPCA` for nonlinear structure.
:::
::::

---

## The ColumnTransformer Pattern

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder

numeric_features = ['age', 'income', 'credit_score']
categorical_features = ['state', 'occupation']

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
])

pipeline = make_pipeline(preprocessor, YourModel())
pipeline.fit(X_train, y_train)
```

---

## Datasets Used

- [Titanic](https://www.kaggle.com/c/titanic) — mix of numeric and categorical, missingness
- [Adult Income](https://archive.ics.uci.edu/ml/datasets/adult) — high-cardinality categoricals
- Synthetic high-dimensional data for PCA visualization

## Resources

| Resource | Notes |
|---|---|
| {cite}`hastie2009elements` Ch. 18 | High-dimensional problems |
| [Featuretools](https://featuretools.alteryx.com/) | Automated feature engineering |
| [scikit-learn — Preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html) | Every transformer explained |
