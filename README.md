
# Monte Carlo Simulations Dashboard

Full-stack web application to streamline Monte Carlo Methods

## Environment Variables

To run this project, define the following environment variables in a .env file

`SCRIPTS_DIRECTORY_PATH`

`GRID_SUBMIT_PATH`

## Run Locally

Clone project

```bash
  git clone https://gitlab.cern.ch/papausac/monteCarloMethodsDashboard
```

Access directory

```bash
  cd monteCarloMethodsDashboard
```

Install dependencies

```bash
  npm install
```

Generate build:

```bash
npm run build
```

Run alienv:

```bash
/cvmfs/alice.cern.ch/bin/alienv enter O2sim
```

Start server:

```bash
npm run start
```

## API Reference

#### Create job

```http
  POST /api/simulation
```

#### Delete job and scripts

```http
  DELETE /api/simulation
```

#### Create and execute gridRunWorkflow.sh

```http
  POST /api/simulation/gridRunWorkflow
```

#### Create and execute localRunWorkflow.sh

```http
  POST /api/simulation/localRunWorkflow
```

#### Create and execute visualizeWorkflow.sh

```http
  POST /api/simulation/visualizeWorkflow
```


## Technologies

**Languages**: JavaScript/TypeScript and Bash

**Application framework**: Next.js
* **Client:** React.js, d3-graphviz, TailwindCSS and NextUI
* **Server:** Node.js and uuid

**Testing framework**: Jest.js with React Testing Library

**Linter**: ESLint with TypeScript Airbnb configuration