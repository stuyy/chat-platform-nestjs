# Chat Platform API

This is the backend for the [Chat Platform React](https://github.com/stuyy/chat-platform-react) project.

# Installation & Setup

## Pre-requisites

- Node.js v16
  - **8/31/2022** - I've tested this on my Ubuntu server with Node.js v18 and there was an issue with the database connection. I was able to fix this by downgrading to Node.js v16. If you have any issues with the database connection, please try Node.js v16.
- MySQL Server (or any SQL database that is supported by TypeORM).

## Setting up the Backend

1. Clone the repository.
2. Run `yarn install` to install dependencies.
3. Create a `.env.development` file in the root directory and paste the following:

   ```
   PORT=

   MYSQL_DB_HOST=
   MYSQL_DB_USERNAME=
   MYSQL_DB_PASSWORD=
   MYSQL_DB_PORT=
   MYSQL_DB_NAME=

   COOKIE_SECRET=
   ```

   - **`PORT`** The port your server will run on
   - **`MYSQL_DB_HOST`** The hostname for your MySQL database server
   - **`MYSQL_DB_USERNAME`** The username for your MySQL database
   - **`MYSQL_DB_PASSWORD`** The password for your MySQL user account
   - **`MYSQL_DB_PORT`** The port your MySQL server is running on (default 3306)
   - **`MYSQL_DB_NAME`** The name of your database (be sure to create it first otherwise an error will be thrown).
   - **`COOKIE_SECRET`** Can be any string that can be used to encrypt & decrypt your cookie.

4. Run `yarn start:dev` or `npm run start:dev` depending on which package manager you use to start the project in development mode.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
