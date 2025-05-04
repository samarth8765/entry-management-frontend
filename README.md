# Entry Management Frontend

A modern web application for managing entries, built with React, TypeScript, and Tailwind CSS.

## Live Demo

The application is deployed and available at: [https://entry-management-frontend.vercel.app/](https://entry-management-frontend.vercel.app/)

## Features

- Modern and responsive user interface
- Built with React 19 and TypeScript
- Styled with Tailwind CSS
- Client-side routing with React Router
- Type-safe development experience

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Package Manager:** Bun
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Bun package manager (npm install -g bun)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/samarth8765/entry-management-frontend.git
cd entry-management-frontend
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
VITE_API_URL=https://your-backend-url.com/api
```

4. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run ESLint to check code quality

## Environment Configuration

The application requires the following environment variables:

- `VITE_API_URL`: The URL of your backend API server

- Create a `.env` file in the root directory and set these variables. For development, you can create a `.env.development` file, and for production, use `.env.production`.

Example `.env` file:
```env
VITE_API_URL=https://your-backend-url.com/api/v1
```

