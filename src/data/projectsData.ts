export interface Project {
  slug: string;
  id: number;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  problem: string;
  architecture: string[];
  benchmarks: { metric: string; value: string; note: string }[];
  tech: string[];
  github: string | null;
  githubLabel?: string;
  demo?: string;
  liveDemo: boolean;
  featured: boolean;
  image: string | null;
  imageAlt: string;
  date: string;
  role: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'telugu-text-classifier',
    id: 1,
    title: 'Telugu Text Classifier',
    category: 'NLP & Multilingual ML',
    tagline: 'Fine-tuned IndicBERTv2 for 3-class Telugu sentiment classification',
    summary:
      'Fine-tuned IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification. IndicBERTv2 macro-F1 0.733 vs TF-IDF baseline 0.648, +8.5 points, p<0.001. Gradio demo runs locally only.',
    problem:
      'Telugu is a low-resource language with limited publicly available sentiment datasets. Standard multilingual models underperform without domain-fine-tuning on script-specific morphology.',
    architecture: [
      'Dataset: 35,142 Telugu sentences, 3-class sentiment (positive, neutral, negative).',
      'Models evaluated: IndicBERTv2, MuRIL, XLM-RoBERTa. Best: IndicBERTv2.',
      'Baseline: TF-IDF + logistic regression, macro-F1 0.648.',
      'Fine-tuned result: IndicBERTv2 macro-F1 0.733, +8.5 points vs baseline, p<0.001.',
      'Demo: Gradio interface, local only — no public deployment.',
    ],
    benchmarks: [
      { metric: 'IndicBERTv2 Macro-F1', value: '0.733', note: 'vs TF-IDF baseline 0.648' },
      { metric: 'Improvement', value: '+8.5 pts', note: 'p<0.001 statistical significance' },
      { metric: 'Training Sentences', value: '35,142', note: '3-class Telugu sentiment dataset' },
    ],
    tech: ['Python', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'Gradio'],
    github: 'https://github.com/mahendravelagapudi099-wq/telugu-text-classifier',
    liveDemo: false,
    featured: true,
    image: '/assets/project-01-telugu.png',
    imageAlt: 'Telugu text classifier training and evaluation results',
    date: '2025',
    role: 'ML Engineer',
  },
  {
    slug: 'hyderabad-air-quality-monitor',
    id: 2,
    title: 'Hyderabad Air Quality Monitor',
    category: 'Data Engineering & Monitoring',
    tagline: 'Real-time air quality pipeline for Hyderabad using OpenAQ',
    summary:
      'Air quality monitoring pipeline for Hyderabad using OpenAQ, 21 stations, 273 sensors, PostgreSQL, 10,262 records, rolling-MAD anomaly detection, 148 flagged, Streamlit live demo, 27 passing tests.',
    problem:
      'Hyderabad lacks a consolidated, queryable air-quality data layer. Raw OpenAQ data requires cleaning, deduplication, and anomaly detection before it can support public health decisions.',
    architecture: [
      'Source: OpenAQ API — 21 monitoring stations, 273 sensors across Hyderabad.',
      'Storage: PostgreSQL — 10,262 cleaned records.',
      'Anomaly detection: rolling Median Absolute Deviation (MAD), 148 anomalies flagged.',
      'Dashboard: Streamlit live demo with station-level filtering.',
      'Test suite: 27 passing pytest tests.',
    ],
    benchmarks: [
      { metric: 'Stations', value: '21', note: 'Hyderabad monitoring network via OpenAQ' },
      { metric: 'Sensors', value: '273', note: 'Across all stations' },
      { metric: 'Anomalies Flagged', value: '148', note: 'Rolling-MAD detection on 10,262 records' },
      { metric: 'Tests Passing', value: '27', note: 'pytest test suite' },
    ],
    tech: ['Python', 'PostgreSQL', 'Streamlit', 'OpenAQ API'],
    github: 'https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor',
    liveDemo: true,
    featured: true,
    image: '/assets/project-02-air-quality.png',
    imageAlt: 'Hyderabad air quality dashboard showing station data and anomaly flags',
    date: '2025',
    role: 'Data Engineer',
  },
  {
    slug: 'messy-pdf-rag-chatbot',
    id: 3,
    title: 'Messy PDF RAG Chatbot',
    category: 'RAG & Information Retrieval',
    tagline: 'RAG chatbot over 18 technical PDFs with ChromaDB retrieval',
    summary:
      'RAG chatbot over 18 technical PDFs, 535 pages, 1,629 chunks, ChromaDB retrieval, Hit Rate@5 0.926, MRR 0.893, 174 passing tests.',
    problem:
      'Technical documentation is scattered across scanned, multi-column, or poorly-formatted PDFs that break naive text extraction. Retrieval quality degrades when chunks are noisy.',
    architecture: [
      'Corpus: 18 technical PDFs, 535 pages total.',
      'Chunking: 1,629 cleaned text chunks after extraction and deduplication.',
      'Vector store: ChromaDB — semantic retrieval.',
      'Evaluation: Hit Rate@5 0.926, MRR 0.893.',
      'Test suite: 174 passing pytest tests.',
    ],
    benchmarks: [
      { metric: 'Hit Rate@5', value: '0.926', note: 'Retrieval evaluation on 1,629 chunks' },
      { metric: 'MRR', value: '0.893', note: 'Mean Reciprocal Rank' },
      { metric: 'Tests Passing', value: '174', note: 'pytest test suite' },
    ],
    tech: ['Python', 'ChromaDB', 'Streamlit'],
    github: 'https://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot',
    liveDemo: false,
    featured: true,
    image: '/assets/project-03-rag-chatbot.png',
    imageAlt: 'RAG chatbot interface showing retrieved PDF chunks and answers',
    date: '2025',
    role: 'ML Engineer',
  },
  {
    slug: 'lunar-lander-reward-shaping',
    id: 4,
    title: 'Lunar Lander Reward Shaping Lab',
    category: 'Reinforcement Learning',
    tagline: 'PPO reward-shaping experiments on LunarLander-v3',
    summary:
      'PPO reward-shaping experiments on LunarLander-v3 with Gymnasium and Stable-Baselines3, 3 seeds, 1M steps, four reward designs, 51 passing tests.',
    problem:
      'Reward function design is a manual, underspecified part of RL. Comparing multiple reward formulations systematically — with fixed seeds and reproducible rollouts — requires a structured lab setup.',
    architecture: [
      'Environment: LunarLander-v3 via Gymnasium.',
      'Algorithm: PPO (Stable-Baselines3).',
      'Seeds: 3 seeds per experiment for reproducibility.',
      'Steps: 1M training steps per run.',
      'Reward designs: 4 distinct shaping functions compared.',
      'Test suite: 51 passing pytest tests.',
    ],
    benchmarks: [
      { metric: 'Training Steps', value: '1M', note: 'Per reward-design run' },
      { metric: 'Reward Designs', value: '4', note: 'Systematically compared' },
      { metric: 'Seeds', value: '3', note: 'Fixed seeds for reproducibility' },
      { metric: 'Tests Passing', value: '51', note: 'pytest test suite' },
    ],
    tech: ['Python', 'Stable-Baselines3', 'Gymnasium', 'PyTorch'],
    github: 'https://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab',
    liveDemo: false,
    featured: true,
    image: '/assets/project-04-lunar-lander.png',
    imageAlt: 'Lunar lander training curves comparing four reward-shaping designs',
    date: '2025',
    role: 'RL Researcher',
  },
  {
    slug: 'sentimentscopex',
    id: 5,
    title: 'SentimentScopex',
    category: 'NLP & Web Application',
    tagline: 'AI-powered sentiment analysis web app with visual analytics',
    summary:
      'AI-powered sentiment analysis web app that analyzes text and social media data and shows emotions and opinions with visual analytics and batch processing.',
    problem:
      'Understanding sentiment in unstructured text requires both a usable interface and meaningful visual output. Most sentiment tools are API-only without a client dashboard.',
    architecture: [
      'Frontend: React + TypeScript + Vite + Tailwind CSS.',
      'Live demo deployed on Netlify.',
      'Batch text processing with visual sentiment distribution.',
    ],
    benchmarks: [],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/mahendravelagapudi099-wq/SentimentScope',
    demo: 'https://sentimentscopex.netlify.app/',
    liveDemo: true,
    featured: false,
    image: '/assets/project-05-sentimentscopex.png',
    imageAlt: 'SentimentScopex web app showing sentiment analysis results',
    date: '2025',
    role: 'Full-Stack Developer',
  },
  {
    slug: 'vectormind',
    id: 6,
    title: 'VectorMind — AI Sales Analyst',
    category: 'Data Science Internship Project',
    tagline: 'Sales-analytics platform built during a data science internship',
    summary:
      'Sales-analytics platform built during a Data Science internship at Codec Technologies Pvt. Ltd (May–Jun 2025, Remote). It explains trends, forecasts sales, and answers natural-language questions about sales data.',
    problem:
      'Sales teams need to query historical data, understand trends, and get forecasts without writing SQL or Python. VectorMind provides a natural-language interface over sales data.',
    architecture: [
      'Natural-language queries over sales data.',
      'Trend explanation and sales forecasting.',
      'Interactive Streamlit dashboard.',
    ],
    benchmarks: [],
    tech: ['Python', 'Streamlit'],
    github: null,
    githubLabel: 'Private repository',
    liveDemo: false,
    featured: false,
    image: '/assets/project-06-vectormind.png',
    imageAlt: 'VectorMind sales analytics platform dashboard',
    date: '2025',
    role: 'Data Science Intern, Codec Technologies Pvt. Ltd',
  },
  {
    slug: 'student-performance-analytics',
    id: 7,
    title: 'Student Performance Analytics',
    category: 'Data Science & Dashboard',
    tagline: 'Student performance dashboard and analytics. Weekend practice project.',
    summary:
      'Student performance dashboard and analytics. Weekend practice project. 94% model accuracy.',
    problem:
      'Educational data needs clear visualization to surface performance patterns. This dashboard provides an interactive view of student metrics.',
    architecture: [
      'Data pipeline: Python + Pandas for cleaning and feature engineering.',
      'Model: classification with 94% accuracy.',
      'Dashboard: interactive visualization.',
    ],
    benchmarks: [
      { metric: 'Model Accuracy', value: '94%', note: 'Owner-confirmed figure' },
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    github: 'https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard',
    liveDemo: false,
    featured: false,
    image: '/assets/project-07-student-analytics.png',
    imageAlt: 'Student Performance Analytics dashboard visualization',
    date: '2025',
    role: 'Data Science Developer',
  },
  {
    slug: 'climate-insights-dashboard',
    id: 8,
    title: 'Climate Insights Dashboard',
    category: 'Data Science & Visualization',
    tagline: 'Climate change data analysis and visualization. Mini project.',
    summary:
      'Climate change data analysis and visualization. Mini project. 91% correlation accuracy.',
    problem:
      'Climate datasets require structured analysis and clear visualization to surface meaningful trends across time.',
    architecture: [
      'Data analysis: Python + Pandas + NumPy.',
      'Visualization: Matplotlib and Jupyter notebooks.',
    ],
    benchmarks: [
      { metric: 'Correlation Accuracy', value: '91%', note: 'Owner-confirmed figure' },
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS',
    liveDemo: false,
    featured: false,
    image: '/assets/project-08-climate.png',
    imageAlt: 'Climate Insights Dashboard showing data analysis and visualizations',
    date: '2025',
    role: 'Data Analyst',
  },
];
