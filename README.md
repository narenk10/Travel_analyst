# Travel Product Optimization Dashboard

Travel Analyst helps travel teams understand package performance and prioritize product improvements using bookings, revenue, satisfaction, conversion, and value scores.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express

## Run the frontend

The React application lives in `client/`. Use Node.js 20.19+ or 22.12+, then run:

```sh
cd client
npm ci
npm run dev
```

Run `npm run build` and `npm run lint` from `client/` to verify the app. See [the frontend guide](./client/README.md) for the project structure, initialization files, dependencies, and reusable components. The [React presentation walkthrough](./docs/react-dashboard-presentation.md) provides a short screen-recording outline.

## Mock UX Design

[Open the live interactive Mock UX](https://narenk10.github.io/Travel_analyst/mock-ux.html) · [View the public UX storyboard](https://raw.githubusercontent.com/narenk10/Travel_analyst/feature/mock-ux-design/docs/mock-ux-flow.svg)

This design maps the dashboard-to-decision journey: review portfolio signals, filter and compare packages, explore an opportunity, and save a next step. The storyboard summarizes the screens; the live prototype demonstrates the key interactions.

![Travel Analyst Mock UX storyboard](https://raw.githubusercontent.com/narenk10/Travel_analyst/feature/mock-ux-design/docs/mock-ux-flow.svg)
