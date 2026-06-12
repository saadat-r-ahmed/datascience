# Chapter 15 · Deep Learning Fundamentals

```{div} chapter-meta
<span>🔴 Part V: Advanced Topics</span>
<span>⏱ 8–12 hours</span>
<span>🔗 Prerequisites: <a href="../06_probability_statistics/index.md">Chapter 6</a> · <a href="../08_regression/index.md">Chapter 8</a></span>
```

> **Deep learning is function composition at scale.** A neural network is a parameterized function built by stacking simpler functions — and backpropagation is the elegant algorithm that computes how to adjust each parameter to reduce error. Once you understand this, the entire field opens up.

---

## Learning Outcomes

After completing this chapter you will be able to:

- [ ] Describe a neural network as a computational graph of linear transforms and activations
- [ ] Derive the backpropagation algorithm from the chain rule
- [ ] Build, train, and evaluate a feedforward network in PyTorch
- [ ] Implement a convolutional neural network (CNN) for image classification
- [ ] Apply training best practices: batch normalization, dropout, learning rate scheduling

---

## Topics

::::{grid} 2
:gutter: 3

:::{grid-item-card} 15.1 · Neural Network Architecture
:link: 01_neural_network_architecture
:link-type: doc

Neurons and weighted sums. Activation functions: ReLU, sigmoid, tanh, GELU. Layers: input, hidden, output. Universal approximation theorem (intuition). Choosing architecture size.
:::

:::{grid-item-card} 15.2 · Backpropagation & Optimization
:link: 02_backpropagation
:link-type: doc

Forward pass. Loss functions: MSE, cross-entropy. Gradient descent. Backpropagation via the chain rule. SGD, Momentum, RMSProp, Adam. Learning rate schedules.
:::

:::{grid-item-card} 15.3 · CNNs for Image Data
:link: 03_cnns
:link-type: doc

Convolutions: filters, stride, padding. Pooling layers. Feature map visualization. Classic architectures: LeNet, VGG. Transfer learning with a pre-trained ResNet. Fine-tuning.
:::

:::{grid-item-card} 15.4 · Training Best Practices
:link: 04_training_best_practices
:link-type: doc

Batch normalization. Dropout regularization. Data augmentation. Early stopping. Gradient clipping. TensorBoard for training monitoring. Debugging training: loss curves, gradient norms.
:::
::::

---

## PyTorch Minimum Viable Training Loop

```python
import torch
import torch.nn as nn
from torch.optim import Adam

model = nn.Sequential(
    nn.Linear(in_features, 128), nn.ReLU(),
    nn.Linear(128, 64),          nn.ReLU(),
    nn.Linear(64, n_classes),
)
optimizer = Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(n_epochs):
    model.train()
    for X_batch, y_batch in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(X_batch), y_batch)
        loss.backward()
        optimizer.step()
```

---

## Datasets Used

- [MNIST](http://yann.lecun.com/exdb/mnist/) — handwritten digits, the "hello world" of deep learning
- [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) — 10-class image classification
- [Fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) — harder MNIST replacement

## Resources

| Resource | Notes |
|---|---|
| {cite}`goodfellow2016deep` | The deep learning textbook — free online |
| [fast.ai Practical Deep Learning](https://course.fast.ai) | Top-down, code-first approach |
| [PyTorch Tutorials](https://pytorch.org/tutorials/) | Official, well-structured |
| {cite}`lecun1998gradient` | Original CNN paper — worth reading |
