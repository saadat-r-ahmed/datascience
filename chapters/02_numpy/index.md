# Chapter 2 · NumPy & Array Computing

```{div} chapter-meta
<span>📘 Part I: Python Foundations</span>
<span>⏱ 3–5 hours</span>
<span>🔗 Prerequisites: <a href="../01_python_foundations/index.md">Chapter 1</a></span>
```

> **The speed problem:** Python loops are slow because Python is a dynamic, interpreted language — every operation carries overhead. NumPy sidesteps this by shipping pre-compiled C/Fortran routines and storing data in contiguous typed arrays. A NumPy matrix multiply is 100–1000× faster than the equivalent Python loop.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Create, index, slice, and reshape NumPy arrays with confidence
- [ ] Apply broadcasting rules to write loop-free vectorized code
- [ ] Use NumPy for linear algebra: dot products, matrix factorization, eigenvalues
- [ ] Generate random samples and run reproducible simulations
- [ ] Profile Python vs NumPy performance and know when vectorization matters

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 2.1 · Array Creation & Indexing
:link: 01_array_basics
:link-type: doc

`np.array`, `arange`, `linspace`, `zeros`, `ones`, `eye`. Integer and boolean indexing, fancy indexing, slicing. Memory layout and the view vs copy distinction.
:::

:::{grid-item-card} 2.2 · Broadcasting & Vectorization
:link: 02_broadcasting_vectorization
:link-type: doc

Broadcasting rules with worked examples. Universal functions (ufuncs). Replacing explicit loops with vectorized operations. `np.where`, `np.select`, `np.apply_along_axis`.
:::

:::{grid-item-card} 2.3 · Linear Algebra
:link: 03_linear_algebra
:link-type: doc

Dot products and matrix multiplication. `np.linalg`: inverse, determinant, eigendecomposition, SVD, least squares. Geometric intuition for matrix operations.
:::

:::{grid-item-card} 2.4 · Random Numbers & Simulation
:link: 04_random_simulation
:link-type: doc

`np.random.default_rng` and reproducibility. Sampling from distributions. Monte Carlo simulation. The Central Limit Theorem demonstrated empirically.
:::
::::

---

## Key Concepts at a Glance

| Concept | Function / Method | Notes |
|---|---|---|
| Array creation | `np.array`, `np.zeros`, `np.ones` | Specify `dtype` for memory control |
| Reshape | `.reshape()`, `.ravel()` | `-1` auto-computes dimension |
| Aggregation | `.sum()`, `.mean()`, `.std()` | `axis=` controls direction |
| Broadcasting | Implicit, follows rank rules | Dimensions must be compatible |
| Linear algebra | `np.linalg.solve`, `.svd` | Prefer `@` over `np.dot` |
| Random | `rng = np.random.default_rng(42)` | Always seed for reproducibility |

---

## Resources

| Resource | Notes |
|---|---|
| [NumPy User Guide](https://numpy.org/doc/stable/user/) | Official — especially the Broadcasting page |
| {cite}`vanderPlas2016python` Ch. 2 | Excellent visual explanations |
| [100 NumPy Exercises](https://github.com/rougier/numpy-100) | Practice problems with solutions |
