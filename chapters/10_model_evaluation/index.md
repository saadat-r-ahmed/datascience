# Chapter 10 · Model Evaluation & Validation

```{div} chapter-meta
<span>🟣 Part IV: Machine Learning</span>
<span>⏱ 4–6 hours</span>
<span>🔗 Prerequisites: <a href="../09_classification/index.md">Chapter 9</a></span>
```

> **A model that looks good on paper can fail catastrophically in practice.** Accuracy is almost never the right metric. This chapter gives you the tools to rigorously evaluate models — before you trust them with anything important.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Compute and interpret the full confusion matrix and derived metrics (precision, recall, F1, MCC)
- [ ] Build ROC curves and AUC, and explain what AUC actually measures
- [ ] Choose the right metric for a given business problem (e.g., high-recall vs high-precision contexts)
- [ ] Run a proper hyperparameter search using `GridSearchCV` and `RandomizedSearchCV`
- [ ] Diagnose model behavior with learning curves and validation curves

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 10.1 · Confusion Matrix & Classification Metrics
:link: 01_confusion_matrix
:link-type: doc

TP, FP, TN, FN. Precision, recall, F1-score, and Matthews Correlation Coefficient. Macro vs micro vs weighted averaging. The precision–recall tradeoff and decision threshold selection.
:::

:::{grid-item-card} 10.2 · ROC Curves & AUC
:link: 02_roc_auc
:link-type: doc

The ROC curve: TPR vs FPR at every threshold. Area Under the Curve (AUC-ROC). The Precision-Recall curve for imbalanced problems. Comparing multiple models on the same plot.
:::

:::{grid-item-card} 10.3 · Hyperparameter Tuning
:link: 03_hyperparameter_tuning
:link-type: doc

Grid search: exhaustive but expensive. Random search: surprisingly effective. Bayesian optimization with Optuna. `HalvingGridSearchCV` for large parameter spaces. Avoiding data leakage in nested cross-validation.
:::

:::{grid-item-card} 10.4 · Learning Curves & Validation Curves
:link: 04_learning_curves
:link-type: doc

Learning curves: diagnose bias vs variance from training set size. Validation curves: diagnose the effect of a single hyperparameter. `plot_learning_curve` and `plot_validation_curve` from sklearn.
:::
::::

---

## Metric Cheat Sheet

| Situation | Best Metric | Why |
|---|---|---|
| Balanced classes | Accuracy, F1 | Straightforward |
| Imbalanced, cost of FP ≈ FN | F1 macro | Equal penalty both ways |
| FN is catastrophic (disease, fraud) | Recall | Minimize missed positives |
| FP is costly (spam filter, alert fatigue) | Precision | Minimize false alarms |
| Ranking/probability calibration | AUC-ROC | Threshold-independent |
| Severely imbalanced | AUC-PR | More informative than ROC |

---

## Resources

| Resource | Notes |
|---|---|
| {cite}`james2021introduction` Ch. 5 | Resampling methods |
| [scikit-learn — Model Selection](https://scikit-learn.org/stable/model_selection.html) | Complete API reference |
| [Optuna](https://optuna.org) | Modern hyperparameter optimization |
