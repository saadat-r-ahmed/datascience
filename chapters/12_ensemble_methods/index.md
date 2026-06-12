# Chapter 12 · Ensemble Methods

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 5–7 hours</span>
<span>🔗 Prerequisites: <a href="../11_feature_engineering/index.md">Chapter 11</a></span>
```

> **The wisdom of crowds, formalized.** A single decision tree overfits. A thousand slightly different trees, each wrong in different ways, average out to something that generalizes. Ensemble methods are among the most powerful and reliable models in practical data science — XGBoost alone has won hundreds of Kaggle competitions.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Explain why ensembles outperform individual learners through variance reduction
- [ ] Build and tune random forests using `RandomForestClassifier` / `Regressor`
- [ ] Implement gradient boosting from the residual-fitting perspective
- [ ] Apply XGBoost and LightGBM with early stopping and optimal hyperparameters
- [ ] Stack models using `StackingClassifier` and understand when blending helps

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 12.1 · Bagging & Random Forests
:link: 01_bagging_random_forests
:link-type: doc

Bootstrap aggregating (bagging). Feature randomness in random forests. Out-of-bag (OOB) error as a free validation set. Feature importances: MDI vs permutation. `n_estimators` vs `max_features`.
:::

:::{grid-item-card} 12.2 · Boosting: AdaBoost & Gradient Boosting
:link: 02_boosting
:link-type: doc

AdaBoost: reweighting misclassified samples. Gradient boosting: fit a new tree to residuals at each step. `GradientBoostingClassifier`. `learning_rate` and `n_estimators` tradeoff. Partial dependence plots.
:::

:::{grid-item-card} 12.3 · XGBoost & LightGBM
:link: 03_xgboost_lightgbm
:link-type: doc

{cite}`chen2016xgboost` — regularized gradient boosting. Histogram-based binning in LightGBM. Early stopping with a validation set. Handling missing values natively. SHAP values for model interpretation.
:::

:::{grid-item-card} 12.4 · Stacking & Blending
:link: 04_stacking_blending
:link-type: doc

Level-0 base learners vs level-1 meta-learner. `StackingClassifier`. Blending: train base models on folds, meta-model on held-out predictions. When stacking adds value vs when it's noise.
:::
::::

---

## When to Use What

| Scenario | Recommended |
|---|---|
| Structured/tabular data, competition setting | XGBoost or LightGBM |
| Need interpretability + good accuracy | Random Forest |
| Small dataset, want diversity | Voting ensemble of 3 different algorithm families |
| Maximum accuracy, no interpretability needed | Stacking |
| Very large dataset (memory-limited) | LightGBM (faster than XGBoost for large N) |

---

## Datasets Used

- [Kaggle Housing Prices](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) — regression benchmark
- [Porto Seguro Safe Driver](https://www.kaggle.com/c/porto-seguro-safe-driver-prediction) — imbalanced classification
- Synthetic datasets for visualizing decision boundaries

## Resources

| Resource | Notes |
|---|---|
| {cite}`breiman2001random` | Original random forest paper |
| {cite}`chen2016xgboost` | XGBoost paper — surprisingly readable |
| [SHAP](https://shap.readthedocs.io) | Model-agnostic interpretation via Shapley values |
