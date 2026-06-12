# Chapter 6 · Probability & Statistics

```{div} chapter-meta
<span>📙 Part III: Statistical Foundations</span>
<span>⏱ 6–9 hours</span>
<span>🔗 Prerequisites: <a href="../02_numpy/index.md">Chapter 2</a></span>
```

> **Statistics is the grammar of data science.** Without it, you cannot distinguish a real pattern from noise, a significant finding from coincidence, or a good model from an overfit one. This chapter builds the mathematical foundation that all of Part IV relies on.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Apply the rules of probability: independence, conditional probability, Bayes' theorem
- [ ] Identify the right distribution for a given data-generating process
- [ ] Formulate and interpret hypothesis tests using p-values and confidence intervals
- [ ] Explain the frequentist vs Bayesian perspectives and when each applies
- [ ] Simulate probability problems numerically to verify analytical results

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 6.1 · Probability Foundations
:link: 01_probability_foundations
:link-type: doc

Sample spaces, events, and axioms. Joint, marginal, and conditional probability. Independence. Bayes' theorem — intuition first, formula second. Law of large numbers.
:::

:::{grid-item-card} 6.2 · Common Distributions
:link: 02_distributions
:link-type: doc

Bernoulli, Binomial, Poisson, Geometric. Uniform, Normal, Exponential, Beta, Gamma. PMF, PDF, CDF. Choosing a distribution by matching data-generating story.
:::

:::{grid-item-card} 6.3 · Hypothesis Testing
:link: 03_hypothesis_testing
:link-type: doc

Null and alternative hypotheses. p-values, Type I and Type II errors. t-tests, chi-square tests, ANOVA. Confidence intervals. Power analysis. Common misinterpretations of p < 0.05.
:::

:::{grid-item-card} 6.4 · Bayesian Thinking
:link: 04_bayesian_thinking
:link-type: doc

Prior, likelihood, posterior. Updating beliefs with evidence. Conjugate priors. Introduction to PyMC for probabilistic programming. Bayesian A/B testing.
:::
::::

---

## Key Equations

$$
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}
\quad \text{(Bayes' Theorem)}
$$

$$
\bar{X} \xrightarrow{d} \mathcal{N}\!\left(\mu,\, \frac{\sigma^2}{n}\right)
\quad \text{(Central Limit Theorem)}
$$

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}
\quad \text{(One-sample t-statistic)}
$$

---

## Datasets Used

- Simulated data (coin flips, dice rolls, arrival times)
- [COVID-19 Variant Rates](https://ourworldindata.org/covid-vaccinations) — Bayesian updating example
- Clinical trial data — hypothesis testing case study

## Resources

| Resource | Notes |
|---|---|
| {cite}`wasserman2004all` | Rigorous, compact, freely available PDF |
| {cite}`gelman2013bayesian` | The Bayesian reference, freely available online |
| [3Blue1Brown — Bayes Theorem](https://www.youtube.com/watch?v=HZGCoVF3YvM) | Best visual explanation |
| [Think Stats](https://greenteapress.com/thinkstats2/) | Free textbook with Python code |
