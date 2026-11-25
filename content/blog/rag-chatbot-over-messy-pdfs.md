---
title: "Building a RAG Chatbot Over Messy Technical PDFs with ChromaDB"
slug: "rag-chatbot-over-messy-pdfs"
excerpt: "Extracting and indexing 18 technical PDFs spanning 535 pages into 1,629 chunks with ChromaDB retrieval, achieving Hit Rate@5 of 0.926 and MRR of 0.893."
published_at: "2026-10-26T10:00:00.000Z"
featured: true
reading_time: "4 min read"
tags:
  - "RAG"
  - "ChromaDB"
  - "Information Retrieval"
  - "Python"
feature_image: "/assets/project-03-rag-chatbot.webp"
---

## Challenge: Unstructured & Multi-Column Documents

Real-world technical documents are rarely cleanly formatted text files. They contain multi-column layouts, tables, headers, and inconsistent formatting that cause standard text extractors to produce fragmented and noisy chunks.

## Corpus Ingestion & Chunking

For this project, the ingestion corpus consisted of 18 technical PDFs containing 535 pages in total. Through heuristic structure extraction and boundary-aware chunking, the documents were partitioned into 1,629 clean text chunks and indexed into ChromaDB.

```python
# Semantic retrieval query snippet
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="technical_pdf_chunks")

def retrieve_context(query_str: str, top_k: int = 5):
    results = collection.query(
        query_texts=[query_str],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )
    return results["documents"][0]
```

## Empirical Retrieval Evaluation

Retrieval accuracy was rigorously measured across a standardized evaluation set:

• Hit Rate@5: 0.926 (92.6% of queries found relevant context within top 5 candidates)
• Mean Reciprocal Rank (MRR): 0.893
• Test verification: 174 automated pytest tests passing

The complete pipeline implementation, evaluation harness, and Streamlit user interface are open-source:
https://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot
