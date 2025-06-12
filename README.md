## Getting Started

You need to have [Node.js](https://nodejs.org/en) downloaded to run this project.
You need to have [Python](https://www.python.org) and [Sql Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) downloaded to run all the project.

You also need to have the [Py-Sql-Api](https://github.com/Greem3/Py-Sql-Api) repository cloned.
Go to the directory where you cloned Py-Sql-Api and follow the steps in the README.md

Download all project dependencies using the following command:
```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

Before running the project, if you want the database to work, you need to run the files in the db folder in the order indicated in the db/README.md file.

Finally, run the development server (make sure the Py-Sql-Api API is active on port 8000):
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.