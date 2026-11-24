import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const baseHtmlPath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

const ROUTES = [
  // Top-Level Pages
  {
    path: '/projects',
    title: 'Projects & Case Studies | Velagapudi Mahendra',
    description: 'Verified machine learning, natural language processing, and data engineering projects with source code, benchmarks, and reproducibility details.',
  },
  {
    path: '/research',
    title: 'Research Proposal | Velagapudi Mahendra',
    description: 'Risk-Based Verification and Evidence-Grounded Self-Correction for AI Data-Analysis Agents. Working paper finalized in October 2026.',
  },
  {
    path: '/credentials',
    title: 'Verified Credentials & Certifications | Velagapudi Mahendra',
    description: 'Verified academic credentials and certifications from NPTEL / IIT Roorkee, Google Cloud, MongoDB, IBM, and Postman.',
  },
  {
    path: '/about',
    title: 'About & Trajectory | Velagapudi Mahendra',
    description: 'B.Tech CSE (Data Science) student at Malla Reddy Engineering College and Management Sciences, Hyderabad. Background, internships, and technical focus.',
  },
  {
    path: '/blog',
    title: 'Technical Monograph & Blog | Velagapudi Mahendra',
    description: 'Deep dives and technical reflections on Telugu NLP, RAG architecture, air quality telemetry, reinforcement learning, and data science internships.',
  },
  {
    path: '/contact',
    title: 'Contact & Inquiries | Velagapudi Mahendra',
    description: 'Get in touch with Velagapudi Mahendra for data science internships, research collaborations, and technical projects. Replies within 24 hours.',
  },

  // Project Detail Pages
  {
    path: '/projects/telugu-text-classifier',
    title: 'Telugu Text Classifier | Case Study | Velagapudi Mahendra',
    description: 'Fine-tuned IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification. IndicBERTv2 achieved macro-F1 of 0.733 vs TF-IDF baseline 0.648 (+8.5 pts, p<0.001).',
  },
  {
    path: '/projects/hyderabad-air-quality-monitor',
    title: 'Hyderabad Air Quality Monitor | Case Study | Velagapudi Mahendra',
    description: 'Air quality monitoring pipeline for Hyderabad using OpenAQ, 21 stations, 273 sensors, PostgreSQL, 10,262 records, rolling-MAD anomaly detection (148 flagged), and 27 passing tests.',
  },
  {
    path: '/projects/messy-pdf-rag-chatbot',
    title: 'Messy PDF RAG Chatbot | Case Study | Velagapudi Mahendra',
    description: 'RAG chatbot over 18 technical PDFs, 535 pages, 1,629 chunks, and ChromaDB retrieval. Achieved Hit Rate@5 of 0.926, MRR of 0.893, with 174 passing pytest tests.',
  },
  {
    path: '/projects/lunar-lander-reward-shaping',
    title: 'Lunar Lander Reward Shaping Lab | Case Study | Velagapudi Mahendra',
    description: 'PPO reward-shaping experiments on LunarLander-v3 with Gymnasium and Stable-Baselines3. 3 seeds, 1M steps, four reward formulations, 51 passing tests.',
  },
  {
    path: '/projects/sentimentscopex',
    title: 'SentimentScopex | Case Study | Velagapudi Mahendra',
    description: 'AI-powered sentiment analysis web app that analyzes text and social media data, visualizing emotions and opinions with batch processing. Live demo deployed on Netlify.',
  },
  {
    path: '/projects/vectormind',
    title: 'VectorMind — AI Sales Analyst | Case Study | Velagapudi Mahendra',
    description: 'Sales-analytics platform built during a Data Science internship at Codec Technologies Pvt. Ltd (May–Jun 2025, Remote). Explains trends, forecasts sales, and answers questions.',
  },
  {
    path: '/projects/student-performance-analytics',
    title: 'Student Performance Analytics | Case Study | Velagapudi Mahendra',
    description: 'Student performance dashboard and predictive analytics practice project with 94% classification accuracy using Scikit-learn and Pandas.',
  },
  {
    path: '/projects/climate-insights-dashboard',
    title: 'Climate Insights Dashboard | Case Study | Velagapudi Mahendra',
    description: 'Climate change data analysis and visualization mini project with 91% correlation accuracy using Python, Pandas, and Matplotlib.',
  },

  // Blog Detail Pages
  {
    path: '/blog/telugu-text-classification-indicbertv2',
    title: 'Fine-Tuning IndicBERTv2 for 3-Class Telugu Sentiment Classification | Velagapudi Mahendra',
    description: 'Fine-tuning IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification, outperforming the TF-IDF baseline by +8.5 macro-F1 points.',
  },
  {
    path: '/blog/rag-chatbot-over-messy-pdfs',
    title: 'Building a RAG Chatbot Over Messy Technical PDFs with ChromaDB | Velagapudi Mahendra',
    description: 'Extracting and indexing 18 technical PDFs spanning 535 pages into 1,629 chunks with ChromaDB retrieval, achieving Hit Rate@5 of 0.926 and MRR of 0.893.',
  },
  {
    path: '/blog/hyderabad-air-quality-monitor-openaq',
    title: 'Real-Time Air Quality Monitoring in Hyderabad Using OpenAQ and PostgreSQL | Velagapudi Mahendra',
    description: 'Continuous air quality monitoring across 21 stations and 273 sensors in Hyderabad with rolling-MAD anomaly detection and Streamlit visualization.',
  },
  {
    path: '/blog/ppo-reward-shaping-lunar-lander',
    title: 'Reinforcement Learning Reward Shaping Experiments on LunarLander-v3 | Velagapudi Mahendra',
    description: 'Comparing four reward-shaping formulations using PPO in Gymnasium with Stable-Baselines3 across 3 seeds and 1M training steps.',
  },
  {
    path: '/blog/data-science-internship-vectormind',
    title: 'Building VectorMind During My Data Science Internship at Codec Technologies | Velagapudi Mahendra',
    description: 'Reflections on developing a natural-language sales analytics and forecasting platform during a remote Data Science internship.',
  },
];

console.log(`Starting pre-render route generation for ${ROUTES.length} routes...`);

let successCount = 0;

for (const route of ROUTES) {
  const fullUrl = `https://mahendraa.dev${route.path}`;

  // Replace Title
  let html = baseHtml.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${fullUrl}" />`
  );

  // Replace Open Graph metadata
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Replace Twitter metadata
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Determine output path (e.g. dist/projects/index.html)
  const routeRelPath = route.path.replace(/^\//, '');
  const targetDir = path.join(distDir, routeRelPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

  successCount++;
}

console.log(`Successfully generated static HTML for ${successCount}/${ROUTES.length} routes.`);
