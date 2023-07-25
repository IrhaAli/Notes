# Notes App

An API that allows users to create and log into an account to add notes to thier list.

## Getting Started

1. [Create](https://github.com/IrhaAli/Notes) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies: `npm i` in the server and client folder.
4. Setup the server:
  - Create .env file inside the server folder and copy content from .env.example into .env
  - Fill in the necessary PostgreSQL configuration
    - (  eg. 
      PORT=8080
      PGHOST=localhost
      PGUSER=labber
      PGPASSWORD=labber
      PGDATABASE=notes
      PGPORT=5432
      )
    - Go into psql
    - Create a db ( CREATE DATABASE notes; )
    - Creat user ( CREATE USER labber WITH ENCRYPTED PASSWORD 'labber'; )
    - Granting access to user ( GRANT ALL PRIVILEGES ON DATABASE pharmali TO labber;)
    - Run npm run db:reset

5. Run server through the command `npm start`
6. Visit `http://localhost:8080` for the server.
7. To run the tests simply import the Notes App.postman_collection.json to Postman and run the collection. Make sure that the db is resetted.

## Why I used the tech stack that I did
- For the server, I used express as it is the one I have a lot of experience in.
- For the database, I used postgresql for the same reason as above.
- The third party tool I used for testing was Postman as it is a very good tool for testing APIs.