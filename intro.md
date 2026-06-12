---
sd_hide_title: true
---

# Data Science: An Interactive Textbook

::::{grid} 1
:::{grid-item}
```{image} _static/banner.png
:alt: Data Science: An Interactive Textbook
:class: book-banner
```
:::
::::

# Data Science: An Interactive Textbook

> **From first principles to production-ready practice** — every concept is runnable, every formula is buildable, every model is yours to explore.

This is a living, interactive textbook. Code cells run directly in your browser via [JupyterLite](https://jupyterlite.readthedocs.io) — no installation, no setup. Open any notebook, edit the code, and see results immediately.

---

## How to Use This Book

::::{grid} 3
:gutter: 2

:::{grid-item-card} 📖 Reading
Theory pages explain concepts with precise language, equations, and visualizations. Use these to build your mental model before experimenting.
:::

:::{grid-item-card} 💻 Interactive Code
Notebook pages contain live code. Click the **Launch** button at the top of any notebook to open it in JupyterLite — run cells, modify experiments, and explore.
:::

:::{grid-item-card} 🎞 Slides
Each chapter includes slide decks for lecture review. Every slide page can be converted to a presentation by running `jupyter nbconvert --to slides`.
:::
::::

---

## Book Structure

### Part I — Python Foundations

Build the programming toolkit that data science runs on.

::::{grid} 2 2 2 2
:gutter: 2

:::{grid-item-card} Chapter 1 · Python for Data Science
:link: chapters/01_python_foundations/index
:link-type: doc

Variables & types, control flow, functions, comprehensions, OOP, and the scientific Python ecosystem.
:::

:::{grid-item-card} Chapter 2 · NumPy & Array Computing
:link: chapters/02_numpy/index
:link-type: doc

Array operations, broadcasting, vectorization, linear algebra, and random number generation.
:::
::::

---

### Part II — Working with Data

Load, clean, explore, and visualize real datasets.

::::{grid} 2 2 3 3
:gutter: 2

:::{grid-item-card} Chapter 3 · Pandas
:link: chapters/03_pandas/index
:link-type: doc

DataFrames, data loading, cleaning, missing values, groupby, merging, and reshaping.
:::

:::{grid-item-card} Chapter 4 · Exploratory Data Analysis
:link: chapters/04_eda/index
:link-type: doc

Descriptive statistics, distributions, correlation, and outlier detection.
:::

:::{grid-item-card} Chapter 5 · Data Visualization
:link: chapters/05_visualization/index
:link-type: doc

Matplotlib, Seaborn, interactive Plotly, and visualization design principles.
:::
::::

---

### Part III — Statistical Foundations

The mathematics that makes machine learning make sense.

::::{grid} 1
:gutter: 2

:::{grid-item-card} Chapter 6 · Probability & Statistics
:link: chapters/06_probability_statistics/index
:link-type: doc

Probability theory, common distributions, hypothesis testing, and an introduction to Bayesian reasoning.
:::
::::

---

### Part IV — Machine Learning

Build, evaluate, and improve predictive models.

::::{grid} 2 2 3 3
:gutter: 2

:::{grid-item-card} Chapter 7 · ML Fundamentals
:link: chapters/07_ml_fundamentals/index
:link-type: doc

The ML workflow, train/test splits, cross-validation, bias–variance tradeoff, scikit-learn API.
:::

:::{grid-item-card} Chapter 8 · Regression
:link: chapters/08_regression/index
:link-type: doc

Linear, polynomial, and regularized regression. Interpreting coefficients and regression metrics.
:::

:::{grid-item-card} Chapter 9 · Classification
:link: chapters/09_classification/index
:link-type: doc

Logistic regression, decision trees, SVMs, and k-NN.
:::

:::{grid-item-card} Chapter 10 · Model Evaluation
:link: chapters/10_model_evaluation/index
:link-type: doc

Confusion matrices, ROC/AUC, hyperparameter tuning, and learning curves.
:::

:::{grid-item-card} Chapter 11 · Feature Engineering
:link: chapters/11_feature_engineering/index
:link-type: doc

Encoding, scaling, feature selection, and PCA.
:::

:::{grid-item-card} Chapter 12 · Ensemble Methods
:link: chapters/12_ensemble_methods/index
:link-type: doc

Bagging, random forests, boosting, XGBoost, LightGBM, stacking.
:::
::::

---

### Part V — Advanced Topics

Specialized techniques for real-world data challenges.

::::{grid} 2 2 2 2
:gutter: 2

:::{grid-item-card} Chapter 13 · Unsupervised Learning
:link: chapters/13_unsupervised/index
:link-type: doc

k-Means, hierarchical clustering, DBSCAN, t-SNE, UMAP.
:::

:::{grid-item-card} Chapter 14 · NLP
:link: chapters/14_nlp/index
:link-type: doc

Text preprocessing, TF-IDF, word embeddings, sentiment analysis.
:::

:::{grid-item-card} Chapter 15 · Deep Learning
:link: chapters/15_deep_learning/index
:link-type: doc

Neural networks, backpropagation, CNNs, and training best practices.
:::

:::{grid-item-card} Chapter 16 · Time Series
:link: chapters/16_time_series/index
:link-type: doc

Decomposition, ARIMA, ML-based forecasting, and evaluation metrics.
:::
::::

---

## Prerequisites

| Background | Details |
|---|---|
| **Math** | High-school algebra and basic calculus (derivatives) — deeper math is introduced as needed |
| **Programming** | No prior Python experience required — Chapter 1 covers everything from scratch |
| **Statistics** | Helpful but not required — Chapter 6 builds the foundations |

---

## Running Code

Every notebook page has a **Launch** button (rocket icon) at the top. Clicking it opens the notebook in JupyterLite — a full Python environment running entirely in your browser using WebAssembly.

You can also clone the repository and run notebooks locally:

```bash
git clone https://github.com/USERNAME/datascience-book.git
cd datascience-book
pip install -r requirements.txt
jupyter lab
```
