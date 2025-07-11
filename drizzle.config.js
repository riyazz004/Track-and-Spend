const { Pool } = require('pg');
const pool = new Pool({
  user: 'username',
  host: 'ep-shiny-credit-a5pytbzv.us-east-2.aws.neon.tech',
  database: 'Track&Spend',
  password: 'password',
  port: 5432,
  ssl: {
    rejectUnauthorized: true
  }
});


export default ({
  schema: "./utils/schema.jsx",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_OpIETq9M6wlS@ep-dry-dew-a5jckyk8-pooler.us-east-2.aws.neon.tech/TrackSpend?sslmode=require",

  },
});