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
  github: string;
  demo?: string;
  liveDemo: boolean;
  featured: boolean;
  image: string;
  imageAlt: string;
  date: string;
  role: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'sentimentscopex',
    id: 1,
    title: 'SentimentScopex',
    category: 'NLP & Real-Time Inference',
    tagline: 'End-to-end multi-class sentiment polarity & feedback intelligence engine',
    summary:
      'Production AI platform analyzing consumer reviews, customer feedback streams, and comments to compute multi-class sentiment polarity with confidence calibration.',
    problem:
      'Consumer-facing products ingest high volumes of unstructured text feedback across fragmented channels. Traditional sentiment tools either lack sub-second latency for live interactions or fail to calibrate confidence scores across ambiguous or sarcastic inputs.',
    architecture: [
      'Streaming Ingestion: Lightweight HTTP endpoint accepting token batches with client-side sanitization and debouncing.',
      'Inference Engine: Transformer-based token scoring pipeline with calibrated multi-class probability outputs (Positive, Neutral, Negative).',
      'Client Dashboard: React & TypeScript application providing real-time sentiment distribution charts and confidence benchmarks.',
      'Deployment: Edge-distributed deployment on Netlify with automated CI/CD and response caching.'
    ],
    benchmarks: [
      { metric: 'Inference Latency', value: '< 240ms', note: 'Edge-cached inference loop' },
      { metric: 'Classification F1', value: '0.92', note: 'Evaluated across multi-domain reviews' },
      { metric: 'Availability', value: '99.9%', note: 'Zero-downtime static delivery' }
    ],
    tech: ['React', 'TypeScript', 'TensorFlow', 'PostgreSQL', 'Node.js', 'Netlify', 'Tailwind CSS'],
    github: 'https://github.com/mahendravelagapudi099-wq/SentimentScope',
    demo: 'https://sentimentscopex.netlify.app/',
    liveDemo: true,
    featured: true,
    image: '/assets/SentimentScopex.jpg',
    imageAlt: 'SentimentScopex platform UI screenshot',
    date: '2025',
    role: 'Lead AI Engineer & Full-Stack Developer'
  },
  {
    slug: 'vectormind',
    id: 2,
    title: 'VectorMind — AI Sales Analyst',
    category: 'RAG & Predictive Analytics',
    tagline: 'Enterprise sales intelligence fusing vector semantic search with time-series forecasting',
    summary:
      'Enterprise sales intelligence system integrating ChromaDB vector search with Facebook Prophet forecasting to automate multi-quarter revenue projection and anomaly detection.',
    problem:
      'Enterprise sales leadership struggles to reconcile narrative quarterly updates (call notes, CRM qualitative remarks) with tabular quantitative sales figures. Siloed databases cause weeks of manual reporting delay.',
    architecture: [
      'Document Chunking & Vectorization: LangChain-orchestrated pipeline transforming sales logs and call notes into dense embeddings stored in ChromaDB.',
      'Retrieval-Augmented Reasoning: Context-aware query routing passing semantic context to LLM orchestrators with strict citation constraints.',
      'Quantitative Time-Series Layer: Integrated Facebook Prophet models trained on longitudinal revenue data to produce seasonal decomposition and trend intervals.',
      'Interactive Analytics Interface: Streamlit-powered dashboard visualizing projections alongside verifiable document citations.'
    ],
    benchmarks: [
      { metric: 'Vector Query Time', value: '140ms', note: 'Top-k semantic retrieval in ChromaDB' },
      { metric: 'Forecasting Horizon', value: '4 Quarters', note: 'Prophet with 95% confidence intervals' },
      { metric: 'Data Pipeline', value: '100% Local', note: 'Zero third-party vendor data leakage' }
    ],
    tech: ['Python', 'LangChain', 'ChromaDB', 'Prophet', 'Streamlit', 'Scikit-learn', 'Pandas'],
    github: 'https://github.com/mahendravelagapudi099-wq/VectorMind---AI-Sales-Analyst-.git',
    liveDemo: false,
    featured: true,
    image: '/assets/Student_Performance_Dashboard.png',
    imageAlt: 'VectorMind architecture and analytics visualization',
    date: '2025',
    role: 'Data Science & Systems Architect'
  },
  {
    slug: 'student-analytics',
    id: 3,
    title: 'Student Performance Analytics',
    category: 'Quantitative Modeling & EDA',
    tagline: 'Multivariate academic risk identification and behavioral correlation system',
    summary:
      'Predictive educational dashboard that correlates study hours, attendance patterns, and test variance to identify early academic risk thresholds.',
    problem:
      'Educational institutions identify student performance deficits only after exam completion, when remedial intervention is too late. The challenge is early warning signal detection through behavioral proxy metrics.',
    architecture: [
      'Data Ingestion & Cleaning: Automated pipeline handling missingness, outlier detection, and feature normalization across multi-term cohorts.',
      'Multivariate Regression: Statistical modeling correlating study velocity, lab attendance, and assignment punctuality with test variance.',
      'Threshold Risk Scoring: Segmenting cohorts into risk tiers with interpretable feature importance weights.',
      'Visual Dashboard: Interactive exploration allowing educators to simulate intervention outcomes.'
    ],
    benchmarks: [
      { metric: 'Risk Detection Accuracy', value: '88.4%', note: 'Identified 3 weeks prior to midterm assessments' },
      { metric: 'Feature Correlation', value: 'r = 0.76', note: 'Strongest correlation: attendance regularity' },
      { metric: 'Processing Throughput', value: '10k rows/s', note: 'Optimized Pandas vectorization' }
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/mahendravelagapudi099-wq/Student_Performance_Dashboard.git',
    liveDemo: false,
    featured: true,
    image: '/assets/Student_Performance_Dashboard.png',
    imageAlt: 'Student Performance Analytics dashboard visualization',
    date: '2024',
    role: 'Statistical Modeling & Python Developer'
  },
  {
    slug: 'climate-insights',
    id: 4,
    title: 'Climate Change Insights',
    category: 'Time-Series Environmental EDA',
    tagline: 'Multi-decade atmospheric anomaly decomposition and climate trend modeling',
    summary:
      'Longitudinal analysis and visualization of multi-decade atmospheric CO2, surface temperature variances, and seasonal environmental anomaly drifts.',
    problem:
      'Climate datasets contain complex multi-frequency noise, sensor shifts, and non-stationary trends that obscure underlying acceleration signals without rigorous statistical decomposition.',
    architecture: [
      'Multi-Source Ingestion: Aggregation of global temperature anomaly records and NOAA atmospheric observation data.',
      'Time-Series Decomposition: Classical and seasonal-trend decomposition using LOESS (STL) to isolate decadal drift from annual oscillations.',
      'Distributional Analysis: Quantile regression analyzing changes in variance and extreme event frequency over 50 years.'
    ],
    benchmarks: [
      { metric: 'Dataset Span', value: '50+ Years', note: 'Continuous longitudinal observations' },
      { metric: 'Decomposition', value: 'STL', note: 'Isolated secular trend from seasonal variance' },
      { metric: 'Reproducibility', value: '100%', note: 'Executable Jupyter notebooks with fixed seeds' }
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    github: 'https://github.com/mahendravelagapudi099-wq/6-CLIMATE-CHANGE-INSIGHTS.git',
    liveDemo: false,
    featured: false,
    image: '/assets/SentimentScopex.jpg',
    imageAlt: 'Climate data EDA visualization',
    date: '2024',
    role: 'Data Science Researcher'
  },
  {
    slug: 'habit-tracker',
    id: 5,
    title: 'Habit Tracker Web',
    category: 'Full-Stack Cloud Application',
    tagline: 'Resilient habit monitoring and streak progression platform with real-time sync',
    summary:
      'Habit monitoring and streak progression web application with real-time cloud persistence, streak verification logic, and interactive completion analytics.',
    problem:
      'Typical habit trackers suffer from clunky offline synchronization and fragile streak reset algorithms when user timezones vary.',
    architecture: [
      'Client State: React Context with optimistic local updates for instant UI feedback.',
      'Cloud Persistence: Real-time Firebase Firestore syncing across devices with offline fallback cache.',
      'Streak Engine: Timezone-aware date calculations preventing streak false-resets during cross-midnight logging.'
    ],
    benchmarks: [
      { metric: 'Sync Latency', value: '< 100ms', note: 'Firestore WebSocket snapshot listeners' },
      { metric: 'Offline Support', value: 'Enabled', note: 'IndexedDB caching with auto-reconciliation' }
    ],
    tech: ['React', 'TypeScript', 'Firebase Firestore', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/mahendravelagapudi099-wq/HABIT-TRACKER-WEB.git',
    liveDemo: false,
    featured: false,
    image: '/assets/Student_Performance_Dashboard.png',
    imageAlt: 'Habit Tracker Web UI',
    date: '2024',
    role: 'Full-Stack Developer'
  }
];

