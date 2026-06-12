# Chapter 8 · Regression

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 5–7 hours</span>
<span>🔗 Prerequisites: <a href="../07_ml_fundamentals/index.md">Chapter 7</a></span>
```

> **Regression is the workhorse of quantitative analysis.** Predicting house prices, estimating causal effects, forecasting demand — most real quantitative problems reduce to "fit a function from inputs to a continuous output." Start here.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Derive the ordinary least squares (OLS) solution analytically and numerically
- [ ] Interpret regression coefficients including in the presence of correlated features
- [ ] Extend linear regression to capture nonlinear relationships with polynomial features
- [ ] Apply L1 (Lasso) and L2 (Ridge) regularization to prevent overfitting
- [ ] Evaluate regression models with MAE, MSE, RMSE, and R²

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 8.1 · Simple & Multiple Linear Regression
:link: 01_simple_multiple_regression
:link-type: doc

The linear model $\hat{y} = \mathbf{X}\boldsymbol{\beta}$. OLS derivation. Assumptions: linearity, homoscedasticity, independence, normality. Residual diagnostics. Interpreting coefficients.
:::

:::{grid-item-card} 8.2 · Polynomial Regression
:link: 02_polynomial_regression
:link-type: doc

Feature expansion with `PolynomialFeatures`. Degree selection via cross-validation. The danger of high-degree polynomials. Splines as a more stable alternative.
:::

:::{grid-item-card} 8.3 · Regularization: Ridge & Lasso
:link: 03_regularization
:link-type: doc

Why OLS can fail: multicollinearity and high dimensionality. Ridge (L2) shrinks all coefficients. Lasso (L1) performs feature selection. Elastic Net combines both. `RidgeCV`, `LassoCV`.
:::

:::{grid-item-card} 8.4 · Regression Metrics
:link: 04_regression_metrics
:link-type: doc

MAE vs MSE vs RMSE: sensitivity to outliers. R² and Adjusted R². MAPE and SMAPE for scale-free comparison. The baseline model: always compare against `DummyRegressor`.
:::
::::

---

## Key Equations

$$
\hat{\boldsymbol{\beta}}_{\text{OLS}} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{y}
$$

$$
\hat{\boldsymbol{\beta}}_{\text{Ridge}} = \arg\min_{\boldsymbol{\beta}} \left\| \mathbf{y} - \mathbf{X}\boldsymbol{\beta} \right\|_2^2 + \lambda \left\| \boldsymbol{\beta} \right\|_2^2
$$

$$
\hat{\boldsymbol{\beta}}_{\text{Lasso}} = \arg\min_{\boldsymbol{\beta}} \left\| \mathbf{y} - \mathbf{X}\boldsymbol{\beta} \right\|_2^2 + \lambda \left\| \boldsymbol{\beta} \right\|_1
$$

---

## Datasets Used

- [Ames Housing](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) — predict sale price from 80 features
- [Diabetes Dataset](https://scikit-learn.org/stable/datasets/toy_dataset.html#diabetes-dataset) — built into scikit-learn
- Synthetic data for regularization path visualization

## Resources

| Resource | Notes |
|---|---|
| {cite}`james2021introduction` Ch. 3 & 6 | Clear treatment of linear models and regularization |
| {cite}`hastie2009elements` Ch. 3 | More rigorous, free PDF available |
| [StatQuest — Linear Regression](https://www.youtube.com/c/joshstarmer) | Visual step-by-step explanations |
