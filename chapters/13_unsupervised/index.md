# Chapter 13 · Unsupervised Learning

```{div} chapter-meta
<span>🔴 Part V: Advanced Topics</span>
<span>⏱ 5–7 hours</span>
<span>🔗 Prerequisites: <a href="../11_feature_engineering/index.md">Chapter 11</a></span>
```

> **What do you do when you have no labels?** Most data in the world arrives without a target variable attached. Unsupervised learning is the art of finding structure — clusters, manifolds, latent variables — in data where no one has told you what to look for.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Apply k-means and interpret inertia and silhouette scores
- [ ] Build dendrograms with hierarchical clustering and choose a cut
- [ ] Use DBSCAN to find clusters of arbitrary shape and handle noise points
- [ ] Reduce high-dimensional data to 2D with t-SNE and UMAP for visualization
- [ ] Evaluate clustering quality without ground-truth labels

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 13.1 · k-Means Clustering
:link: 01_kmeans
:link-type: doc

The k-means algorithm: initialization, assignment, update. Choosing k: elbow method, silhouette analysis. k-means++ initialization. Limitations: assumes spherical clusters, sensitive to outliers, scale-dependent.
:::

:::{grid-item-card} 13.2 · Hierarchical Clustering
:link: 02_hierarchical
:link-type: doc

Agglomerative (bottom-up) and divisive (top-down) approaches. Linkage criteria: single, complete, average, Ward. Dendrograms: reading and cutting. `scipy.cluster.hierarchy`.
:::

:::{grid-item-card} 13.3 · DBSCAN
:link: 03_dbscan
:link-type: doc

Density-based clustering: core points, border points, noise. `eps` and `min_samples` parameters. Arbitrary-shape clusters. Robust to outliers. HDBSCAN as the modern alternative.
:::

:::{grid-item-card} 13.4 · t-SNE & UMAP
:link: 04_tsne_umap
:link-type: doc

t-SNE: preserving local neighborhoods, perplexity tuning. UMAP: faster, preserves more global structure. Using both for visualization. Common misinterpretations (cluster sizes and distances are not meaningful in t-SNE).
:::
::::

---

## Clustering Evaluation

Since there are no ground-truth labels during unsupervised learning:

| Metric | What it measures | Range |
|---|---|---|
| Inertia | Within-cluster sum of squares | 0 = perfect (minimize) |
| Silhouette Score | Cohesion vs separation per point | -1 to 1 (maximize) |
| Davies–Bouldin Index | Average ratio of within/between scatter | Lower = better |
| Calinski–Harabasz | Ratio of between/within variance | Higher = better |
| V-Measure | Agreement with external labels (if available) | 0 to 1 |

---

## Datasets Used

- [Mall Customer Segmentation](https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python)
- [MNIST](https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_digits.html) — cluster 70,000 digits without labels
- Single-cell RNA-seq data — motivates UMAP in biology

## Resources

| Resource | Notes |
|---|---|
| {cite}`hastie2009elements` Ch. 14 | Unsupervised methods — comprehensive |
| [UMAP Docs](https://umap-learn.readthedocs.io) | Excellent conceptual documentation |
| [HDBSCAN](https://hdbscan.readthedocs.io) | Hierarchical DBSCAN — often better than vanilla DBSCAN |
