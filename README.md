# BizDev Agent 🤖

An AI-powered business development automation tool that transforms manual lead generation into an intelligent, streamlined workflow. Built with Next.js, the Vercel AI SDK, and Apollo.io.

## Table of Contents

- [Overview](#overview)
- [What This Application Does](#what-this-application-does)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Goals & Scope](#-project-goals--scope-for-interns)
- [Development Workflow](#-development-workflow--guidelines)
- [Architecture Overview](#-architecture-overview)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Mentorship & Support](#-mentorship--support)
- [Team](#-team)
- [License](#-license)

## Overview

The BizDev Agent is an AI-powered tool designed to automate and enhance the business development process. It transforms the manual, time-consuming task of lead generation into an intelligent, efficient, and streamlined workflow. By integrating with powerful data sources like Apollo.io and leveraging AI for personalization, the agent helps sales and business development teams identify high-quality leads, craft personalized outreach, and sync data seamlessly with their CRM and marketing platforms.

This project aims to boost productivity, improve the quality of outreach, and allow teams to focus on building relationships rather than on manual data entry and research.

## What This Application Does

The BizDev Agent automates the entire lead generation and outreach process:

1.  **Input a company URL** → Get comprehensive company and contact data from Apollo.io.
2.  **AI Enrichment** → Identify key decision-makers and relevant company signals (e.g., funding, hiring).
3.  **Personalized Emails** → Generate context-aware outreach emails based on real-time data.
4.  **CRM Integration** → Automatically log new leads and interactions into Airtable.
5.  **Marketing Sync** → Add contacts to designated Mailchimp segments with a single click.

### Perfect For:
- Sales & Business Development teams
- Startups looking to scale outreach efforts
- Marketing teams running account-based campaigns
- Recruiters sourcing potential candidates
- Anyone who wants to automate lead generation

## ✨ Key Features

- 🔍 **Intelligent Data Enrichment**: Access 275M+ contacts via Apollo.io, discover key decision-makers, and detect company signals like funding rounds and tech stacks.
- 🧠 **AI-Powered Personalization**: Generate context-aware emails that leverage company signals for timely and relevant messaging tailored to different contacts.
- 🔗 **Seamless Integrations**: Works with Airtable for CRM logging, Gmail for direct draft creation, and Mailchimp for marketing campaigns.
- ⚡ **Productivity Features**: Use slash commands in Gmail, process leads in batches, and get real-time streaming updates during generation.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS + shadcn/ui** - Utility-first styling and UI components

### AI & Data
- **Vercel AI SDK** - Streamlined AI integration and LLM orchestration
- **OpenAI GPT-4** - Language model for intelligent email generation
- **Apollo.io API** - Company and contact data enrichment
- **Zod** - Structured, type-safe outputs from the LLM

### Integrations & Infrastructure
- **Airtable API** - CRM and lead logging
- **Gmail API** - Email draft creation and slash commands
- **Mailchimp API** - Marketing automation and list segmentation
- **Vercel KV** - Caching for performance
- **Vercel** - Hosting, deployment, and serverless functions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm/npm/yarn
- Apollo.io API key
- OpenAI API key
- Airtable Account and API key
- Mailchimp API key
- Google Cloud credentials for Gmail API

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd bizdev-agent
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Apollo.io
APOLLO_API_KEY=your_apollo_api_key

# Airtable
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=your_airtable_table_name

# Mailchimp
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=your_mailchimp_server_prefix
MAILCHIMP_LIST_ID=your_mailchimp_list_id

# Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application running.

## 🎯 Project Goals & Scope (For Interns)

This project is designed to provide hands-on experience with modern full-stack development, AI integration, and collaborative software engineering practices.

### Team Structure
You are part of a 3-person team responsible for developing this full-stack application. Collaboration, communication, and code quality are paramount.

### Core Deliverables (MVP)
Your primary goal is to deliver a functional version with these core features:

- ✅ **Web Interface**: A UI to input a company URL and view enriched data.
- ✅ **AI Email Generation**: Generate a personalized email based on the data.
- ✅ **Real-time Streaming**: Stream AI-generated content for a better user experience.
- ✅ **Airtable Integration**: Successfully log the generated lead to an Airtable base.
- ✅ **Error Handling**: Implement user-friendly error messages for API failures.

### Stretch Goals
If your team completes the MVP ahead of schedule:

- [ ] **Mailchimp Integration**: Add one-click sync to a Mailchimp segment.
- [ ] **Batch Processing**: Allow users to input multiple URLs at once.
- [ ] **Lead Scoring**: Implement an AI-powered lead qualification score.
- [ ] **Gmail Integration**: Implement the `/generateLead` slash command.

## 🔄 Development Workflow & Guidelines

### Git Workflow
- **Feature Branches**: Create new branches from `main` for each feature (e.g., `feature/add-airtable-sync`).
- **Small, Atomic Commits**: Make frequent commits with clear, descriptive messages.
- **Pull Requests (PRs)**: All changes must be submitted through a PR to the `main` branch. Do not push directly to `main`.
- **Stay Updated**: Always run `git pull origin main` to get the latest changes before starting new work.

### Code Review Process
- **Constructive Feedback**: Focus on improving code quality, readability, and performance.
- **Be Prompt**: Review your teammates' PRs in a timely manner to avoid blocking them.
- **Learn and Share**: Use code reviews as an opportunity to learn from and teach each other.

### Communication
- **Daily Stand-ups**: Briefly share your progress, any blockers, and your plan for the day.
- **GitHub Issues**: Use issues to track bugs, feature requests, and other tasks.

## 🏗️ Architecture Overview

```
┌───────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌────────────────┐
│   User Input  │   │   Next.js API    │   │  Data Enrichment │   │ AI Generation  │
│               │──▶│                  │──▶│                  │──▶│                │
│ (Company URL) │   │ (Server Function)│   │   (Apollo.io)    │   │ (OpenAI GPT-4) │
└───────────────┘   └──────────────────┘   └──────────────────┘   └────────────────┘
                                                                         │
                                                                         ▼
┌───────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌────────────────┐
│   Marketing   │◀──│   CRM Logging    │◀──│  Email Creation  │◀──│  Final Output  │
│               │   │                  │   │                  │   │                │
│  (Mailchimp)  │   │   (Airtable)     │   │    (Gmail)       │   │ (Personalized) │
└───────────────┘   └──────────────────┘   └──────────────────┘   └────────────────┘
```

## 🔧 Configuration

All configuration is managed through environment variables in the `.env.local` file. Ensure you have obtained all the necessary API keys and IDs from the respective services.

To customize the AI's behavior, you can modify the system prompt passed to the language model in the relevant API route where the AI SDK is used.

## 🚀 Deployment

### Deploy to Vercel
1.  Push your code to a GitHub repository.
2.  Create a new project on Vercel and connect it to your repository.
3.  Add all the environment variables from your `.env.local` file to the Vercel project settings.
4.  Deploy! Vercel will automatically build and deploy your application.


## 🆘 Mentorship & Support

Don't hesitate to ask questions, seek clarification, or request help if you get stuck.

## 👥 Team

- **Brandon** - Developer
- **Michael** - Developer
- **Audrey** - Developer
- **Jesse** - 434 MEDIA Mentor & Technical Lead

---

Built with ❤️ using [Vercel AI SDK](https://sdk.vercel.ai) and [Next.js](https://nextjs.org)
