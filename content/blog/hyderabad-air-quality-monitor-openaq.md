---
title: "Real-Time Air Quality Monitoring in Hyderabad Using OpenAQ and PostgreSQL"
slug: "hyderabad-air-quality-monitor-openaq"
excerpt: "Continuous air quality monitoring across 21 stations and 273 sensors in Hyderabad with rolling-MAD anomaly detection and Streamlit visualization."
published_at: "2026-10-27T10:00:00.000Z"
featured: false
reading_time: "3 min read"
tags:
  - "Data Engineering"
  - "PostgreSQL"
  - "Streamlit"
  - "OpenAQ"
feature_image: "/assets/project-02-air-quality.webp"
---

## Monitoring Urban Air Quality

Hyderabad is one of India's fastest-growing metropolitan areas. Tracking particulate matter (PM2.5, PM10) and gaseous pollutants across diverse sensor locations is essential for understanding regional air quality dynamics.

## Pipeline Architecture & Storage

The data pipeline ingests live measurements from the OpenAQ API covering 21 monitoring stations and 273 sensors across Hyderabad. Cleaned readings are stored in a relational PostgreSQL schema, currently indexing 10,262 records.

```python
# Rolling Median Absolute Deviation (MAD) anomaly filter
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
    return anomalies
```

## Anomaly Detection & Interactive Dashboard

Using a rolling-MAD statistical filter, 148 anomalous pollution spikes were detected and isolated. The live dashboard is built with Streamlit for station-level temporal filtering, backed by 27 passing pytest unit tests.

Repository and reproducible pipeline scripts:
https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor
