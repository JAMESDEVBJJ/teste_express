import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  database: "teste_express",
  port: 5432,
  user: "postgres",
  password: "1234",
  ssl: false,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

export default pool;
