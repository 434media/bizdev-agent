# BizDev Agent 🤖

An AI-powered sales automation tool that transforms manual prospect research into an intelligent, streamlined workflow. Built with Next.js, the Vercel AI SDK, and Apollo.io to help sales and marketing teams generate high-quality leads with personalized outreach.

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

The BizDev Agent is an AI-powered sales automation tool designed specifically for sales and marketing professionals who need to research prospects and create personalized outreach at scale. Unlike generic lead generation tools, this agent understands **your company's** products, value propositions, and recent wins to create highly relevant, contextual outreach emails.

The tool integrates seamlessly with your existing sales stack (Airtable CRM and Mailchimp) to enhance your current workflow rather than replace it. By combining Apollo.io's comprehensive B2B database with AI-powered personalization, sales teams can focus on building relationships instead of manual research and email crafting.

## What This Application Does

The BizDev Agent automates prospect research and outreach for sales and marketing teams:

### Core Workflow:
1. **Sales person inputs prospect company URL** → System researches the prospect company
2. **Apollo.io enrichment** → Discovers decision makers, company signals, and contact data  
3. **AI analysis with your company context** → Matches prospect needs with your solutions
4. **Personalized email generation** → Creates contextual outreach positioning your value prop
5. **Airtable CRM logging** → Saves lead with fit scoring and next steps to your existing CRM
6. **Mailchimp sync** → Adds prospect to your marketing sequences for follow-up

### Perfect For:
- **Sales Development Representatives (SDRs)** doing cold outreach
- **Business Development Managers** identifying partnership opportunities  
- **Marketing teams** running account-based marketing campaigns
- **Sales teams** at B2B companies who need to scale personalized outreach
- **Startups** looking to automate their sales prospecting process

### What Makes This Different:
- **Company-aware AI**: Knows your products, recent wins, and value propositions
- **Fit scoring**: Rates how good a prospect is for your specific business (1-10)
- **Signal-based timing**: Uses funding, hiring, and growth signals for optimal outreach
- **Existing tool integration**: Works with Airtable and Mailchimp you already use
- **Quality over quantity**: Generates fewer, higher-quality leads vs. spray-and-pray

## ✨ Key Features

### 🎯 **Intelligent Prospect Research**
- **Apollo.io Integration**: Access to 275M+ contacts and comprehensive company data
- **Decision Maker Discovery**: Automatically identifies key contacts (CEOs, CTOs, VPs, Directors)
- **Company Signals**: Detects funding rounds, hiring activity, tech stack, and growth indicators
- **Pain Point Analysis**: Identifies likely challenges based on company data and job postings

### 🧠 **Company-Aware AI Personalization**
- **Your Company Context**: AI knows your products, services, recent wins, and case studies
- **Smart Value Prop Matching**: Positions your solutions against prospect's specific needs
- **Signal-Based Timing**: Uses funding, hiring, and growth signals for relevant messaging
- **Industry-Specific**: Tailors communication based on prospect's industry and company size

### 🔗 **Seamless CRM Integration**
- **Airtable CRM**: Structured lead logging with fit scores and next steps
- **Lead Scoring**: AI-powered qualification scoring (1-10) based on your ideal customer profile
- **Activity Tracking**: Logs research, outreach, and follow-up activities
- **Team Collaboration**: Multiple sales people can use with shared company context

### ⚡ **Productivity Features**
- **Real-time Streaming**: Live updates during AI processing
- **Mailchimp Sync**: One-click addition to marketing sequences
- **Batch Processing**: Handle multiple prospects efficiently
- **Gmail Integration**: Direct draft creation and `/generateLead` slash commands (coming soon)

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS + shadcn/ui** - Utility-first styling and beautiful UI components

### AI & Data
- **Vercel AI SDK Core** - Streamlined AI integration with tool calling and structured outputs
- **OpenAI GPT-4** - Language model for intelligent email generation and prospect analysis
- **Apollo.io API** - B2B contact and company data enrichment
- **Zod** - Schema validation for type-safe AI outputs

### Integrations & Infrastructure
- **Supabase** - Database for lead storage, user management, and real-time updates
- **Airtable API** - Integration with existing CRM workflows
- **Gmail API** - Email draft creation and slash commands
- **Mailchimp API** - Marketing automation and list segmentation
- **Vercel** - Hosting, deployment, and serverless functions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm/npm/yarn
- Apollo.io API key
- OpenAI API key
- Airtable API key (for CRM integration)
- Mailchimp API key (optional)
- Google Cloud credentials for Gmail API (optional)

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd bizdev-agent
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root of your project:

```env
# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key

# Apollo.io
APOLLO_API_KEY=your_apollo_api_key

# Airtable (CRM Integration)
AIRTABLE_API_KEY=pat_your_airtable_api_key
AIRTABLE_BASE_ID=app_your_airtable_base_id

# Mailchimp (Marketing Integration)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_mailchimp_list_id

# Gmail (Optional - for draft creation)
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
```

### 3. Configure Company Context
Update `lib/company-context.ts` with your company's information:
- Products and services
- Value propositions
- Recent wins and case studies
- Target industries
- Sales person details

### 4. Run the Application
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application running.

## 🎯 Project Goals & Scope (For Interns)

This project provides hands-on experience with modern full-stack development, AI integration, and real-world sales automation tools.

### Team Structure
You are part of a 3-person development team building a production-ready sales tool. Focus on collaboration, code quality, and user experience.

### Core Deliverables (MVP)
Your primary goal is to deliver a functional sales automation tool with these features:

- ✅ **Prospect Research Interface**: Clean UI to input company URLs and view enriched data
- ✅ **Apollo.io Integration**: Successfully fetch company and contact data
- ✅ **AI-Powered Email Generation**: Generate personalized emails with company context
- ✅ **Fit Scoring**: Rate prospects on a 1-10 scale based on your ideal customer profile
- ✅ **CRM Integration**: Log leads to Airtable with proper data structure
- ✅ **Real-time Streaming**: Stream AI responses for better user experience
- ✅ **Error Handling**: Graceful handling of API failures and edge cases

### Stretch Goals
If your team completes the MVP ahead of schedule:

- [ ] **Company Context Management**: Admin interface to configure company information
- [ ] **Gmail Chrome Extension**: Build the `/generateLead` slash command
- [ ] **Advanced Lead Scoring**: Customizable scoring rules based on company criteria
- [ ] **Team Collaboration**: Multi-user support with role-based access
- [ ] **Analytics Dashboard**: Track email performance and lead conversion rates
- [ ] **Email Template Library**: Pre-built templates for different industries

## 🔄 Development Workflow & Guidelines

### Git Workflow
- **Feature Branches**: Create branches from `main` for each feature (e.g., `feature/apollo-integration`)
- **Descriptive Commits**: Write clear commit messages explaining what and why
- **Pull Requests**: All changes go through PR review - no direct pushes to `main`
- **Stay Updated**: Regularly pull latest changes: `git pull origin main`

### Code Quality Standards
- **TypeScript**: Use proper typing throughout the application
- **Error Handling**: Implement comprehensive error handling for all API calls
- **User Experience**: Focus on loading states, error messages, and responsive design
- **Performance**: Optimize API calls and implement proper caching strategies

### Code Review Process
- **Knowledge Sharing**: Use reviews to learn and teach best practices
- **Timely Reviews**: Review teammates' PRs promptly to avoid blocking progress
- **Test Your Changes**: Ensure your code works before requesting review

### Communication
- **GitHub Issues**: Track bugs, features, and technical debt
- **Documentation**: Update README and code comments as you build

## 🏗️ Architecture Overview

```
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│  Sales Person   │   │   Next.js API    │   │  Apollo.io API   │   │  Company Context│
│                 │──▶│                  │──▶│                  │──▶│                 │
│ (Prospect URL)  │   │(AI Orchestration)│   │ (Data Enrichment)│   │ (Your Company)  │
└─────────────────┘   └──────────────────┘   └──────────────────┘   └─────────────────┘
                                                      │                        │
                                                      ▼                        ▼
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│   Mailchimp     │◀──│   Airtable CRM   │◀──│  AI Email Draft  │◀──│  OpenAI GPT-4   │
│                 │   │                  │   │                  │   │                 │
│ (Marketing)     │   │ (Lead Storage)   │   │ (Personalized)   │   │ (Analysis)      │
└─────────────────┘   └──────────────────┘   └──────────────────┘   └─────────────────┘
```

### Key Components:
1. **Frontend**: Next.js dashboard for sales team interaction
2. **AI Orchestration**: Vercel AI SDK coordinating multiple API calls
3. **Data Enrichment**: Apollo.io for prospect company and contact data
4. **Company Context**: Your company's products, value props, and case studies
5. **AI Analysis**: OpenAI GPT-4 for fit scoring and email personalization
6. **CRM Integration**: Airtable for lead storage and workflow management
7. **Marketing Integration**: Mailchimp for follow-up campaign automation

## 🔧 Configuration

### Company Context Setup
The most important configuration is setting up your company context in `lib/company-context.ts`:

```typescript
export const companyContext = {
  company: {
    name: "Your Company Name",
    description: "What your company does",
    valuePropositions: ["Key benefit 1", "Key benefit 2"],
    targetIndustries: ["SaaS", "E-commerce", "Manufacturing"],
    recentNews: ["Recent funding", "Product launch", "Award won"]
  },
  products: [{
    name: "Your Product",
    description: "What it does",
    targetAudience: "Who uses it",
    keyBenefits: ["Benefit 1", "Benefit 2"]
  }],
  salesPerson: {
    name: "Your Name",
    title: "Your Title",
    email: "your@email.com"
  }
}
```

### Airtable CRM Setup
Configure your Airtable base with these fields:
- Company Name (Single line text)
- Company Domain (Single line text)
- Industry (Single select)
- Primary Contact (Single line text)
- Contact Email (Email)
- Lead Score (Number, 1-10)
- Status (Single select: New Lead, Contacted, Qualified, etc.)
- Next Steps (Long text)
- Created Date (Date)

### AI Prompt Customization
Modify the AI prompts in `app/api/generate-lead/route.ts` to match your sales approach and company voice.

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to a GitHub repository
2. Create a new project on Vercel and connect it to your repository
3. Add all environment variables from your `.env.local` file to Vercel project settings
4. Deploy! Vercel will automatically build and deploy your application

### Environment Variables Checklist
Ensure all these are set in your Vercel deployment:
- [ ] `OPENAI_API_KEY`
- [ ] `APOLLO_API_KEY`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `AIRTABLE_API_KEY`
- [ ] `AIRTABLE_BASE_ID`
- [ ] `MAILCHIMP_API_KEY` (optional)
- [ ] `MAILCHIMP_LIST_ID` (optional)

## 🆘 Mentorship & Support

Don't hesitate to ask questions, seek clarification, or request help if you get stuck. This is a learning experience, and asking questions is part of the process.

### Getting Help:
- **Technical Issues**: Create a GitHub issue with detailed description
- **Code Reviews**: Tag team members for feedback on your PRs
- **API Integration**: Check the documentation links in this README

### Learning Resources:
- [Vercel AI SDK Documentation](https://sdk.vercel.ai)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Apollo.io API Documentation](https://apolloio.github.io/apollo-api-docs/)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)

## 👥 Team

- **Brandon** - Developer
- **Michael** - Developer  
- **Audrey** - Developer

---

**Built with ❤️ using [Vercel AI SDK](https://sdk.vercel.ai) and [Next.js](https://nextjs.org)**

*Transform your sales process with AI-powered prospect research and personalized outreach.*