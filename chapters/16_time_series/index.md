# Chapter 16 · Time Series Analysis

```{div} chapter-meta
<span>🔴 Part V: Advanced Topics</span>
<span>⏱ 6–8 hours</span>
<span>🔗 Prerequisites: <a href="../06_probability_statistics/index.md">Chapter 6</a> · <a href="../12_ensemble_methods/index.md">Chapter 12</a></span>
```

> **Most real data has a time dimension — and ignoring it breaks everything.** You cannot shuffle time series rows like tabular data. You cannot use standard cross-validation. And a model that predicts "tomorrow will be like today" often outperforms sophisticated models. Time series demands its own discipline.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Decompose a time series into trend, seasonality, and residual components
- [ ] Test for stationarity and apply differencing to achieve it
- [ ] Fit ARIMA models and select orders using ACF/PACF plots and information criteria
- [ ] Apply ML models (gradient boosting, LSTM) to time series forecasting
- [ ] Evaluate forecast quality with MAE, RMSE, MAPE, and proper time-aware cross-validation

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 16.1 · Time Series Decomposition
:link: 01_decomposition
:link-type: doc

Trend, seasonality, and residual. Additive vs multiplicative decomposition. `statsmodels.tsa.seasonal_decompose`. STL decomposition for robust estimation. Rolling statistics and autocorrelation.
:::

:::{grid-item-card} 16.2 · ARIMA Models
:link: 02_arima
:link-type: doc

Stationarity and the Augmented Dickey-Fuller test. Differencing. Autoregressive (AR) and Moving Average (MA) terms. ARIMA(p, d, q) and SARIMA for seasonality. `auto_arima` from pmdarima.
:::

:::{grid-item-card} 16.3 · ML-Based Forecasting
:link: 03_ml_forecasting
:link-type: doc

Feature engineering for time series: lag features, rolling window statistics, calendar features. XGBoost and LightGBM for forecasting. Prophet for trend + seasonality. N-BEATS and modern neural approaches.
:::

:::{grid-item-card} 16.4 · Evaluation Metrics for Time Series
:link: 04_evaluation_metrics
:link-type: doc

MAE, RMSE, MAPE, sMAPE, MASE. The baseline: naive forecast (last value) and seasonal naive. Walk-forward (expanding window) cross-validation. Confidence intervals and prediction intervals.
:::
::::

---

## Time-Series CV: Critical Difference from Tabular Data

```
Tabular k-fold (WRONG for time series):
  Fold 1: test on months 1, 4, 7  ← data leaks from future
  Fold 2: test on months 2, 5, 8

Walk-forward validation (CORRECT):
  Fold 1: train 1–12,  test 13
  Fold 2: train 1–13,  test 14
  Fold 3: train 1–14,  test 15
  ...
```

---

## Datasets Used

- [Air Passengers](https://www.kaggle.com/rakannimer/air-passengers) — classic monthly airline data
- [M4 Competition](https://github.com/Mcompetitions/M4-methods) — 100,000 diverse series
- [Electricity Demand](https://archive.ics.uci.edu/ml/datasets/ElectricityLoadDiagrams20112014) — multivariate, high-frequency

## Resources

| Resource | Notes |
|---|---|
| [Forecasting: Principles and Practice](https://otexts.com/fpp3/) | Free online textbook (Hyndman) |
| [statsmodels TSA](https://www.statsmodels.org/stable/tsa.html) | Complete ARIMA API |
| [Prophet Docs](https://facebook.github.io/prophet/) | Quick forecasting with decomposition |
| [Nixtla / StatsForecast](https://nixtlaverse.nixtla.io/) | Modern, fast time-series library |
