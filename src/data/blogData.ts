import type { Block } from '@/components/blog/BlockRenderer';

export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  featured: boolean;
  tags: string[];
  reading_time: string;
  blocks: Block[];
}

export const GENUINE_POSTS: BlogPostData[] = [
  {
    id: 'post-1',
    slug: 'telugu-text-classification-indicbertv2',
    title: 'Fine-Tuning IndicBERTv2 for 3-Class Telugu Sentiment Classification',
    excerpt:
      'Fine-tuning IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification, outperforming the TF-IDF baseline by +8.5 macro-F1 points.',
    feature_image: '/assets/project-01-telugu.png',
    published_at: '2026-10-25T10:00:00.000Z',
    featured: true,
    tags: ['NLP', 'Telugu', 'Transformers', 'PyTorch'],
    reading_time: '4 min read',
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Overview & Problem Statement',
      },
      {
        type: 'text',
        content:
          'Telugu is a low-resource Dravidian language spoken by tens of millions of people, yet high-quality NLP benchmarks for sentiment classification remain limited. Standard English or generic multilingual models often struggle with Telugu morphological complexity, agglutination, and script nuances without targeted fine-tuning.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Dataset & Experimental Setup',
      },
      {
        type: 'text',
        content:
          'In this project, we worked with a curated dataset of 35,142 Telugu sentences labeled across three sentiment classes: Positive, Neutral, and Negative. To evaluate modern transformer architectures systematically, we benchmarked:\n\n• IndicBERTv2 (domain-pretrained on Indic languages)\n• MuRIL (Multilingual Representations for Indian Languages)\n• XLM-RoBERTa (general multilingual baseline)\n• Baseline: TF-IDF with Logistic Regression',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Model fine-tuning pipeline snippet
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
)`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Verified Empirical Results',
      },
      {
        type: 'text',
        content:
          'The TF-IDF baseline achieved a macro-F1 score of 0.648. After fine-tuning on the 35,142 sentences, IndicBERTv2 delivered the highest performance:\n\n• IndicBERTv2 Macro-F1: 0.733\n• Performance delta: +8.5 points improvement over baseline\n• Statistical significance: p < 0.001\n\nA local interactive demonstration was built using Gradio for sentence-level inference testing.',
      },
      {
        type: 'quote',
        text: 'IndicBERTv2 achieved a macro-F1 of 0.733 against the 0.648 TF-IDF baseline (+8.5 points, p < 0.001) across 35,142 sentences.',
        author: 'Project Evaluation Benchmark',
      },
      {
        type: 'text',
        content:
          'The code, training configurations, and local demo scripts are available in the public repository:\nhttps://github.com/mahendravelagapudi099-wq/telugu-text-classifier',
      },
    ],
  },
  {
    id: 'post-2',
    slug: 'rag-chatbot-over-messy-pdfs',
    title: 'Building a RAG Chatbot Over Messy Technical PDFs with ChromaDB',
    excerpt:
      'Extracting and indexing 18 technical PDFs spanning 535 pages into 1,629 chunks with ChromaDB retrieval, achieving Hit Rate@5 of 0.926 and MRR of 0.893.',
    feature_image: '/assets/project-03-rag-chatbot.png',
    published_at: '2026-10-26T10:00:00.000Z',
    featured: true,
    tags: ['RAG', 'ChromaDB', 'Information Retrieval', 'Python'],
    reading_time: '4 min read',
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Challenge: Unstructured & Multi-Column Documents',
      },
      {
        type: 'text',
        content:
          'Real-world technical documents are rarely cleanly formatted text files. They contain multi-column layouts, tables, headers, and inconsistent formatting that cause standard text extractors to produce fragmented and noisy chunks.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Corpus Ingestion & Chunking',
      },
      {
        type: 'text',
        content:
          'For this project, the ingestion corpus consisted of 18 technical PDFs containing 535 pages in total. Through heuristic structure extraction and boundary-aware chunking, the documents were partitioned into 1,629 clean text chunks and indexed into ChromaDB.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Semantic retrieval query snippet
import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="technical_pdf_chunks")

def retrieve_context(query_str: str, top_k: int = 5):
    results = collection.query(
        query_texts=[query_str],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )
    return results["documents"][0]`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Empirical Retrieval Evaluation',
      },
      {
        type: 'text',
        content:
          'Retrieval accuracy was rigorously measured across a standardized evaluation set:\n\n• Hit Rate@5: 0.926 (92.6% of queries found relevant context within top 5 candidates)\n• Mean Reciprocal Rank (MRR): 0.893\n• Test verification: 174 automated pytest tests passing',
      },
      {
        type: 'text',
        content:
          'The complete pipeline implementation, evaluation harness, and Streamlit user interface are open-source:\nhttps://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot',
      },
    ],
  },
  {
    id: 'post-3',
    slug: 'hyderabad-air-quality-monitor-openaq',
    title: 'Real-Time Air Quality Monitoring in Hyderabad Using OpenAQ and PostgreSQL',
    excerpt:
      'Continuous air quality monitoring across 21 stations and 273 sensors in Hyderabad with rolling-MAD anomaly detection and Streamlit visualization.',
    feature_image: '/assets/project-02-air-quality.png',
    published_at: '2026-10-27T10:00:00.000Z',
    featured: false,
    tags: ['Data Engineering', 'PostgreSQL', 'Streamlit', 'OpenAQ'],
    reading_time: '3 min read',
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Monitoring Urban Air Quality',
      },
      {
        type: 'text',
        content:
          'Hyderabad is one of India\'s fastest-growing metropolitan areas. Tracking particulate matter (PM2.5, PM10) and gaseous pollutants across diverse sensor locations is essential for understanding regional air quality dynamics.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Pipeline Architecture & Storage',
      },
      {
        type: 'text',
        content:
          'The data pipeline ingests live measurements from the OpenAQ API covering 21 monitoring stations and 273 sensors across Hyderabad. Cleaned readings are stored in a relational PostgreSQL schema, currently indexing 10,262 records.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Rolling Median Absolute Deviation (MAD) anomaly filter
import pandas as pd
import numpy as np

def detect_rolling_mad_anomalies(df: pd.DataFrame, window: int = 24, threshold: float = 3.0):
    rolling_median = df['value'].rolling(window=window, min_periods=6).median()
    diff = (df['value'] - rolling_median).abs()
    rolling_mad = diff.rolling(window=window, min_periods=6).median()
    
    # Scale MAD to approximate standard deviation
    consistency_const = 1.4826
    modified_z = diff / (consistency_const * rolling_mad + 1e-6)
    
    anomalies = df[modified_z > threshold]
    return anomalies`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Anomaly Detection & Interactive Dashboard',
      },
      {
        type: 'text',
        content:
          'Using a rolling-MAD statistical filter, 148 anomalous pollution spikes were detected and isolated. The live dashboard is built with Streamlit for station-level temporal filtering, backed by 27 passing pytest unit tests.',
      },
      {
        type: 'text',
        content:
          'Repository and reproducible pipeline scripts:\nhttps://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor',
      },
    ],
  },
  {
    id: 'post-4',
    slug: 'ppo-reward-shaping-lunar-lander',
    title: 'Reinforcement Learning Reward Shaping Experiments on LunarLander-v3',
    excerpt:
      'Comparing four reward-shaping formulations using PPO in Gymnasium with Stable-Baselines3 across 3 seeds and 1M training steps.',
    feature_image: '/assets/project-04-lunar-lander.png',
    published_at: '2026-10-28T10:00:00.000Z',
    featured: false,
    tags: ['Reinforcement Learning', 'PyTorch', 'PPO', 'Gymnasium'],
    reading_time: '4 min read',
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Why Reward Shaping Matters in RL',
      },
      {
        type: 'text',
        content:
          'In reinforcement learning, reward design directly determines policy convergence velocity and stability. Naive sparse rewards lead to sample inefficiency, while poorly tuned dense rewards can introduce unintended policy side effects.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Experimental Setup',
      },
      {
        type: 'text',
        content:
          'Using Gymnasium\'s LunarLander-v3 and Stable-Baselines3 PPO, we evaluated four distinct reward formulations systematically:\n\n1. Default environment reward\n2. Velocity-penalized descent shaping\n3. Angular-tilt stabilization bonus\n4. Distance-to-pad Euclidean discount shaping\n\nTo ensure scientific reproducibility, each formulation was trained over 1,000,000 timesteps across 3 fixed random seeds.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# PPO training harness setup
import gymnasium as gym
from stable_baselines3 import PPO

SEEDS = [42, 1337, 2026]
TOTAL_TIMESTEPS = 1_000_000

for seed in SEEDS:
    env = gym.make("LunarLander-v3")
    env.reset(seed=seed)
    
    model = PPO(
        "MlpPolicy",
        env,
        learning_rate=3e-4,
        n_steps=2048,
        batch_size=64,
        gamma=0.99,
        seed=seed,
        verbose=0
    )
    model.learn(total_timesteps=TOTAL_TIMESTEPS)
    model.save(f"./models/ppo_lunar_{seed}")`,
      },
      {
        type: 'heading',
        level: 2,
        text: 'Reproducibility & Verification',
      },
      {
        type: 'text',
        content:
          'All training logs and evaluation benchmarks are covered by 51 passing unit and regression tests, verifying deterministic seed execution and rollout consistency.',
      },
      {
        type: 'text',
        content:
          'Check the source code and experiment logs:\nhttps://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab',
      },
    ],
  },
  {
    id: 'post-5',
    slug: 'data-science-internship-vectormind',
    title: 'Building VectorMind During My Data Science Internship at Codec Technologies',
    excerpt:
      'Reflections on developing a natural-language sales analytics and forecasting platform during a remote Data Science internship.',
    feature_image: '/assets/project-06-vectormind.png',
    published_at: '2026-10-29T10:00:00.000Z',
    featured: false,
    tags: ['Internship', 'Data Science', 'Streamlit', 'Python'],
    reading_time: '3 min read',
    blocks: [
      {
        type: 'heading',
        level: 2,
        text: 'Internship Experience at Codec Technologies',
      },
      {
        type: 'text',
        content:
          'From May to June 2025, I worked as a remote Data Science Intern at Codec Technologies Pvt. Ltd. During this period, my primary responsibility was contributing to the development of VectorMind, an internal sales-analytics platform.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'What VectorMind Does',
      },
      {
        type: 'text',
        content:
          'VectorMind was designed to help non-technical stakeholders interrogate enterprise sales datasets effortlessly. Its core functions include:\n\n• Explaining sales trends across quarters\n• Generating future sales forecasts from historical patterns\n• Answering natural-language questions about commercial data\n• Visualizing breakdowns through an interactive Streamlit interface',
      },
      {
        type: 'quote',
        text: 'VectorMind: a sales-analytics platform built during a Data Science internship at Codec Technologies Pvt. Ltd (May–Jun 2025, Remote). It explains trends, forecasts sales, and answers natural-language questions about sales data.',
        author: 'Verified Project Scope',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Technical Lessons & Takeaways',
      },
      {
        type: 'text',
        content:
          'Working on VectorMind emphasized the importance of data sanity and conversational clarity. In commercial analytics, providing an accurate, grounded answer with clear boundaries is far more valuable than speculative forecasting.',
      },
    ],
  },
];

