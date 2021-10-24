
# Kelas Pintar Test - Backend Developer

Kelas Pintar Test - Backend Developer using NodeJS


## Run Locally

Requirements:

- Node
- Postgres

Clone the project

```bash
  git clone https://github.com/NaufalHSyahputra/kelas-pintar-test.git
```

Go to the project directory

```bash
  cd kelas-pintar-test
```

Install dependencies

```bash
  npm install
```

Copy .env.example Files and configure the environment file
```bash
  cp .env.example .env
```

Start the server

```bash
  npm run start
```

  
## Demo

Heroku Link: https://kelas-pintar-test.herokuapp.com

Swagger Link: https://kelas-pintar-test.herokuapp.com/api-docs
## API Reference
### Swagger Link
https://kelas-pintar-test.herokuapp.com/api-docs

#### A students performance report of all subjects they are learning, and compare the scores in each subject with the grades average.

```http
  GET /api/reports
```

#### Top 3 students of each grade based on the highest average of all scores in their performance report.

```http
  GET /api/reports/top3
```

#### A list of student names and their grade that have below average scores in ALL subjects.

```http
  GET /api/reports/below-average
```

## Tech Stack

**Server:** Node, Express, PostgreSQL

  
