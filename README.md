# Portfolio Project

## Overview
A modern, responsive personal portfolio built with **React**, **Vite**, **Framer Motion**, and **Three.js**. It showcases an animated hero section, interactive 3D avatar, skill visualizations, and a clean UI with a cyber‑punk/glassmorphism design.

## Tech Stack
- **React 18** (hooks, functional components)
- **Vite** – fast dev server & bundler
- **Framer Motion** – declarative animations
- **Three.js** & **@react-three/fiber** – 3D avatar rendering
- **Tailwind‑like custom CSS** with glass‑morphism, gradients and blur effects
- **ESLint** – linting with React Hooks & Vite plugins
- **Prettier** – code formatting (optional)

## Prerequisites
- Node.js (>=18) and npm (or pnpm/yarn)
- A modern browser that supports ES modules

## Getting Started (Development)
```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies (npm is used here, pnpm/yarn work as well)
npm install

# Run the development server
npm run dev
```
The app will be available at `http://localhost:5173` (or the port Vite chooses).

## Build for Production
```bash
npm run build   # creates an optimized static bundle in /dist
npm run preview # preview the built site locally
```

## Deployment Options
| Platform | Commands | Notes |
|----------|----------|-------|
| **Vercel** | Connect the repo, set `npm install && npm run build` as the build command. Vercel auto‑detects Vite. |
| **Netlify** | `Build command: npm run build`<br>`Publish directory: dist/` |
| **GitHub Pages** | Use the `gh-pages` package or `npm run deploy` script (add a script if needed). |
| **Firebase Hosting** | `npm install -g firebase-tools`<br>`firebase init` (choose Hosting, set `dist` as public folder)<br>`firebase deploy` |
| **Docker** | ```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
``` |

## Environment Variables (if needed)
Create a `.env` at the project root:
```
VITE_API_BASE=https://your.api.endpoint
```
Add any required variables prefixed with `VITE_` for Vite to expose them.

## Scripts Overview
- `dev` – start Vite dev server
- `build` – production build
- `preview` – preview the production build locally
- `lint` – run ESLint (`npm run lint`)
- `format` – run Prettier (`npm run format`)

## Linting & Formatting
```bash
npm run lint     # shows lint errors
npm run format   # fixes formatting automatically
```
ESLint config lives in `eslint.config.js` and already includes React Hooks and Vite recommendations.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Make your changes and ensure lint passes.
4. Submit a Pull Request with a clear description.

## License
This project is open‑source and available under the **MIT License**.
