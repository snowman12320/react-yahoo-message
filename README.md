# React Yahoo Messenger

A Yahoo Messenger simulation project built with React + Vite + TypeScript.

## 🎉 Features

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast and flexible frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework.
- **ESLint** - A pluggable static code analysis tool for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes automatically.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.
- **LIFF (LINE Front-end Framework)** - A framework for developing web apps in LINE.

## ⚙️ Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager)

## 🚀 Getting Started

Follow these steps to get started with the React Yahoo Messenger template:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-yahoo-message.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-yahoo-message
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## 📜 Available Scripts

- `pnpm dev` - Starts the development server.
- `pnpm build` - Builds production-ready code.
- `pnpm lint` - Runs ESLint to analyze and check code.
- `pnpm preview` - Starts the Vite development server in preview mode.
- `pnpm deploy` - Deploys to GitHub Pages.

## 📂 Project Structure

The project structure follows a standard React application layout:

```
react-yahoo-message/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadcn/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── .eslintrc.json     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.js # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```