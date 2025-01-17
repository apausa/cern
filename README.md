# Monte Carlo Methods Dashboard

Full stack web application to help Detector Simulation team researchers within the ALICE Collaboration manage Monte Carlo methods.

The project objective is to streamline the configuration, execution and consultation phases of these simulations through a digital tool; validating the configuration automatically and managing multiple executions simultaneously. Also, to facilitate the consultation of Monte Carlo methods, regarding their content, status and result. The idea is inspired by ALICE Hyperloop and Detector Control System.

![Mock-up](https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/2736e0195579681.660fdd36d5fae.jpeg)

## Interaction Design Project Report 

Please, contact me for the project report focusing on **interaction design**.

## CERN Note

Otherwise, you can find a shorter report focusing on **software development**, in the following link: [CERN Note](https://cds.cern.ch/record/2882150?ln=en). 

## Getting Started

First, define environment variables by creating a ```.env``` file.

```bash
SCRIPTS_DIRECTORY_PATH=/Users/User/Work/Scripts
GRID_SUBMIT_PATH=/Users/User/Work/grid_submit.sh
```

Then, generate build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then, run alienv:

```bash
/cvmfs/alice.cern.ch/bin/alienv enter O2sim
```

Finally, run the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
