---
title: Robust Anomaly Detection with Rolling MAD in Pandas
slug: rolling-mad-anomaly-detection-pandas
excerpt: Why a rolling median and MAD beat a plain z-score on noisy sensor streams, with a short pandas implementation.
published_at: 2026-11-25T10:27:00.000Z
featured: false
reading_time: ''
tags:
  - ML
  - Data Science
  - Anomaly Detection
  - Python
feature_image: ''
feature_image_alt: ''
repo_url: ''
demo_url: ''
docs_url: ''
---

Sensor data is messy. Stations drop out, readings spike, and a single bad value can distort the statistics you use to detect bad values. A rolling median with MAD (median absolute deviation) avoids that problem.

## Why plain z-scores fail

A z-score measures distance from the mean in units of standard deviation. Both the mean and the standard deviation are pulled by the outliers you are trying to find, so a large spike can inflate the spread enough to hide itself.

Robust statistics handle this differently:

| Method | Centre | Spread | Breakdown point |
|---|---|---|---|
| Z-score | mean | standard deviation | 0% |
| IQR fences | median | interquartile range | 25% |
| Rolling MAD | rolling median | median absolute deviation | 50% |

The breakdown point is the share of bad data an estimator tolerates before it fails. Up to half of the values in a window can be corrupted before the median and MAD break down.

## The rolling MAD idea

For each point, look at a trailing window of recent values and compute:

1. The median of the window.
2. The median of the absolute deviations from that median (the MAD).
3. A robust score for the new value.

### The score

The modified z-score is `0.6745 * (x - median) / MAD`. The constant 0.6745 makes the score comparable to an ordinary z-score when the data is roughly normal. A common cutoff is an absolute score above 3.5.

## Implementation

```python title="rolling_mad.py"
import numpy as np
import pandas as pd


def rolling_mad_anomalies(
    series: pd.Series,
    window: int = 48,
    threshold: float = 3.5,
) -> pd.DataFrame:
    """Flag points whose robust z-score exceeds the threshold."""
    min_periods = window // 2
    median = series.rolling(window, min_periods=min_periods).median()
    abs_dev = (series - median).abs()
    mad = abs_dev.rolling(window, min_periods=min_periods).median()

    robust_z = 0.6745 * (series - median) / mad.replace(0, np.nan)

    return pd.DataFrame({
        "value": series,
        "median": median,
        "robust_z": robust_z,
        "is_anomaly": robust_z.abs() > threshold,
    })
```

> [!NOTE]
> This is the fast approximation. It takes the median of each point's deviation from the rolling median at that moment. An exact MAD recomputes deviations inside every window with `rolling.apply`, which is slower and rarely changes the result for monitoring work.

## Trying it out

Generate hourly readings with one injected spike and run the detector. See the [pandas rolling docs](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html) for the window options.

```python title="demo.py"
rng = np.random.default_rng(42)
index = pd.date_range("2026-01-01", periods=500, freq="h")
readings = pd.Series(60 + rng.normal(0, 5, 500), index=index)
readings.iloc[250] += 80  # injected spike

result = rolling_mad_anomalies(readings)
print(result[result["is_anomaly"]])
```

The spike at position 250 gets a score far above the threshold, while the median barely moves.

## Where it breaks

- Strong daily cycles inflate the score, because normal peaks look unusual against a flat median.
- Short windows chase slow drifts and stop flagging real changes.
- Very low-variance stretches can make the MAD close to zero and the score explode.
  - Guard against it with a minimum MAD floor.
  - Or ignore points where the MAD is zero, as the code above does.

> [!WARNING]
> Remove seasonality before scoring. For hourly data, subtract the hour-of-day median first, then run the detector on the residuals. Otherwise you will flag every morning rush hour.
