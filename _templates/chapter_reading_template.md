---
# ──────────────────────────────────────────────────────────
# TEMPLATE 1: Reading / Theory Page
# ──────────────────────────────────────────────────────────
# HOW TO USE
#   1. Copy this file into the correct chapter folder
#      e.g. chapters/03_pandas/01_series_dataframes.md
#   2. Rename: use zero-padded number + snake_case topic name
#   3. Fill in every PLACEHOLDER below
#   4. Add the file path to _toc.yml under its chapter
# ──────────────────────────────────────────────────────────
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# PLACEHOLDER: Topic Title

```{div} chapter-meta
<span>📖 Chapter N · Topic M</span>
<span>⏱ Estimated time: 30–45 min</span>
<span>🔗 Prerequisites: [Chapter N-1](../NN_chapter/index.md)</span>
```

---

## Learning Objectives

By the end of this section you will be able to:

- [ ] PLACEHOLDER: Objective 1 (understand / define / explain)
- [ ] PLACEHOLDER: Objective 2 (implement / apply / compute)
- [ ] PLACEHOLDER: Objective 3 (compare / evaluate / choose)
- [ ] PLACEHOLDER: Objective 4 (build / design / interpret)

---

## 1. Motivation

<!-- Why does this topic matter? Open with a concrete problem or question. -->

PLACEHOLDER: Describe a real-world scenario that this topic solves. Keep it concrete — a dataset, a business question, a failure mode.

```{admonition} Core Question
:class: tip

**PLACEHOLDER: The central question this section answers, posed as one sentence.**
```

---

## 2. Background & Intuition

<!-- Build intuition before formalizing. Use analogies, visuals, or step-by-step reasoning. -->

PLACEHOLDER: Intuitive explanation. Use plain language. Diagrams are welcome.

```{figure} ../path/to/figure.png
:name: fig-placeholder
:width: 75%
:align: center

PLACEHOLDER: Figure caption explaining what is shown and why it matters.
```

---

## 3. Formal Definition

```{admonition} Definition
:class: note

**PLACEHOLDER: Term**

$$
\text{PLACEHOLDER: Mathematical definition}
$$

where:
- $x$ — PLACEHOLDER description
- $y$ — PLACEHOLDER description
- $\theta$ — PLACEHOLDER description
```

### 3.1 Key Properties

PLACEHOLDER: List the most important properties of this concept.

1. **PLACEHOLDER property 1** — explanation
2. **PLACEHOLDER property 2** — explanation
3. **PLACEHOLDER property 3** — explanation

---

## 4. Core Algorithm / Method

<!-- Walk through the method step by step. Use numbered steps for procedures. -->

### Step-by-Step

1. **PLACEHOLDER step 1**: Description
2. **PLACEHOLDER step 2**: Description
3. **PLACEHOLDER step 3**: Description

### Mathematical Derivation

PLACEHOLDER: If derivation adds understanding, show it here. Otherwise skip.

$$
\text{PLACEHOLDER: Equation 1}
$$

Substituting into the above:

$$
\text{PLACEHOLDER: Equation 2}
$$

```{admonition} Intuition
:class: tip

PLACEHOLDER: One-sentence plain-English interpretation of the equation or result above.
```

---

## 5. Implementation

### Minimal Working Example

```{code-block} python
:linenos:
:emphasize-lines: PLACEHOLDER

# PLACEHOLDER: Minimal working example — keep under 20 lines
# This runs as static display; see the companion notebook to run interactively.

import numpy as np
import pandas as pd

# PLACEHOLDER: load or generate data
# PLACEHOLDER: apply the method
# PLACEHOLDER: inspect results
```

### Annotated Walkthrough

```{code-block} python
:linenos:

# Step 1: PLACEHOLDER
code_here = ...

# Step 2: PLACEHOLDER
result = ...

# Inspect
print(result)
```

```{dropdown} Expected output
```text
PLACEHOLDER: paste expected output here
```
```

---

## 6. Common Pitfalls

```{admonition} Warning — PLACEHOLDER pitfall title
:class: warning

PLACEHOLDER: Describe what goes wrong, why it happens, and how to avoid it.

**Wrong:** `PLACEHOLDER code or approach`

**Correct:** `PLACEHOLDER code or approach`
```

```{admonition} Warning — PLACEHOLDER pitfall title 2
:class: warning

PLACEHOLDER: Second common mistake.
```

---

## 7. When to Use This (and When Not To)

| Situation | Use? | Reason |
|---|---|---|
| PLACEHOLDER condition 1 | ✅ Yes | PLACEHOLDER reason |
| PLACEHOLDER condition 2 | ✅ Yes | PLACEHOLDER reason |
| PLACEHOLDER condition 3 | ⚠️ Maybe | PLACEHOLDER reason |
| PLACEHOLDER condition 4 | ❌ No  | PLACEHOLDER reason |

---

## 8. Worked Example

PLACEHOLDER: Full example on a real or realistic dataset.

**Problem:** PLACEHOLDER: Describe the task

**Dataset:** PLACEHOLDER: Name/source, dimensions, key columns

**Approach:**

```{code-block} python
:linenos:

# PLACEHOLDER: Complete worked example
# Include: data loading, preprocessing, applying the method, interpreting output
```

**Interpretation:** PLACEHOLDER: Explain what the output means in context.

---

## 9. Exercises

:::{exercise}
:label: ex-PLACEHOLDER-1

PLACEHOLDER: Exercise 1 — a direct application of the concept above.

*(Difficulty: ★☆☆)*
:::

:::{solution} ex-PLACEHOLDER-1
:class: dropdown

```python
# PLACEHOLDER: Solution code
```

PLACEHOLDER: Explanation of the solution approach.
:::

---

:::{exercise}
:label: ex-PLACEHOLDER-2

PLACEHOLDER: Exercise 2 — requires combining this concept with prior material.

*(Difficulty: ★★☆)*
:::

:::{solution} ex-PLACEHOLDER-2
:class: dropdown

```python
# PLACEHOLDER: Solution code
```
:::

---

:::{exercise}
:label: ex-PLACEHOLDER-3

PLACEHOLDER: Exercise 3 — open-ended or extension question.

*(Difficulty: ★★★)*
:::

---

## 10. Summary

PLACEHOLDER: 3–5 bullet points capturing the essential takeaways.

- **Key point 1**: PLACEHOLDER
- **Key point 2**: PLACEHOLDER
- **Key point 3**: PLACEHOLDER
- **Looking ahead**: In the next section, [PLACEHOLDER next topic](./NN_next_topic.md), we will build on this by...

---

## Further Reading

- {cite}`PLACEHOLDER_bibtex_key` — PLACEHOLDER: why this reference is useful
- PLACEHOLDER: Link to official documentation
- PLACEHOLDER: Link to a notable blog post, paper, or tutorial

```{bibliography}
:filter: docname in docnames
```
