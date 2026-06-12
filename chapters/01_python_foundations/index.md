# Chapter 1 · Python for Data Science

```{div} chapter-meta
<span>📘 Part I: Python Foundations</span>
<span>⏱ 5–7 hours</span>
<span>🚦 No prerequisites</span>
```

> **Why learn Python?** Python is the lingua franca of data science — not because it's the fastest language, but because it lets you move from idea to working prototype faster than anything else. Virtually every tool in this book is a Python library.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Write idiomatic Python: variables, conditionals, loops, functions, and modules
- [ ] Use list and dict comprehensions to replace verbose loops
- [ ] Apply object-oriented patterns to organize data science code
- [ ] Navigate and install packages in the scientific Python ecosystem
- [ ] Read and write files, handle errors, and work with the standard library

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 1.1 · Variables, Types & Operators
:link: 01_variables_types
:link-type: doc

Integers, floats, strings, booleans. Arithmetic, comparison, and logical operators. Type coercion and truthiness.
:::

:::{grid-item-card} 1.2 · Control Flow & Functions
:link: 02_control_flow
:link-type: doc

`if/elif/else`, `for` and `while` loops, `break`/`continue`. Defining and calling functions, default arguments, `*args`, `**kwargs`, and `lambda`.
:::

:::{grid-item-card} 1.3 · Comprehensions & Generators
:link: 03_comprehensions_generators
:link-type: doc

List, dict, and set comprehensions. Generator expressions and `yield`. When generators beat lists for memory efficiency.
:::

:::{grid-item-card} 1.4 · Object-Oriented Python
:link: 04_oop_python
:link-type: doc

Classes, `__init__`, methods, and `self`. Inheritance, `super()`, dunder methods. Practical OOP patterns in data science.
:::

:::{grid-item-card} 1.5 · The Data Science Ecosystem
:link: 05_ds_ecosystem
:link-type: doc

`pip` and `conda`. Jupyter notebooks and JupyterLab. A roadmap of NumPy, Pandas, Matplotlib, scikit-learn, and when to use each.
:::
::::

---

## Datasets Used

- Synthetic data generated with `random` and `numpy`
- [Iris dataset](https://scikit-learn.org/stable/datasets/toy_dataset.html#iris-dataset) — classic multiclass classification
- Plain text files for file I/O examples

## Resources

| Resource | Notes |
|---|---|
| [Python Docs — Tutorial](https://docs.python.org/3/tutorial/) | Official, comprehensive |
| {cite}`vanderPlas2016python` Ch. 1–2 | Fastest path to scientific Python |
| [Real Python](https://realpython.com) | Excellent worked tutorials |
