# Travel Product Optimization Dashboard

Travel Analyst helps travel teams understand package performance and prioritize product improvements using bookings, revenue, satisfaction, conversion, and value scores.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express

## Mock UX Design

[Open the live interactive Mock UX](https://narenk10.github.io/Travel_analyst/mock-ux.html) · [View the public UX storyboard](https://raw.githubusercontent.com/narenk10/Travel_analyst/feature/mock-ux-design/docs/mock-ux-flow.svg)

This design maps the dashboard-to-decision journey: review portfolio signals, filter and compare packages, explore an opportunity, and save a next step. The storyboard summarizes the screens; the live prototype demonstrates the key interactions.

![Travel Analyst Mock UX storyboard](https://raw.githubusercontent.com/narenk10/Travel_analyst/feature/mock-ux-design/docs/mock-ux-flow.svg)

## Run with Docker

Install Docker Desktop with the Compose plugin, then run from the repository root:

```sh
docker compose up --build
```

Open <http://localhost:8080> for the dashboard. The API health check is available at
<http://localhost:8080/api/health>. Compose starts the React client, Express API, and
MongoDB; the client’s Nginx server forwards `/api` requests to the backend. MongoDB
data is stored in the `mongo-data` Docker volume.

Stop the services with `docker compose down`. To use another available host port, set
`APP_PORT` before starting Compose. In PowerShell, for example:

```powershell
$env:APP_PORT = "8081"
docker compose up --build
```
