# Trippee

Let's figure this out

## Built with
- Node
- MySQL
- React
- Redis

## Installation
To configure the api, copy `api/.env.example` to `api/.env` and modify the variables.
From the project root follow this to set up the database and run the project:
```
# setup database (MySQL)
create database trippee
use trippee
source db/sql-scripts/01_build.sql

# installs dependencies
npm install
```
For development run:
```
npm start
```
For production run:
```
npm run build
```

## Installation (Docker)
From the project root follow this to run the project with docker:
```
docker-compose up
```
