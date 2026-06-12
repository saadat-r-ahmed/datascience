# Chapter 7 · Machine Learning Fundamentals

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 4–6 hours</span>
<span>🔗 Prerequisites: <a href="../06_probability_statistics/index.md">Chapter 6</a></span>
```

> **Machine learning is pattern-finding under uncertainty.** Before you can train a model, you need to understand what it means to generalize — to perform well on data the model has never seen. This chapter builds the conceptual foundation that every model in Part IV relies on.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Distinguish supervised, unsupervised, and reinforcement learning
- [ ] Create proper train/validation/test splits and explain why each split exists
- [ ] Apply k-fold cross-validation and understand what it measures
- [ ] Diagnose underfitting and overfitting using the bias–variance framework
- [ ] Use the scikit-learn API fluently: `fit`, `predict`, `score`, `Pipeline`

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 7.1 · The ML Workflow
:link: 01_ml_workflow
:link-type: doc

Problem framing: regression vs classification vs clustering. Data collection and labeling. Feature extraction. Model selection. Deployment considerations. The complete ML lifecycle.
:::

:::{grid-item-card} 7.2 · Train/Test Splits & Cross-Validation
:link: 02_train_test_splits
:link-type: doc

Why you must never evaluate on training data. Holdout splits. k-fold cross-validation. Stratified splits for imbalanced classes. Time-series splits.
:::

:::{grid-item-card} 7.3 · Bias–Variance Tradeoff
:link: 03_bias_variance
:link-type: doc

Decomposing generalization error. Model complexity vs fit quality. Underfitting and overfitting. Regularization as a bias–variance lever. The role of dataset size.
:::

:::{grid-item-card} 7.4 · The Scikit-Learn API
:link: 04_sklearn_api
:link-type: doc

Estimators, transformers, and predictors. `fit`, `transform`, `predict`, `score`. `Pipeline` and `ColumnTransformer`. `make_pipeline`. Persisting models with `joblib`.
:::
::::

---

## The ML Hierarchy

```
ML Problem
│
├── Supervised Learning  (labeled targets)
│   ├── Regression       → predict a continuous number
│   └── Classification   → predict a discrete class
│
├── Unsupervised Learning (no labels)
│   ├── Clustering       → find natural groups
│   └── Dimensionality   → reduce feature space
│
└── Reinforcement Learning (learn by reward)
```

## The scikit-learn Template

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = make_pipeline(StandardScaler(), LogisticRegression())
scores = cross_val_score(pipe, X, y, cv=5, scoring='accuracy')
print(f"CV accuracy: {scores.mean():.3f} ± {scores.std():.3f}")
```

---

## Resources

| Resource | Notes |
|---|---|
| {cite}`james2021introduction` Ch. 2 | Best introduction to statistical learning |
| [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html) | Essential reading |
| [ML Glossary — Google](https://developers.google.com/machine-learning/glossary) | Quick reference |
