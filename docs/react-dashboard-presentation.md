# React dashboard presentation walkthrough

Use this outline for a short screen recording. Start in the repository, show the running dashboard, and finish with the setup commands.

## 1. Introduce the project

“Travel Analyst helps travel teams understand package performance and prioritize opportunities using bookings, revenue, satisfaction, and conversion signals.”

## 2. Walk through the project structure

Show the repository tree and point out:

- `client/package.json` and `client/package-lock.json`: React/React DOM runtime dependencies, Vite and the React plugin, scripts, and locked versions.
- `client/index.html`: the browser entry page, `root` element, and module script.
- `client/vite.config.js`: Vite's React plugin configuration.
- `client/src/main.jsx`: checks for the root element, creates the React root, and renders the app in `StrictMode`.
- `client/src/App.jsx`: composes the dashboard from reusable components and manages page interactions.
- `client/src/data.js`: sample KPI, package, revenue, and opportunity data.

## 3. Explain a React component

Open `client/src/components/MetricCard.jsx`. Explain its props (`label`, `value`, `suffix`, `change`, `icon`, and `tone`) and how it renders one reusable KPI card. Show the `.map()` call in `App.jsx` that renders a card for every metric. Point out that negative changes use a downward arrow and negative styling.

## 4. Explain React initialization and setup

Show `index.html` and `main.jsx` in sequence: the HTML provides the mount point, then `createRoot` mounts the React app and `StrictMode` wraps it during development. Briefly show `vite.config.js` and explain that the React plugin enables JSX transformation.

In a terminal, run:

```sh
cd client
npm ci
npm run dev
```

Open the local URL printed by Vite, then show the dashboard. Mention that `npm run lint` checks the source and `npm run build` creates the production bundle.
