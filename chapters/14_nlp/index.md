# Chapter 14 · Natural Language Processing

```{div} chapter-meta
<span>🔴 Part V: Advanced Topics</span>
<span>⏱ 6–8 hours</span>
<span>🔗 Prerequisites: <a href="../12_ensemble_methods/index.md">Chapter 12</a></span>
```

> **Language is humanity's most data-rich signal.** Every email, review, tweet, and document is a structured record of human thought. NLP is the discipline of making that signal machine-readable — and it is one of the most commercially valuable areas of data science.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Clean and normalize raw text: tokenization, stopwords, stemming, lemmatization
- [ ] Represent text numerically with Bag-of-Words and TF-IDF
- [ ] Train and evaluate text classification models
- [ ] Use pre-trained word embeddings (Word2Vec, GloVe, FastText) as features
- [ ] Fine-tune or apply a pre-trained transformer for sentiment analysis

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 14.1 · Text Preprocessing & Tokenization
:link: 01_text_preprocessing
:link-type: doc

Lowercasing, punctuation, HTML stripping. NLTK and spaCy tokenizers. Stopword removal. Stemming (Porter, Snowball) vs lemmatization. Regular expressions for text cleaning.
:::

:::{grid-item-card} 14.2 · TF-IDF & Bag of Words
:link: 02_tfidf_bow
:link-type: doc

Bag-of-Words: count matrix. Term Frequency–Inverse Document Frequency (TF-IDF). N-grams. `CountVectorizer` and `TfidfVectorizer` in scikit-learn. Text classification pipeline: TF-IDF + Logistic Regression.
:::

:::{grid-item-card} 14.3 · Word Embeddings
:link: 03_word_embeddings
:link-type: doc

Motivation: one-hot vs dense representations. Word2Vec: skip-gram and CBOW. GloVe: global cooccurrence statistics. FastText: subword embeddings. Using `gensim`. Document vectors by averaging word embeddings.
:::

:::{grid-item-card} 14.4 · Sentiment Analysis
:link: 04_sentiment_analysis
:link-type: doc

Rule-based: VADER and TextBlob. ML-based: TF-IDF + classifier. Transformer-based: HuggingFace `pipeline('sentiment-analysis')`. Aspect-based sentiment. Handling negation and sarcasm.
:::
::::

---

## NLP Pipeline Overview

```
Raw Text
  ↓ Cleaning: lowercase, strip HTML, remove special chars
  ↓ Tokenization: split into words or subwords
  ↓ Normalization: stopwords, stemming / lemmatization
  ↓ Representation: BoW · TF-IDF · Embeddings · Transformers
  ↓ Model: Naive Bayes · Logistic Regression · BERT fine-tune
  ↓ Output: classification · extraction · generation
```

---

## Datasets Used

- [IMDB Movie Reviews](https://ai.stanford.edu/~amaas/data/sentiment/) — 50k binary sentiment labels
- [Amazon Product Reviews](https://jmcauley.ucsd.edu/data/amazon/) — multi-class, diverse domains
- [Reuters News](https://www.nltk.org/book/ch02.html) — multi-label topic classification

## Resources

| Resource | Notes |
|---|---|
| [NLTK Book](https://www.nltk.org/book/) | Free, covers classical NLP thoroughly |
| [HuggingFace Docs](https://huggingface.co/docs/transformers/index) | Transformers API reference |
| {cite}`vaswani2017attention` | "Attention is all you need" — the transformer paper |
| [spaCy 101](https://spacy.io/usage/spacy-101) | Industrial-strength NLP library |
