// Update with your config settings. - this is for Postgres, it requires credentials
//FAKE credentials
const localPG = {
  host: "localhost",
  database: "hobbits",
  user: "student",
  password: "hired"
};

//we know heroku has database_URL so connection to production db I'm goin to use it, otherwise, I'm going to use localPG
const productionDbConnection = process.env.DATABASE_URL || localPG;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hobbits.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: productionDbConnection, // could be an object or a string
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
