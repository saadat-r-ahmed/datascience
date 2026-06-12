# Chapter 9 · Classification

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 6–8 hours</span>
<span>🔗 Prerequisites: <a href="../08_regression/index.md">Chapter 8</a></span>
```

> **Most real decisions are classification problems.** Will this loan default? Is this tumor malignant? Will this user churn? Each algorithm in this chapter makes different assumptions about where decision boundaries live — understanding those assumptions tells you when to reach for each one.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Derive logistic regression from first principles and interpret log-odds
- [ ] Build, prune, and visualize decision trees
- [ ] Understand the maximum-margin intuition behind support vector machines
- [ ] Apply k-nearest neighbors and reason about the curse of dimensionality
- [ ] Choose among classifiers based on dataset size, feature type, and interpretability needs

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 9.1 · Logistic Regression
:link: 01_logistic_regression
:link-type: doc

The sigmoid function. Log-loss (cross-entropy) as the optimization target. Multinomial logistic regression. Interpreting coefficients as log-odds ratios. Regularization for logistic regression.
:::

:::{grid-item-card} 9.2 · Decision Trees
:link: 02_decision_trees
:link-type: doc

Information gain and Gini impurity as split criteria. Recursive binary splitting. Preventing overfitting: `max_depth`, `min_samples_leaf`, cost-complexity pruning. Visualizing and interpreting trees.
:::

:::{grid-item-card} 9.3 · Support Vector Machines
:link: 03_svms
:link-type: doc

Hard and soft margin classification. The kernel trick: RBF, polynomial, linear kernels. `C` and `gamma` hyperparameters. Kernel SVM as implicit high-dimensional feature mapping.
:::

:::{grid-item-card} 9.4 · k-Nearest Neighbors
:link: 04_knn
:link-type: doc

Instance-based learning. Distance metrics: Euclidean, Manhattan, Minkowski. Choosing `k`. The curse of dimensionality. KD-trees and ball trees for fast lookup.
:::
::::

---

## Algorithm Comparison

| Algorithm | Interpretable? | Non-linear? | Scales to large *N*? | Key hyperparameter |
|---|---|---|---|---|
| Logistic Regression | ✅ | ❌ (linear boundary) | ✅ | `C` (regularization) |
| Decision Tree | ✅ | ✅ | ✅ | `max_depth` |
| SVM (RBF) | ❌ | ✅ | ⚠️ (slow for *N* > 100k) | `C`, `gamma` |
| k-NN | ⚠️ | ✅ | ❌ (slow prediction) | `k`, distance metric |

---

## Datasets Used

- [Breast Cancer Wisconsin](https://scikit-learn.org/stable/datasets/toy_dataset.html#breast-cancer-dataset) — binary classification benchmark
- [MNIST Digits](https://scikit-learn.org/stable/auto_examples/datasets/plot_digits_last_image.html) — 10-class digit recognition
- [Credit Card Fraud](https://www.kaggle.com/mlg-ulb/creditcardfraud) — imbalanced classification

## Resources

| Resource | Notes |
|---|---|
| {cite}`james2021introduction` Ch. 4 & 8 | Logistic regression and tree methods |
| {cite}`bishop2006pattern` Ch. 7 | SVMs — rigorous but readable |
| [scikit-learn — Classifier Comparison](https://scikit-learn.org/stable/auto_examples/classification/plot_classifier_comparison.html) | Visual decision boundaries |
