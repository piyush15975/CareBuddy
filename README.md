# 🩺 CareBuddy - AI-Powered Healthcare Assistant

<div align="center">

![CareBuddy](https://img.shields.io/badge/CareBuddy-AI%20Healthcare-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=for-the-badge&logo=postgresql)

**Transform Healthcare Through Intelligent Voice Technology**

A full-stack AI SaaS application that enables users to interact with virtual medical specialists using real-time voice input. The platform provides personalized medical consultations, intelligent symptom analysis, and comprehensive medical reports powered by advanced AI models.

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
- [Key Components](#-key-components)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

CareBuddy is an innovative healthcare platform that bridges the gap between patients and healthcare providers through AI-powered voice interactions. The application allows users to:

- **Voice-Based Consultations**: Interact with AI medical specialists using natural voice conversations
- **Intelligent Diagnosis**: Receive AI-powered symptom analysis and medical guidance
- **Specialist Matching**: Get matched with appropriate medical specialists based on symptoms
- **Medical Reports**: Generate comprehensive medical session reports automatically
- **Session History**: Track and review all past consultations

The platform uses cutting-edge AI models (Google Gemini) to understand patient symptoms, provide medical insights, and generate detailed reports that can assist healthcare professionals in making informed decisions.

---

## ✨ Features

### 🎙️ Real-Time Voice Interaction
- **Voice-to-Text Conversion**: Seamless speech recognition using Vapi AI
- **Natural Language Processing**: Understands conversational medical queries
- **Real-Time Responses**: Instant AI-powered medical guidance

### 🧠 AI-Powered Medical Intelligence
- **Symptom Analysis**: Advanced AI models analyze patient symptoms
- **Medical Report Generation**: Automated generation of comprehensive session reports
- **Contextual Understanding**: Maintains conversation context throughout sessions


---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │  Medical     │      │
│  │    Page      │  │              │  │  Agent Chat  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Middleware  │  │  API Routes  │  │  Components  │      │
│  │  (Clerk)     │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Clerk      │  │  Google      │  │   Neon DB     │
│  Auth API    │  │  Gemini AI   │  │ (PostgreSQL) │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Data Flow

1. **User Authentication**: Clerk handles user sign-in/sign-up
2. **Session Creation**: User creates a new medical session with notes
3. **Doctor Matching**: AI suggests appropriate specialists based on symptoms
4. **Voice Interaction**: Vapi AI handles voice-to-text conversion
5. **AI Processing**: Google Gemini processes conversation and generates responses
6. **Report Generation**: AI generates comprehensive medical report
7. **Data Storage**: All data stored in Neon PostgreSQL database



---

## 📁 Project Structure

```
carebuddy/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes (route group)
│   │   ├── sign-in/            # Sign-in page
│   │   └── sign-up/            # Sign-up page
│   ├── (routes)/               # Protected routes (route group)
│   │   └── dashboard/          # Dashboard routes
│   │       ├── _components/    # Dashboard components
│   │       ├── history/        # Session history page
│   │       └── medical-agent/  # Medical agent chat interface
│   ├── api/                    # API routes
│   │   ├── medical-report/     # Medical report generation
│   │   ├── session-chat/       # Session management
│   │   ├── suggest-doctors/    # Doctor recommendation
│   │   └── users/              # User management
│   ├── _components/            # Shared app components
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── provider.tsx            # Context providers
│
├── components/                  # Reusable UI components
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── table.tsx
│       └── ...
│
├── config/                      # Configuration files
│   ├── db.tsx                  # Database connection
│   ├── schema.tsx              # Database schema
│   ├── gemmaModel.tsx          # Google Gemini config
│   └── OpenAiModel.tsx         # OpenAI config
│
├── context/                     # React contexts
│   └── UserDetailContext.tsx   # User context provider
│
├── lib/                         # Utility functions
│   └── utils.ts                # Helper utilities
│
├── shared/                      # Shared data/constants
│   └── list.tsx                # AI doctor agents list
│
├── public/                      # Static assets
│   ├── logo.webp
│   ├── favicon.png
│   └── doctor*.jpg             # Doctor profile images
│
├── middleware.ts                # Next.js middleware (auth)
├── drizzle.config.ts           # Drizzle ORM config
├── next.config.ts              # Next.js config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (or Neon account)
- Accounts for:
  - [Clerk](https://clerk.com) (Authentication)
  - [Google AI Studio](https://makersuite.google.com/app/apikey) (Gemini API)
  - [Neon](https://neon.tech) (Database) or any PostgreSQL provider
  - [Vapi AI](https://vapi.ai) (Voice interface)
  - [OpenRouter](https://openrouter.ai) (Optional, for OpenAI models)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sasaurabh11/CareBuddy.git
cd carebuddy
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_neon_postgresql_connection_string

# AI Models
GOOGLE_API_KEY=your_google_gemini_api_key
OPEN_ROUTER_API_KEY=your_openrouter_api_key

# Vapi AI (if using voice features)
VAPI_API_KEY=your_vapi_api_key
```

### 4. Database Setup

#### Using Drizzle Kit

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit push

# Or use migrate command
npx drizzle-kit migrate
```

#### Manual Setup

The database schema includes two main tables:

1. **users**: User information and credits
2. **sessionChatTable**: Medical session data, conversations, and reports

---

## ⚙️ Configuration

### Clerk Authentication Setup

1. Create an account at [Clerk](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Add them to `.env.local`

### Google Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to `.env.local` as `GOOGLE_API_KEY`

### Database Setup (Neon)

1. Create an account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to `.env.local` as `DATABASE_URL`

### Vapi AI Setup (Optional)

1. Sign up at [Vapi AI](https://vapi.ai)
2. Get your API key
3. Add it to `.env.local` as `VAPI_API_KEY`

---

### Running Migrations

```bash
# Generate migration files
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit push

# Or use migrate
npx drizzle-kit migrate
```

---

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```


---

## 💻 Development

### Code Structure

- **TypeScript**: Full type safety throughout the application
- **Server Components**: Default for better performance
- **Client Components**: Used only when interactivity is needed
- **API Routes**: Serverless functions for backend logic

### Best Practices

1. **Component Organization**: Group related components in `_components` folders
2. **Route Groups**: Use parentheses for route organization without affecting URLs
3. **Type Safety**: Leverage TypeScript for all components and API routes
4. **Error Handling**: Implement proper error boundaries and API error handling
5. **Loading States**: Use Suspense and loading states for better UX

### Adding New Features

1. Create components in appropriate directories
2. Add API routes in `app/api/`
3. Update database schema if needed
4. Run migrations
5. Update types and interfaces

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Ensure all environment variables are set in your deployment platform:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `GOOGLE_API_KEY`
- `OPEN_ROUTER_API_KEY`
- `VAPI_API_KEY`

### Database Migrations in Production

Run migrations before or during deployment:

```bash
npx drizzle-kit push
```

---

<div align="center">

**Made with ❤️ for better healthcare**

[⬆ Back to Top](#-carebuddy---ai-powered-healthcare-assistant)

</div>
