// AUTO-GENERATED from content/blog/*.md by scripts/sync-blog.mjs
import type { Block } from '@/components/blog/BlockRenderer';

export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  feature_image: string | null;
  feature_image_alt?: string | null;
  repo_url?: string | null;
  demo_url?: string | null;
  docs_url?: string | null;
  published_at: string;
  featured: boolean;
  tags: string[];
  reading_time: string;
  blocks: Block[];
}

export const GENUINE_POSTS: BlogPostData[] = [
  {
    "id": "post-6",
    "slug": "rolling-mad-anomaly-detection-pandas",
    "title": "Robust Anomaly Detection with Rolling MAD in Pandas",
    "excerpt": "Why a rolling median and MAD beat a plain z-score on noisy sensor streams, with a short pandas implementation.",
    "feature_image": null,
    "published_at": "2026-11-25T10:27:00.000Z",
    "featured": false,
    "tags": [
      "ML",
      "Data Science",
      "Anomaly Detection",
      "Python"
    ],
    "reading_time": "3 min read",
    "blocks": [
      {
        "type": "text",
        "content": "Sensor data is messy. Stations drop out, readings spike, and a single bad value can distort the statistics you use to detect bad values. A rolling median with MAD (median absolute deviation) avoids that problem.",
        "inline": [
          {
            "type": "text",
            "value": "Sensor data is messy. Stations drop out, readings spike, and a single bad value can distort the statistics you use to detect bad values. A rolling median with MAD (median absolute deviation) avoids that problem."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Why plain z-scores fail"
      },
      {
        "type": "text",
        "content": "A z-score measures distance from the mean in units of standard deviation. Both the mean and the standard deviation are pulled by the outliers you are trying to find, so a large spike can inflate the spread enough to hide itself.",
        "inline": [
          {
            "type": "text",
            "value": "A z-score measures distance from the mean in units of standard deviation. Both the mean and the standard deviation are pulled by the outliers you are trying to find, so a large spike can inflate the spread enough to hide itself."
          }
        ]
      },
      {
        "type": "text",
        "content": "Robust statistics handle this differently:",
        "inline": [
          {
            "type": "text",
            "value": "Robust statistics handle this differently:"
          }
        ]
      },
      {
        "type": "table",
        "headers": [
          [
            {
              "type": "text",
              "value": "Method"
            }
          ],
          [
            {
              "type": "text",
              "value": "Centre"
            }
          ],
          [
            {
              "type": "text",
              "value": "Spread"
            }
          ],
          [
            {
              "type": "text",
              "value": "Breakdown point"
            }
          ]
        ],
        "rows": [
          [
            [
              {
                "type": "text",
                "value": "Z-score"
              }
            ],
            [
              {
                "type": "text",
                "value": "mean"
              }
            ],
            [
              {
                "type": "text",
                "value": "standard deviation"
              }
            ],
            [
              {
                "type": "text",
                "value": "0%"
              }
            ]
          ],
          [
            [
              {
                "type": "text",
                "value": "IQR fences"
              }
            ],
            [
              {
                "type": "text",
                "value": "median"
              }
            ],
            [
              {
                "type": "text",
                "value": "interquartile range"
              }
            ],
            [
              {
                "type": "text",
                "value": "25%"
              }
            ]
          ],
          [
            [
              {
                "type": "text",
                "value": "Rolling MAD"
              }
            ],
            [
              {
                "type": "text",
                "value": "rolling median"
              }
            ],
            [
              {
                "type": "text",
                "value": "median absolute deviation"
              }
            ],
            [
              {
                "type": "text",
                "value": "50%"
              }
            ]
          ]
        ]
      },
      {
        "type": "text",
        "content": "The breakdown point is the share of bad data an estimator tolerates before it fails. Up to half of the values in a window can be corrupted before the median and MAD break down.",
        "inline": [
          {
            "type": "text",
            "value": "The breakdown point is the share of bad data an estimator tolerates before it fails. Up to half of the values in a window can be corrupted before the median and MAD break down."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "The rolling MAD idea"
      },
      {
        "type": "text",
        "content": "For each point, look at a trailing window of recent values and compute:",
        "inline": [
          {
            "type": "text",
            "value": "For each point, look at a trailing window of recent values and compute:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "The median of the window."
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "The median of the absolute deviations from that median (the MAD)."
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "A robust score for the new value."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "text": "The score"
      },
      {
        "type": "text",
        "content": "The modified z-score is 0.6745 * (x - median) / MAD. The constant 0.6745 makes the score comparable to an ordinary z-score when the data is roughly normal. A common cutoff is an absolute score above 3.5.",
        "inline": [
          {
            "type": "text",
            "value": "The modified z-score is "
          },
          {
            "type": "code",
            "value": "0.6745 * (x - median) / MAD"
          },
          {
            "type": "text",
            "value": ". The constant 0.6745 makes the score comparable to an ordinary z-score when the data is roughly normal. A common cutoff is an absolute score above 3.5."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Implementation"
      },
      {
        "type": "code",
        "language": "python",
        "filename": "rolling_mad.py",
        "code": "import numpy as np\nimport pandas as pd\n\n\ndef rolling_mad_anomalies(\n    series: pd.Series,\n    window: int = 48,\n    threshold: float = 3.5,\n) -> pd.DataFrame:\n    \"\"\"Flag points whose robust z-score exceeds the threshold.\"\"\"\n    min_periods = window // 2\n    median = series.rolling(window, min_periods=min_periods).median()\n    abs_dev = (series - median).abs()\n    mad = abs_dev.rolling(window, min_periods=min_periods).median()\n\n    robust_z = 0.6745 * (series - median) / mad.replace(0, np.nan)\n\n    return pd.DataFrame({\n        \"value\": series,\n        \"median\": median,\n        \"robust_z\": robust_z,\n        \"is_anomaly\": robust_z.abs() > threshold,\n    })"
      },
      {
        "type": "callout",
        "variant": "note",
        "inline": [
          {
            "type": "text",
            "value": "This is the fast approximation. It takes the median of each point's deviation from the rolling median at that moment. An exact MAD recomputes deviations inside every window with "
          },
          {
            "type": "code",
            "value": "rolling.apply"
          },
          {
            "type": "text",
            "value": ", which is slower and rarely changes the result for monitoring work."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Trying it out"
      },
      {
        "type": "text",
        "content": "Generate hourly readings with one injected spike and run the detector. See the pandas rolling docs for the window options.",
        "inline": [
          {
            "type": "text",
            "value": "Generate hourly readings with one injected spike and run the detector. See the "
          },
          {
            "type": "link",
            "href": "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html",
            "children": [
              {
                "type": "text",
                "value": "pandas rolling docs"
              }
            ]
          },
          {
            "type": "text",
            "value": " for the window options."
          }
        ]
      },
      {
        "type": "code",
        "language": "python",
        "filename": "demo.py",
        "code": "rng = np.random.default_rng(42)\nindex = pd.date_range(\"2026-01-01\", periods=500, freq=\"h\")\nreadings = pd.Series(60 + rng.normal(0, 5, 500), index=index)\nreadings.iloc[250] += 80  # injected spike\n\nresult = rolling_mad_anomalies(readings)\nprint(result[result[\"is_anomaly\"]])"
      },
      {
        "type": "text",
        "content": "The spike at position 250 gets a score far above the threshold, while the median barely moves.",
        "inline": [
          {
            "type": "text",
            "value": "The spike at position 250 gets a score far above the threshold, while the median barely moves."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Where it breaks"
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "Strong daily cycles inflate the score, because normal peaks look unusual against a flat median."
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Short windows chase slow drifts and stop flagging real changes."
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Very low-variance stretches can make the MAD close to zero and the score explode."
              }
            ],
            "sublist": {
              "type": "list",
              "ordered": false,
              "items": [
                {
                  "inline": [
                    {
                      "type": "text",
                      "value": "Guard against it with a minimum MAD floor."
                    }
                  ]
                },
                {
                  "inline": [
                    {
                      "type": "text",
                      "value": "Or ignore points where the MAD is zero, as the code above does."
                    }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "type": "callout",
        "variant": "warning",
        "inline": [
          {
            "type": "text",
            "value": "Remove seasonality before scoring. For hourly data, subtract the hour-of-day median first, then run the detector on the residuals. Otherwise you will flag every morning rush hour."
          }
        ]
      }
    ]
  },
  {
    "id": "post-5",
    "slug": "data-science-internship-vectormind",
    "title": "Building VectorMind During My Data Science Internship at Codec Technologies",
    "excerpt": "Reflections on developing a natural-language sales analytics and forecasting platform during a remote Data Science internship.",
    "feature_image": "/assets/project-06-vectormind.webp",
    "published_at": "2026-10-29T10:00:00.000Z",
    "featured": false,
    "tags": [
      "Internship",
      "Data Science",
      "Streamlit",
      "Python"
    ],
    "reading_time": "3 min read",
    "blocks": [
      {
        "type": "heading",
        "level": 2,
        "text": "Internship Experience at Codec Technologies"
      },
      {
        "type": "text",
        "content": "From May to June 2025, I worked as a remote Data Science Intern at Codec Technologies Pvt. Ltd. During this period, my primary responsibility was contributing to the development of VectorMind, an internal sales-analytics platform.",
        "inline": [
          {
            "type": "text",
            "value": "From May to June 2025, I worked as a remote Data Science Intern at Codec Technologies Pvt. Ltd. During this period, my primary responsibility was contributing to the development of VectorMind, an internal sales-analytics platform."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "What VectorMind Does"
      },
      {
        "type": "text",
        "content": "VectorMind was designed to help non-technical stakeholders interrogate enterprise sales datasets effortlessly. Its core functions include:",
        "inline": [
          {
            "type": "text",
            "value": "VectorMind was designed to help non-technical stakeholders interrogate enterprise sales datasets effortlessly. Its core functions include:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "Explaining sales trends across quarters"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Generating future sales forecasts from historical patterns"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Answering natural-language questions about commercial data"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Visualizing breakdowns through an interactive Streamlit interface"
              }
            ]
          }
        ]
      },
      {
        "type": "quote",
        "text": "VectorMind: a sales-analytics platform built during a Data Science internship at Codec Technologies Pvt. Ltd (May–Jun 2025, Remote). It explains trends, forecasts sales, and answers natural-language questions about sales data.",
        "author": "Verified Project Scope",
        "inline": [
          {
            "type": "text",
            "value": "VectorMind: a sales-analytics platform built during a Data Science internship at Codec Technologies Pvt. Ltd (May–Jun 2025, Remote). It explains trends, forecasts sales, and answers natural-language questions about sales data."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Technical Lessons & Takeaways"
      },
      {
        "type": "text",
        "content": "Working on VectorMind emphasized the importance of data sanity and conversational clarity. In commercial analytics, providing an accurate, grounded answer with clear boundaries is far more valuable than speculative forecasting.",
        "inline": [
          {
            "type": "text",
            "value": "Working on VectorMind emphasized the importance of data sanity and conversational clarity. In commercial analytics, providing an accurate, grounded answer with clear boundaries is far more valuable than speculative forecasting."
          }
        ]
      }
    ]
  },
  {
    "id": "post-4",
    "slug": "ppo-reward-shaping-lunar-lander",
    "title": "Reinforcement Learning Reward Shaping Experiments on LunarLander-v3",
    "excerpt": "Comparing four reward-shaping formulations using PPO in Gymnasium with Stable-Baselines3 across 3 seeds and 1M training steps.",
    "feature_image": "/assets/project-04-lunar-lander.webp",
    "published_at": "2026-10-28T10:00:00.000Z",
    "featured": false,
    "tags": [
      "Reinforcement Learning",
      "PyTorch",
      "PPO",
      "Gymnasium"
    ],
    "reading_time": "4 min read",
    "blocks": [
      {
        "type": "heading",
        "level": 2,
        "text": "Why Reward Shaping Matters in RL"
      },
      {
        "type": "text",
        "content": "In reinforcement learning, reward design directly determines policy convergence velocity and stability. Naive sparse rewards lead to sample inefficiency, while poorly tuned dense rewards can introduce unintended policy side effects.",
        "inline": [
          {
            "type": "text",
            "value": "In reinforcement learning, reward design directly determines policy convergence velocity and stability. Naive sparse rewards lead to sample inefficiency, while poorly tuned dense rewards can introduce unintended policy side effects."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Experimental Setup"
      },
      {
        "type": "text",
        "content": "Using Gymnasium's LunarLander-v3 and Stable-Baselines3 PPO, we evaluated four distinct reward formulations systematically:",
        "inline": [
          {
            "type": "text",
            "value": "Using Gymnasium's LunarLander-v3 and Stable-Baselines3 PPO, we evaluated four distinct reward formulations systematically:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": true,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "Default environment reward"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Velocity-penalized descent shaping"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Angular-tilt stabilization bonus"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Distance-to-pad Euclidean discount shaping"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "content": "To ensure scientific reproducibility, each formulation was trained over 1,000,000 timesteps across 3 fixed random seeds.",
        "inline": [
          {
            "type": "text",
            "value": "To ensure scientific reproducibility, each formulation was trained over 1,000,000 timesteps across 3 fixed random seeds."
          }
        ]
      },
      {
        "type": "code",
        "language": "python",
        "code": "# PPO training harness setup\nimport gymnasium as gym\nfrom stable_baselines3 import PPO\n\nSEEDS = [42, 1337, 2026]\nTOTAL_TIMESTEPS = 1_000_000\n\nfor seed in SEEDS:\n    env = gym.make(\"LunarLander-v3\")\n    env.reset(seed=seed)\n    \n    model = PPO(\n        \"MlpPolicy\",\n        env,\n        learning_rate=3e-4,\n        n_steps=2048,\n        batch_size=64,\n        gamma=0.99,\n        seed=seed,\n        verbose=0\n    )\n    model.learn(total_timesteps=TOTAL_TIMESTEPS)\n    model.save(f\"./models/ppo_lunar_{seed}\")"
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Reproducibility & Verification"
      },
      {
        "type": "text",
        "content": "All training logs and evaluation benchmarks are covered by 51 passing unit and regression tests, verifying deterministic seed execution and rollout consistency.",
        "inline": [
          {
            "type": "text",
            "value": "All training logs and evaluation benchmarks are covered by 51 passing unit and regression tests, verifying deterministic seed execution and rollout consistency."
          }
        ]
      },
      {
        "type": "text",
        "content": "Check the source code and experiment logs:\nhttps://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab",
        "inline": [
          {
            "type": "text",
            "value": "Check the source code and experiment logs:\n"
          },
          {
            "type": "link",
            "href": "https://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab",
            "children": [
              {
                "type": "link",
                "href": "https://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab",
                "children": [
                  {
                    "type": "text",
                    "value": "https://github.com/mahendravelagapudi099-wq/lunar-lander-reward-shaping-lab"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "post-3",
    "slug": "hyderabad-air-quality-monitor-openaq",
    "title": "Real-Time Air Quality Monitoring in Hyderabad Using OpenAQ and PostgreSQL",
    "excerpt": "Continuous air quality monitoring across 21 stations and 273 sensors in Hyderabad with rolling-MAD anomaly detection and Streamlit visualization.",
    "feature_image": "/assets/project-02-air-quality.webp",
    "published_at": "2026-10-27T10:00:00.000Z",
    "featured": false,
    "tags": [
      "Data Engineering",
      "PostgreSQL",
      "Streamlit",
      "OpenAQ"
    ],
    "reading_time": "3 min read",
    "blocks": [
      {
        "type": "heading",
        "level": 2,
        "text": "Monitoring Urban Air Quality"
      },
      {
        "type": "text",
        "content": "Hyderabad is one of India's fastest-growing metropolitan areas. Tracking particulate matter (PM2.5, PM10) and gaseous pollutants across diverse sensor locations is essential for understanding regional air quality dynamics.",
        "inline": [
          {
            "type": "text",
            "value": "Hyderabad is one of India's fastest-growing metropolitan areas. Tracking particulate matter (PM2.5, PM10) and gaseous pollutants across diverse sensor locations is essential for understanding regional air quality dynamics."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Pipeline Architecture & Storage"
      },
      {
        "type": "text",
        "content": "The data pipeline ingests live measurements from the OpenAQ API covering 21 monitoring stations and 273 sensors across Hyderabad. Cleaned readings are stored in a relational PostgreSQL schema, currently indexing 10,262 records.",
        "inline": [
          {
            "type": "text",
            "value": "The data pipeline ingests live measurements from the OpenAQ API covering 21 monitoring stations and 273 sensors across Hyderabad. Cleaned readings are stored in a relational PostgreSQL schema, currently indexing 10,262 records."
          }
        ]
      },
      {
        "type": "code",
        "language": "python",
        "code": "# Rolling Median Absolute Deviation (MAD) anomaly filter\nimport pandas as pd\nimport numpy as np\n\ndef detect_rolling_mad_anomalies(df: pd.DataFrame, window: int = 24, threshold: float = 3.0):\n    rolling_median = df['value'].rolling(window=window, min_periods=6).median()\n    diff = (df['value'] - rolling_median).abs()\n    rolling_mad = diff.rolling(window=window, min_periods=6).median()\n    \n    # Scale MAD to approximate standard deviation\n    consistency_const = 1.4826\n    modified_z = diff / (consistency_const * rolling_mad + 1e-6)\n    \n    anomalies = df[modified_z > threshold]\n    return anomalies"
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Anomaly Detection & Interactive Dashboard"
      },
      {
        "type": "text",
        "content": "Using a rolling-MAD statistical filter, 148 anomalous pollution spikes were detected and isolated. The live dashboard is built with Streamlit for station-level temporal filtering, backed by 27 passing pytest unit tests.",
        "inline": [
          {
            "type": "text",
            "value": "Using a rolling-MAD statistical filter, 148 anomalous pollution spikes were detected and isolated. The live dashboard is built with Streamlit for station-level temporal filtering, backed by 27 passing pytest unit tests."
          }
        ]
      },
      {
        "type": "text",
        "content": "Repository and reproducible pipeline scripts:\nhttps://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor",
        "inline": [
          {
            "type": "text",
            "value": "Repository and reproducible pipeline scripts:\n"
          },
          {
            "type": "link",
            "href": "https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor",
            "children": [
              {
                "type": "link",
                "href": "https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor",
                "children": [
                  {
                    "type": "text",
                    "value": "https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "post-2",
    "slug": "rag-chatbot-over-messy-pdfs",
    "title": "Building a RAG Chatbot Over Messy Technical PDFs with ChromaDB",
    "excerpt": "Extracting and indexing 18 technical PDFs spanning 535 pages into 1,629 chunks with ChromaDB retrieval, achieving Hit Rate@5 of 0.926 and MRR of 0.893.",
    "feature_image": "/assets/project-03-rag-chatbot.webp",
    "published_at": "2026-10-26T10:00:00.000Z",
    "featured": true,
    "tags": [
      "RAG",
      "ChromaDB",
      "Information Retrieval",
      "Python"
    ],
    "reading_time": "4 min read",
    "blocks": [
      {
        "type": "heading",
        "level": 2,
        "text": "Challenge: Unstructured & Multi-Column Documents"
      },
      {
        "type": "text",
        "content": "Real-world technical documents are rarely cleanly formatted text files. They contain multi-column layouts, tables, headers, and inconsistent formatting that cause standard text extractors to produce fragmented and noisy chunks.",
        "inline": [
          {
            "type": "text",
            "value": "Real-world technical documents are rarely cleanly formatted text files. They contain multi-column layouts, tables, headers, and inconsistent formatting that cause standard text extractors to produce fragmented and noisy chunks."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Corpus Ingestion & Chunking"
      },
      {
        "type": "text",
        "content": "For this project, the ingestion corpus consisted of 18 technical PDFs containing 535 pages in total. Through heuristic structure extraction and boundary-aware chunking, the documents were partitioned into 1,629 clean text chunks and indexed into ChromaDB.",
        "inline": [
          {
            "type": "text",
            "value": "For this project, the ingestion corpus consisted of 18 technical PDFs containing 535 pages in total. Through heuristic structure extraction and boundary-aware chunking, the documents were partitioned into 1,629 clean text chunks and indexed into ChromaDB."
          }
        ]
      },
      {
        "type": "code",
        "language": "python",
        "code": "# Semantic retrieval query snippet\nimport chromadb\n\nclient = chromadb.PersistentClient(path=\"./chroma_db\")\ncollection = client.get_or_create_collection(name=\"technical_pdf_chunks\")\n\ndef retrieve_context(query_str: str, top_k: int = 5):\n    results = collection.query(\n        query_texts=[query_str],\n        n_results=top_k,\n        include=[\"documents\", \"metadatas\", \"distances\"]\n    )\n    return results[\"documents\"][0]"
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Empirical Retrieval Evaluation"
      },
      {
        "type": "text",
        "content": "Retrieval accuracy was rigorously measured across a standardized evaluation set:",
        "inline": [
          {
            "type": "text",
            "value": "Retrieval accuracy was rigorously measured across a standardized evaluation set:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "Hit Rate@5: 0.926 (92.6% of queries found relevant context within top 5 candidates)"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Mean Reciprocal Rank (MRR): 0.893"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Test verification: 174 automated pytest tests passing"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "content": "The complete pipeline implementation, evaluation harness, and Streamlit user interface are open-source:\nhttps://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot",
        "inline": [
          {
            "type": "text",
            "value": "The complete pipeline implementation, evaluation harness, and Streamlit user interface are open-source:\n"
          },
          {
            "type": "link",
            "href": "https://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot",
            "children": [
              {
                "type": "link",
                "href": "https://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot",
                "children": [
                  {
                    "type": "text",
                    "value": "https://github.com/mahendravelagapudi099-wq/messy-pdf-rag-chatbot"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "post-1",
    "slug": "telugu-text-classification-indicbertv2",
    "title": "Fine-Tuning IndicBERTv2 for 3-Class Telugu Sentiment Classification",
    "excerpt": "Fine-tuning IndicBERTv2, MuRIL, and XLM-RoBERTa on 35,142 Telugu sentences for 3-class sentiment classification, outperforming the TF-IDF baseline by +8.5 macro-F1 points.",
    "feature_image": "/assets/project-01-telugu.webp",
    "published_at": "2026-10-25T10:00:00.000Z",
    "featured": true,
    "tags": [
      "NLP",
      "Telugu",
      "Transformers",
      "PyTorch"
    ],
    "reading_time": "4 min read",
    "blocks": [
      {
        "type": "heading",
        "level": 2,
        "text": "Overview & Problem Statement"
      },
      {
        "type": "text",
        "content": "Telugu is a low-resource Dravidian language spoken by tens of millions of people, yet high-quality NLP benchmarks for sentiment classification remain limited. Standard English or generic multilingual models often struggle with Telugu morphological complexity, agglutination, and script nuances without targeted fine-tuning.",
        "inline": [
          {
            "type": "text",
            "value": "Telugu is a low-resource Dravidian language spoken by tens of millions of people, yet high-quality NLP benchmarks for sentiment classification remain limited. Standard English or generic multilingual models often struggle with Telugu morphological complexity, agglutination, and script nuances without targeted fine-tuning."
          }
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Dataset & Experimental Setup"
      },
      {
        "type": "text",
        "content": "In this project, we worked with a curated dataset of 35,142 Telugu sentences labeled across three sentiment classes: Positive, Neutral, and Negative. To evaluate modern transformer architectures systematically, we benchmarked:",
        "inline": [
          {
            "type": "text",
            "value": "In this project, we worked with a curated dataset of 35,142 Telugu sentences labeled across three sentiment classes: Positive, Neutral, and Negative. To evaluate modern transformer architectures systematically, we benchmarked:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "IndicBERTv2 (domain-pretrained on Indic languages)"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "MuRIL (Multilingual Representations for Indian Languages)"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "XLM-RoBERTa (general multilingual baseline)"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Baseline: TF-IDF with Logistic Regression"
              }
            ]
          }
        ]
      },
      {
        "type": "code",
        "language": "python",
        "code": "# Model fine-tuning pipeline snippet\nfrom transformers import AutoModelForSequenceClassification, AutoTokenizer, Trainer, TrainingArguments\n\nMODEL_NAME = \"ai4bharat/indic-bert\"\ntokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)\nmodel = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=3)\n\ntraining_args = TrainingArguments(\n    output_dir=\"./results_indicbertv2\",\n    evaluation_strategy=\"epoch\",\n    learning_rate=2e-5,\n    per_device_train_batch_size=32,\n    num_train_epochs=4,\n    weight_decay=0.01,\n    metric_for_best_model=\"macro_f1\",\n)"
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Verified Empirical Results"
      },
      {
        "type": "text",
        "content": "The TF-IDF baseline achieved a macro-F1 score of 0.648. After fine-tuning on the 35,142 sentences, IndicBERTv2 delivered the highest performance:",
        "inline": [
          {
            "type": "text",
            "value": "The TF-IDF baseline achieved a macro-F1 score of 0.648. After fine-tuning on the 35,142 sentences, IndicBERTv2 delivered the highest performance:"
          }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "items": [
          {
            "inline": [
              {
                "type": "text",
                "value": "IndicBERTv2 Macro-F1: 0.733"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Performance delta: +8.5 points improvement over baseline"
              }
            ]
          },
          {
            "inline": [
              {
                "type": "text",
                "value": "Statistical significance: p < 0.001"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "content": "A local interactive demonstration was built using Gradio for sentence-level inference testing.",
        "inline": [
          {
            "type": "text",
            "value": "A local interactive demonstration was built using Gradio for sentence-level inference testing."
          }
        ]
      },
      {
        "type": "quote",
        "text": "IndicBERTv2 achieved a macro-F1 of 0.733 against the 0.648 TF-IDF baseline (+8.5 points, p < 0.001) across 35,142 sentences.",
        "author": "Project Evaluation Benchmark",
        "inline": [
          {
            "type": "text",
            "value": "IndicBERTv2 achieved a macro-F1 of 0.733 against the 0.648 TF-IDF baseline (+8.5 points, p < 0.001) across 35,142 sentences."
          }
        ]
      },
      {
        "type": "text",
        "content": "The code, training configurations, and local demo scripts are available in the public repository:\nhttps://github.com/mahendravelagapudi099-wq/telugu-text-classifier",
        "inline": [
          {
            "type": "text",
            "value": "The code, training configurations, and local demo scripts are available in the public repository:\n"
          },
          {
            "type": "link",
            "href": "https://github.com/mahendravelagapudi099-wq/telugu-text-classifier",
            "children": [
              {
                "type": "link",
                "href": "https://github.com/mahendravelagapudi099-wq/telugu-text-classifier",
                "children": [
                  {
                    "type": "text",
                    "value": "https://github.com/mahendravelagapudi099-wq/telugu-text-classifier"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
