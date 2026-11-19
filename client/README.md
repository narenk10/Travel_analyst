# Travel Analyst frontend

The React + Vite client presents a travel portfolio dashboard with reusable metric cards, a revenue trend chart, prioritized growth opportunities, and a searchable, region-filterable package table. Packages can be edited or deleted from the table; these changes are held in React state for the current page session and reset on reload.

## Project structure

```text
client/
  index.html              HTML page and React root element
  package.json            Dependencies, Node requirement, and scripts
  package-lock.json       Locked dependency versions
  vite.config.js          Vite configuration with the React plugin
  src/
    main.jsx              Creates the React root and renders App
    App.jsx               Composes dashboard sections and interactions
    data.js               Sample metrics, packages, and opportunities
    App.css               Dashboard component styles
    index.css             Global styles
    components/           Reusable dashboard components
```

## React setup

```sh
cd client
npm ci
npm run dev
```

Open the local URL printed by Vite. `index.html` provides the `root` element and loads `src/main.jsx`. The entry point creates the React root, enables `StrictMode`, and renders `App`. Vite applies the React plugin configured in `vite.config.js`.

The client uses React and React DOM at runtime. Vite, `@vitejs/plugin-react`, and Oxlint are development dependencies. Node.js `20.19+` or `22.12+` is required.

## Components

- `src/components/Navigation.jsx` provides section navigation.
- `src/components/MetricCard.jsx` renders a KPI from its label, value, change, icon, and tone props. Its trend arrow and color reflect whether the change is negative.
- `src/components/RevenueChart.jsx` renders the revenue trend as an SVG chart.
- `src/components/OpportunityList.jsx` shows recommendations and lets users add or remove planned actions.
- `src/components/PackageTable.jsx` filters package data and opens package details.
- `src/data.js` contains the sample dashboard data.

Run `npm run lint` and `npm run build` from `client/` to check the client.
