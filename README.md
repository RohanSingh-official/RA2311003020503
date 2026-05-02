# Campus Hiring Evaluation - Backend (RA2311003020503)

This repository contains the backend implementation for the Campus Hiring Evaluation. It consists of two main microservices and a logging middleware, structured as per the mandatory requirements.

## Project Structure

- **[Logging Middleware/](file:///c:/Users/rohan/Downloads/RA2311003020503/Logging%20Middleware)**: Standalone middleware for request logging and performance tracking.
- **[Backend Test Submission/](file:///c:/Users/rohan/Downloads/RA2311003020503/Backend%20Test%20Submission)**: Main backend application containing the microservices.
  - `app.js`: Entry point.
  - `auth.js`: Handles server registration and JWT authentication.
  - `services/`: Implementation of the required endpoints.
- **[Screenshots/](file:///c:/Users/rohan/Downloads/RA2311003020503/Screenshots)**: Visual proof of endpoint execution and server health.

## Microservices Overview

### 1. Vehicle Maintenance Scheduler
- `/depot`: Fetches campus depot maintenance status.
- `/vehicles`: Lists vehicles requiring maintenance with priority levels.

### 2. Campus Notifications
- `/notifications`: Retrieves campus-wide alerts and system updates.

## Setup & Execution

1. Navigate to the `Backend Test Submission` directory.
2. Run `npm install` to install dependencies (Express, Axios, etc.).
3. Configure the `.env` file using the provided `.env.example`.
4. Run `npm start` to launch the server on port 3000.
5. Use the `test-endpoints.js` script to verify all services.

## Anonymity & Security
- All sensitive credentials are kept in local `.env` files (excluded via `.gitignore`).
- No personal identifiers are present in the source code or package metadata.
