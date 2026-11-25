---
title: "Fine-Tuning IndicBERTv2 for 3-Class Telugu Sentiment Classification"
slug: "telugu-text-classification-indicbertv2"
excerpt: "Fine-tuning IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification, outperforming the TF-IDF baseline by +8.5 macro-F1 points."
published_at: "2026-10-25T10:00:00.000Z"
featured: true
reading_time: "4 min read"
tags:
  - "NLP"
  - "Telugu"
  - "Transformers"
  - "PyTorch"
feature_image: "/assets/project-01-telugu.webp"
---

## Overview & Problem Statement

Telugu is a low-resource Dravidian language spoken by tens of millions of people, yet high-quality NLP benchmarks for sentiment classification remain limited. Standard English or generic multilingual models often struggle with Telugu morphological complexity, agglutination, and script nuances without targeted fine-tuning.

## Dataset & Experimental Setup

In this project, we worked with a curated dataset of 35,142 Telugu sentences labeled across three sentiment classes: Positive, Neutral, and Negative. To evaluate modern transformer architectures systematically, we benchmarked:

• IndicBERTv2 (domain-pretrained on Indic languages)
• MuRIL (Multilingual Representations for Indian Languages)
• XLM-RoBERTa (general multilingual baseline)
• Baseline: TF-IDF with Logistic Regression

```python
# Model fine-tuning pipeline snippet
from transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, TrainingArguments

MODEL_NAME = "ai4bharat/indic-bert"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=3)

training_args = TrainingArguments(
    output_dir="./results_indicbertv2",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=32,
    num_train_epochs=4,
    weight_decay=0.01,
    metric_for_best_model="macro_f1",
)
```

## Verified Empirical Results

The TF-IDF baseline achieved a macro-F1 score of 0.648. After fine-tuning on the 35,142 sentences, IndicBERTv2 delivered the highest performance:

• IndicBERTv2 Macro-F1: 0.733
• Performance delta: +8.5 points improvement over baseline
• Statistical significance: p < 0.001

A local interactive demonstration was built using Gradio for sentence-level inference testing.

> IndicBERTv2 achieved a macro-F1 of 0.733 against the 0.648 TF-IDF baseline (+8.5 points, p < 0.001) across 35,142 sentences.
> — Project Evaluation Benchmark

The code, training configurations, and local demo scripts are available in the public repository:
https://github.com/mahendravelagapudi099-wq/telugu-text-classifier
