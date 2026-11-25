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

# Building a Real-Time Air Quality Monitoring Pipeline for Hyderabad Using OpenAQ and PostgreSQL

Air quality data is useful only when it can be collected reliably, stored consistently, and presented in a way that people can understand. This project explores how to build an end-to-end environmental data pipeline that collects air quality measurements from Hyderabad, validates incoming records, identifies unusual readings, and makes the results accessible through a dashboard.

The system uses the **OpenAQ API v3** as its external data source and combines Python, PostgreSQL, SQLAlchemy, Streamlit, and GitHub Actions to manage the data workflow.

The goal was not just to display air quality measurements. It was to build a structured data engineering workflow that supports reliable ingestion, historical storage, data quality checks, and anomaly detection.

## What This Case Study Covers

- **Data Collection:** Retrieve air quality measurements reliably from an external data source.
- **Data Quality:** Validate incoming records, clean inconsistent values, and handle measurement units.
- **Data Consistency:** Prevent repeated measurements from creating duplicate database entries.
- **Historical Analysis:** Store measurements with their corresponding station, sensor, and timestamp relationships.
- **Anomaly Detection:** Identify unusual measurement patterns using a rolling Median Absolute Deviation approach.
- **Visualization:** Present collected measurements and analysis through a Streamlit dashboard.
- **Automation:** Use GitHub Actions to run and monitor the data workflow.

## 1. The Problem

Environmental monitoring systems produce measurements from multiple monitoring stations and sensors. Working with these measurements creates several engineering challenges.

First, the data must be retrieved from an external API. Network failures, unavailable responses, and changes in returned data can affect ingestion.

Second, incoming records need validation. Missing values, inconsistent formats, and measurement units can make the data difficult to analyze.

Third, repeated API requests may return measurements that have already been stored. Without suitable duplicate handling, the database can accumulate repeated records.

Finally, historical measurements need to remain connected to the correct monitoring station and sensor so that trends and unusual patterns can be analyzed over time.

This project addresses these challenges through a structured pipeline.

## 2. Data Source: OpenAQ API v3

The project uses **OpenAQ API v3** to retrieve air quality information.

OpenAQ provides access to air quality measurements collected from monitoring locations and sensors. The API makes it possible to retrieve information about locations, sensors, and their associated measurements.

The pipeline uses this information to organize the collected data for further processing.

The main data entities are:

- **Stations:** Monitoring locations from which measurements are reported.
- **Sensors:** Individual measurement sources associated with monitoring locations.
- **Measurements:** Recorded pollutant values with timestamps and measurement units.

Official API documentation: https://docs.openaq.org/

## 3. System Architecture

The project follows an end-to-end data engineering workflow.

1. **Data Source:** OpenAQ API v3 provides monitoring information and measurements.
2. **Ingestion:** Python retrieves the required information from the API.
3. **Validation:** Incoming records are checked and prepared for storage.
4. **Anomaly Detection:** A rolling MAD method is used to identify unusual measurement patterns.
5. **Database:** SQLAlchemy manages database operations, with PostgreSQL used for production storage and SQLite available as a fallback.
6. **Dashboard:** Streamlit presents the collected data and analysis.
7. **Automation:** GitHub Actions runs and monitors the workflow.

## 4. Technology Stack

| Technology | Purpose |
| --- | --- |
| Python | Data ingestion and processing |
| OpenAQ API v3 | External air quality data source |
| Pandas | Data manipulation and analysis |
| SQLAlchemy | Database interaction |
| PostgreSQL | Production database |
| SQLite | Local database fallback |
| Streamlit | Interactive dashboard |
| GitHub Actions | Workflow automation |
| Pytest | Automated testing |

Each component has a specific responsibility, keeping the system organized and easier to maintain.

## 5. Data Ingestion

The ingestion layer retrieves data from OpenAQ API v3 and prepares it for processing.

The main responsibilities include:

- Requesting data from the API.
- Processing the returned response.
- Extracting station and sensor information.
- Retrieving available measurements.
- Preparing records for validation and storage.
- Handling unsuccessful or incomplete requests.

Separating ingestion from later processing makes it easier to identify where a problem occurs in the pipeline.

## 6. Data Validation and Cleaning

Data quality is an important part of any data engineering project.

Before storing measurements, the pipeline applies validation and cleaning checks to incoming records.

The process focuses on:

- Checking whether required fields are available.
- Handling missing or malformed records.
- Validating measurement values.
- Maintaining appropriate measurement units.
- Preparing timestamps and other fields for consistent storage.

These checks help prevent invalid records from affecting historical analysis and dashboard results.

## 7. Database Design and Storage

The database is responsible for maintaining the relationship between monitoring stations, sensors, and measurements.

The project uses SQLAlchemy to manage database operations.

**PostgreSQL** is used for production storage, while **SQLite** provides a fallback option for local execution.

The main entities are:

- **Station:** Stores monitoring location information.
- **Sensor:** Stores sensor information associated with a station.
- **Measurement:** Stores recorded values, timestamps, and measurement details.

Maintaining these relationships makes it possible to retrieve historical measurements in the context of their original station and sensor.

The pipeline also handles repeated measurements to reduce duplicate database entries.

## 8. Anomaly Detection Using Rolling MAD

A normal data validation process checks whether a record is structurally acceptable. However, a valid measurement can still be unusual compared with previous observations.

To address this, the project uses **Rolling Median Absolute Deviation (MAD)** for anomaly detection.

MAD is a robust statistical measure of how far observations are spread around their median.

### How MAD Works

The median of a group of observations is calculated first.

Next, the absolute difference between each observation and the median is calculated.

The median of those absolute differences gives the MAD value.

The formula is:

**MAD = median(|xᵢ − median(X)|)**

A modified Z-score can then be calculated:

**Modified Z-score = 0.6745 × (x − median(X)) / MAD**

The project uses a rolling approach so that a measurement can be evaluated against a historical window rather than against the entire dataset.

### Why Use Rolling MAD?

- It uses the median, which is less affected by extreme observations than the mean.
- It can identify values that differ significantly from recent historical behavior.
- It supports analysis of changing measurement patterns over time.
- It provides a statistical method for flagging potentially unusual readings.

The documented project configuration uses a threshold greater than **3.5** and requires at least **48 historical observations** for anomaly evaluation.

An anomaly flag indicates an unusual measurement pattern. It does not, by itself, prove that the measurement is incorrect or that an environmental event has occurred.

## 9. Streamlit Dashboard

The Streamlit dashboard provides a visual interface for exploring the collected air quality data.

It helps present information from the underlying pipeline without requiring users to inspect raw database records.

The dashboard is part of the project's visualization layer and connects the data processing workflow with a more accessible way to explore the results.

## 10. Workflow Automation with GitHub Actions

Manual execution is not ideal for a pipeline that needs repeated data collection and validation.

The project uses **GitHub Actions** to automate and monitor workflow execution.

The automation supports:

- Running the configured pipeline workflow.
- Monitoring workflow execution.
- Identifying unsuccessful runs.
- Maintaining a record of workflow results.

Automation makes the workflow easier to execute consistently and monitor through the repository.

## 11. Project Results

The following figures are from a documented historical project snapshot covering **October 11–14, 2026**. They should be understood as results from that reporting period, not as live air quality statistics.

| Metric | Recorded Result |
| --- | --- |
| Monitoring stations | 21 |
| Sensors | 273 |
| Telemetry records | 10,262 |
| Total rows processed | 10,717 |
| Invalid or malformed records | 0 |
| Missing/rejection rate | 0.00% |
| Detected anomalies | 148 |
| GitHub Actions workflow runs | 3 |
| Workflow success rate | 100% |
| Automated tests passed | 27 |

The results demonstrate that the pipeline processed data from multiple monitoring stations and sensors, performed validation, identified unusual observations, and passed the documented automated tests.

The 148 detected anomalies are statistical flags produced by the configured detection method. They should not be interpreted as 148 confirmed pollution incidents.

## 12. Testing and Reliability

Automated testing helps verify that the pipeline behaves as expected.

The project README records **27 passing tests**.

Testing is important because errors in ingestion, validation, database operations, or anomaly detection can affect the reliability of the final results.

The documented test result provides evidence that the tested components passed during that project snapshot. It does not guarantee that every possible API response or production failure scenario has been tested.

## 13. Engineering Challenges

Several practical engineering concerns shaped the implementation.

**External API dependency:** The pipeline depends on data provided by an external service. API availability and response quality can affect ingestion.

**Data quality:** Incoming records require validation before they can be used for analysis.

**Duplicate handling:** Repeated measurements must be managed carefully to avoid unnecessary duplicate records.

**Historical relationships:** Measurements need to remain associated with the correct station, sensor, and timestamp.

**Anomaly interpretation:** Statistical outliers need to be treated as signals for further investigation rather than automatically classified as errors.

These challenges demonstrate why a reliable monitoring system requires more than simply fetching and displaying data.

## 14. Future Improvements

There are several ways the project could be extended:

- Add more monitoring locations and support additional regions.
- Improve API failure handling and retry behavior.
- Add more detailed historical trend analysis.
- Introduce configurable anomaly detection thresholds.
- Improve dashboard filtering and comparison features.
- Add monitoring and alerting for failed pipeline executions.
- Expand automated tests for additional API and data-quality scenarios.

These are potential improvements, not features claimed as already implemented.

## 15. What I Learned

Building this project helped me understand how different data engineering components work together in a practical application.

Some of the key learning areas were:

- Working with an external API to collect real-world data.
- Structuring an ingestion and validation pipeline.
- Managing relational data using PostgreSQL and SQLAlchemy.
- Understanding the importance of duplicate handling.
- Applying robust statistical techniques such as rolling MAD.
- Presenting processed data through a Streamlit dashboard.
- Automating workflows with GitHub Actions.
- Testing individual components of a data pipeline.

The project also reinforced an important lesson: data quality and reliable storage are just as important as the analysis performed on top of the data.

## Conclusion

The Hyderabad Air Quality Monitor demonstrates an end-to-end approach to collecting, processing, storing, analyzing, and visualizing environmental measurements.

By combining OpenAQ API v3, Python, PostgreSQL, SQLAlchemy, rolling MAD anomaly detection, Streamlit, and GitHub Actions, the project brings several data engineering concepts together in one practical system.

The main focus is not simply displaying air quality values. It is building a structured workflow that makes collected data easier to validate, store, investigate, and understand.

## Project Links

- **GitHub Repository:** https://github.com/mahendravelagupudi099-wq/hyderabad-air-quality-monitor
- **Live Dashboard:** https://hyderabad-air-quality-monitor.streamlit.app/
- **OpenAQ API Documentation:** https://docs.openaq.org/
