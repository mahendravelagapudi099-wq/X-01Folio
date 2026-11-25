---
title: Building a Real-Time Air Quality Monitoring Pipeline for Hyderabad Using OpenAQ and PostgreSQL
slug: hyderabad-air-quality-monitor-openaq
excerpt: How I built an automated air quality data engineering pipeline for Hyderabad using OpenAQ API v3, Python, PostgreSQL, rolling MAD anomaly detection and Streamlit. A complete technical case study covering ingestion, data validation, database design, statistical analysis and deployment.
published_at: 2026-10-27T10:00:00.000Z
featured: false
reading_time: 3 min read
tags:
  - Data Engineering
  - PostgreSQL
  - Streamlit
  - OpenAQ
  - Anomaly Detection
feature_image: /assets/blog/8736.png
feature_image_alt: Hyderabad Air Quality Monitor dashboard showing environmental data analytics and pollutant monitoring
repo_url: https://github.com/mahendravelagapudi099-wq/hyderabad-air-quality-monitor
demo_url: https://hyderabad-air-quality-monitor.streamlit.app/
docs_url: https://docs.openaq.org/
---


## Introduction

Air pollution is an important environmental challenge for rapidly growing cities. Hyderabad, one of India's major metropolitan areas, needs reliable environmental monitoring to understand how air quality changes across different locations and over time.

Air quality monitoring stations generate measurements for pollutants such as PM2.5, PM10, nitrogen dioxide, sulphur dioxide and ozone. However, collecting measurements is only the first step. The data must also be validated, cleaned, organized, stored, analysed and presented in a useful format.

I developed the \*\*Hyderabad Air Quality Monitor\*\* to explore this complete data engineering workflow.

It is an automated environmental data pipeline that collects air quality measurements through OpenAQ API v3, processes incoming records using Python, detects statistical anomalies using rolling Median Absolute Deviation (MAD), stores structured measurements in a SQL database and presents analytical results through an interactive Streamlit dashboard.

The objective was not simply to create another dashboard. It was to build a reproducible pipeline connecting data ingestion, data quality, database management, statistical analysis and visualization.

\*\*What this case study covers:\*\*

- OpenAQ API integration and data collection.
- Python-based ingestion and preprocessing.
- Data validation and deduplication.
- PostgreSQL database architecture.
- Rolling MAD anomaly detection.
- Automated execution using GitHub Actions.
- Interactive environmental analytics using Streamlit.

## 01. Problem Statement

Environmental monitoring systems produce large amounts of measurements from different monitoring stations and sensors.

However, working with this information introduces several challenges.

\*\*Data collection:\*\* Measurements must be retrieved from external sources reliably.

\*\*Data quality:\*\* Incoming records need validation, cleaning and unit normalization.

\*\*Data consistency:\*\* Repeated measurements must not create duplicate database entries.

\*\*Historical analysis:\*\* Data must be stored with appropriate station, sensor and timestamp relationships.

\*\*Anomaly detection:\*\* Unusual measurements should be identified for further investigation.

\*\*Visualization:\*\* The processed information should be accessible through an understandable dashboard.

### Project objectives

The system was designed to:

1. Collect environmental measurements using OpenAQ API v3.
2. Validate and normalize incoming records.
3. Handle repeated measurements safely.
4. Detect statistical anomalies.
5. Store structured records in PostgreSQL.
6. Visualize pollutant trends and station comparisons.
7. Automate pipeline execution using GitHub Actions.

## 02. Data Source: OpenAQ API v3

OpenAQ provides programmatic access to publicly available air quality measurements from monitoring networks.

I selected OpenAQ API v3 as the primary data source for this project.

The API organizes information around monitoring locations, sensors, parameters and measurements.

A monitoring location can contain multiple sensors. Each sensor measures a particular environmental parameter.

For example, one station may provide separate measurements for PM2.5, PM10 and nitrogen dioxide.

### Data retrieval workflow

![OpenAQ data collection workflow\](/assets/blog/openaq-data-workflow.svg "OpenAQ API data collection workflow")

The general workflow is:

1. Retrieve monitoring location information.
2. Identify available sensors.
3. Retrieve measurement records.
4. Extract measurement values and timestamps.
5. Pass the records to the Python ingestion pipeline.

The project uses an API key through the \`X-API-Key\` request header.

Credentials are configured through environment variables rather than hardcoded in the application.

### Why OpenAQ?

- Structured access to air quality measurements.
- Location and sensor metadata.
- API-based historical data retrieval.
- Multiple pollutant parameters.
- Suitable for automated data engineering workflows.

\*\*Important:\*\* OpenAQ aggregates data from upstream monitoring providers. Its coverage and measurement availability depend on the contributing networks.

Reference: [OpenAQ API Documentation\](https://docs.openaq.org/)

## 03. System Architecture

The project is organized into four major layers.

### Layer 1 — Data Source

OpenAQ API v3 provides environmental measurements and monitoring metadata.

### Layer 2 — Pipeline Engine

Python manages API requests, ingestion, validation, transformation and anomaly detection.

### Layer 3 — Storage

SQLAlchemy provides the database abstraction layer.

PostgreSQL is used for production storage, while SQLite provides a local development fallback.

### Layer 4 — Presentation and Automation

Streamlit provides interactive analytics, and GitHub Actions schedules pipeline execution.

![Complete air quality monitoring system architecture\](/assets/blog/air-quality-system-architecture.svg "End-to-end air quality monitoring architecture")

This separation makes the application easier to maintain, test and extend.

## 04. Technology Stack

| Technology | Purpose |
|---|---|
| Python 3.12+ | Main programming language |
| OpenAQ API v3 | Environmental data source |
| Requests | HTTP communication |
| urllib3 | Retry and networking support |
| Pandas | Data manipulation |
| NumPy | Numerical operations |
| SQLAlchemy 2.x | Database ORM |
| PostgreSQL | Production database |
| SQLite | Local database fallback |
| Streamlit | Dashboard interface |
| Plotly | Interactive charts |
| Pytest | Automated testing |
| GitHub Actions | Pipeline automation |

Python was selected because of its data engineering and analytical ecosystem.

Pandas and NumPy support data processing and numerical calculations. SQLAlchemy provides a consistent interface for database operations, while Streamlit makes dashboard development straightforward.

## 05. Data Ingestion Pipeline

The ingestion component communicates with OpenAQ and retrieves measurements for configured monitoring locations and sensors.

The project supports two important operations.

### Daily ingestion

Run the pipeline using a three-day rolling window:

\`\`\`powershell
python scripts/run_pipeline.py --days 3
\`\`\`

### Historical backfill

Collect historical data using the backfill command:

\`\`\`powershell
python scripts/backfill.py --days 30
\`\`\`

### Why use a rolling window?

A rolling collection window allows the pipeline to revisit recent measurements.

This is useful when upstream measurements arrive late or a previous collection run does not capture every expected record.

Database uniqueness constraints and upsert operations help prevent duplicate measurements.

### API reliability

The project includes:

- HTTP request handling.
- Rate limiting.
- Exponential backoff for HTTP 429 and 5xx responses.
- Environment-based API credentials.

External APIs can temporarily become unavailable or restrict request frequency. Retry and rate-limiting mechanisms help make collection more reliable.

## 06. Data Validation and Preprocessing

Raw environmental measurements should not be inserted into analytical storage without validation.

The pipeline performs validation, cleaning, deduplication and unit normalization.

![Environmental data validation and preprocessing workflow\](/assets/blog/air-quality-data-validation.svg "Data validation and preprocessing workflow")

### Important validation considerations

\*\*1. Required fields\*\*

Check that records contain sufficient information to identify their sensor, location, pollutant, measurement and timestamp.

\*\*2. Measurement validity\*\*

Reject malformed or unusable records.

\*\*3. Unit normalization\*\*

Convert measurements into consistent units before comparison and analysis.

\*\*4. Timestamp consistency\*\*

Store measurement and ingestion timestamps in UTC.

\*\*5. Duplicate prevention\*\*

Use the database uniqueness constraint to identify repeated measurements.

### Why unit normalization matters

Two measurements may represent the same physical quantity while using different units.

Comparing their raw numeric values without conversion can produce incorrect analytical conclusions.

Standardizing units makes the dataset more consistent.

## 07. Database Architecture

The project uses SQLAlchemy ORM to manage database operations.

The database contains five main entities.

### Locations

Stores monitoring station information, including coordinates, country, timezone and source metadata.

### Sensors

Stores sensor information, parameter names, units and relationships with monitoring locations.

### Measurements

Stores environmental observations, normalized values, original values, timestamps and quality flags.

### Ingestion Runs

Records pipeline execution details, processing counts, execution status and quality reports.

### Anomalies

Stores detected unusual readings, observed values, baseline medians, expected ranges, methods and severity.

![Database entity relationship diagram\](/assets/blog/air-quality-database-er.svg "Locations, sensors, measurements, anomalies and ingestion runs")

### Preventing duplicate measurements

One important database constraint is:

\`\`\`sql
UNIQUE (sensor_id, parameter, measured_at_utc)
\`\`\`

This identifies a measurement using its sensor, parameter and timestamp.

The PostgreSQL implementation uses native \`ON CONFLICT DO UPDATE\` upserts.

This makes repeated ingestion safer because an existing measurement can be updated instead of inserted as another record.

### SQLite and PostgreSQL

The project supports two database environments:

- SQLite for local development.
- PostgreSQL for production storage.

SQLAlchemy provides a common database interface.

The repository also includes a migration script for transferring local SQLite records into PostgreSQL.

## 08. Statistical Anomaly Detection Using Rolling MAD

One of the important analytical components is anomaly detection.

Environmental measurements naturally fluctuate over time. However, some readings may be unusually different from their surrounding observations.

A conventional z-score uses the mean and standard deviation to measure how far an observation is from the average.

However, extreme values can influence both the mean and standard deviation.

Median Absolute Deviation provides a more robust alternative.

### What is MAD?

MAD stands for Median Absolute Deviation.

For a set of observations:

X = {x1, x2, ..., xn}

First, calculate the median:

M = median(X)

Next, calculate absolute deviations:

Di = |xi - M|

Finally, calculate the median of those deviations:

MAD = median(D)

### Modified z-score

A commonly used modified z-score is:

Z\* = 0.6745 × (x - M) / MAD

A commonly used anomaly threshold is:

|Z\*| > 3.5

This indicates a potentially unusual observation.

### Why rolling MAD?

Environmental measurements change over time.

A single global median may not represent the expected behaviour of a sensor throughout the entire monitoring period.

A rolling approach compares observations against a recent historical window.

![Rolling MAD anomaly detection visualization\](/assets/blog/rolling-mad-anomaly-detection.svg "Rolling median and MAD anomaly detection")

### Project configuration

The project README documents:

- Rolling MAD anomaly detection.
- A threshold greater than 3.5.
- A minimum historical observation guardrail of 48 observations.
- Storage of baseline medians and expected ranges.
- Severity categorization.

An anomaly does not automatically mean that pollution has increased.

It may represent a genuine environmental change, a sensor issue, unusual local conditions or an upstream data problem.

Anomaly detection is therefore a monitoring signal requiring further investigation, not a confirmed environmental diagnosis.

## 09. Interactive Streamlit Dashboard

The processed measurements are presented through an interactive Streamlit dashboard.

The dashboard provides multiple views of environmental measurements and pipeline health.

### 1. Overview and Automated Insights

Displays KPI metrics, station coverage and deterministic telemetry summaries.

![Overview dashboard\](/assets/screenshots/overview_insights.png "Overview and automated insights")

### 2. Pollutant Trends

Uses Plotly to visualize pollutant measurements across monitoring stations.

![Pollutant trends dashboard\](/assets/screenshots/pollutant_trends.png "Pollutant trends")

### 3. Station Comparisons

Compares mean pollutant concentrations across active Telangana monitoring stations.

![Station comparison dashboard\](/assets/screenshots/station_comparisons.png "Station comparisons")

### 4. Interactive Data Explorer

Provides filtering by:

- Monitoring station.
- Pollutant parameter.
- Quality flag.
- Timeframe.

It also supports CSV export.

![Interactive data explorer\](/assets/screenshots/data_explorer.png "Interactive data explorer")

### 5. Statistical Anomalies

Displays unusual measurements identified by the rolling MAD detector.

![Statistical anomaly dashboard\](/assets/screenshots/statistical_anomalies.png "Flagged statistical anomalies")

### 6. Pipeline Health and Quality Audits

Displays execution information, throughput history and data quality reports.

![Pipeline health dashboard\](/assets/screenshots/pipeline_health.png "Pipeline health and quality audits")

## 10. Automated Execution Using GitHub Actions

A monitoring pipeline becomes more useful when it can execute without manual intervention.

I configured GitHub Actions to automate pipeline execution.

The documented schedule is:

\`\`\`yaml
schedule:
  - cron: "30 1 \* \* \*"
\`\`\`

GitHub Actions uses UTC time.

The configured schedule corresponds to 07:00 AM Indian Standard Time.

The workflow also supports manual execution through \`workflow_dispatch\`.

### Automation workflow

![GitHub Actions pipeline automation workflow\](/assets/blog/air-quality-github-actions.svg "Automated pipeline execution")

The workflow requires the following repository secrets:

- \`OPENAQ_API_KEY\`
- \`DATABASE_URL\`

Sensitive credentials should never be committed directly to the repository.

Scheduled workflows also need monitoring because GitHub may disable scheduled workflows after 60 days without repository activity.

## 11. Project Results and Verified Metrics

The following results are taken from the project's documented database verification output.

The metrics were generated using:

\`\`\`powershell
python scripts/generate_metrics.py
\`\`\`

These are historical results from the documented October 11–14, 2026 collection window, not current live statistics.

| Metric | Recorded result |
|---|---:|
| Monitoring stations tracked | 21 |
| Sensors mapped | 273 |
| Telemetry records collected | 10,262 |
| Total rows processed | 10,717 |
| Invalid or malformed records | 0 |
| Missing-data / rejection rate | 0.00% |
| Statistical anomalies flagged | 148 |
| Pipeline executions | 3 |
| Workflow success rate | 100% |
| Automated tests passed | 27 |

### Understanding the results

\*\*Station coverage:\*\* The documented pipeline tracked 21 monitoring stations and mapped 273 sensors.

\*\*Data collection:\*\* A total of 10,262 telemetry records were collected during the documented window.

\*\*Data quality:\*\* The recorded output reported zero invalid or malformed records across 10,717 processed rows.

\*\*Anomaly detection:\*\* The system flagged 148 readings using its documented rolling MAD configuration.

\*\*Automation:\*\* Three documented workflow executions completed successfully.

\*\*Testing:\*\* The automated test suite reported 27 passing tests.

These metrics describe a particular historical execution window. They should not be interpreted as current live statistics or proof of complete regional monitoring coverage.

## 12. Testing and Reliability

A pipeline can complete execution without errors and still produce incorrect data.

That is why testing is important.

The project uses Pytest and documents three testing categories:

- Mocked unit tests.
- Live smoke tests.
- PostgreSQL integration tests.

Run the automated tests using:

\`\`\`powershell
pytest tests/ -v
\`\`\`

The documented result is:

\*\*27 tests passed.\*\*

The \`ingestion_runs\` table also records:

- Pipeline execution status.
- Number of requests made.
- Rows received.
- Rows inserted.
- Rows updated.
- Rows rejected.
- Quality reports.
- Error information.

This makes it easier to investigate failed runs and unexpected changes in data volume.

## 13. Challenges and Engineering Decisions

### Handling API failures

External APIs may experience rate limits and temporary server errors.

The project uses exponential backoff for HTTP 429 and 5xx responses.

### Maintaining database consistency

Repeated ingestion can create duplicate records if uniqueness is not enforced.

The unique measurement constraint and PostgreSQL upsert behaviour help address this issue.

### Supporting multiple databases

Development and production environments may use different databases.

SQLAlchemy provides the abstraction needed to support SQLite locally and PostgreSQL in production.

### Detecting unusual measurements

A statistical anomaly detector must account for changing measurement patterns.

Rolling MAD provides a robust approach, but detected anomalies still need contextual interpretation.

### Maintaining automated execution

Scheduled jobs depend on correctly configured API and database credentials.

GitHub Actions automates execution, but workflow status and data freshness still need monitoring.

## 14. Limitations and Future Improvements

The current implementation provides a foundation for environmental data monitoring, but there are opportunities for further development.

\*\*Advanced data quality monitoring\*\*

Introduce explicit completeness and freshness indicators for each sensor.

\*\*Seasonal anomaly detection\*\*

Investigate methods that account for daily and seasonal measurement patterns.

\*\*Geospatial analytics\*\*

Add interactive maps to compare station coverage and pollutant measurements geographically.

\*\*Historical analysis\*\*

Build longer-term pollutant trend comparisons when sufficient historical observations become available.

\*\*Sensor reliability monitoring\*\*

Identify stations with missing measurements or irregular reporting intervals.

\*\*Operational alerts\*\*

Introduce notifications for failed collection runs, stale data and unexpected processing volumes.

\*\*Time-series forecasting\*\*

Explore forecasting as a separate analytical extension, using appropriate validation and uncertainty estimates.

These are proposed future enhancements, not features currently claimed by the project.

## 15. What I Learned

Building this project helped me understand how different parts of data engineering fit together.

Some important lessons were:

- Data collection is only the first stage of a data pipeline.
- Validation is essential before performing analysis.
- Database constraints help maintain data integrity.
- Robust statistics can help identify unusual observations.
- Automated pipelines need operational monitoring.
- Visualizations should communicate useful information.
- Testing should cover data processing and database integration.

Most importantly, I learned how to connect API integration, Python processing, relational database design, statistical analysis and dashboard development into one engineering project.

## Conclusion

The Hyderabad Air Quality Monitor demonstrates an end-to-end approach to environmental data engineering.

By combining OpenAQ API v3, Python, Pandas, SQLAlchemy, PostgreSQL, rolling MAD anomaly detection, Streamlit and GitHub Actions, the project connects data collection, processing, storage, analysis and visualization.

The objective was not simply to create an air quality dashboard. It was to build a structured and automated pipeline that makes environmental measurements easier to collect, inspect and analyse.

The project also provides a foundation for future work involving geospatial analytics, historical envir
