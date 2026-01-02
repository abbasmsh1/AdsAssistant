# Google Ads Assistant

A senior-level digital marketing strategist agent powered by LangChain and Mistral AI, featuring an interactive 3D frontend.

## Features
- **Senior Marketing Identity**: Agent acts as a strategist with 8+ years of experience.
- **Tool-Enabled**: Can analyze account overview, campaign metrics, search terms, and keywords.
- **Copy Generation**: Generates RSA-compliant Google Ads copy.
- **Reporting**: Creates plain-English weekly performance summaries.
- **Interactive UI**: Responsive frontend with Spline 3D scenes, Spotlight effects, and a Vercel v0 style chat.

## Project Structure
- `/backend`: FastAPI server with LangChain agent and Mistral AI.
- `/frontend`: React + Vite + Tailwind CSS + shadcn/ui.

## Setup

### Backend
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate venv: `.\venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. Install dependencies: `pip install -r requirements.txt`
5. Create `.env` from `.env.example` and add your `MISTRAL_API_KEY`.
6. Run: `python main.py`

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Deployment
Configured for deployment on **Vercel** with a unified `vercel.json`.
To deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the root directory.
