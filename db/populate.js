const pool = require("./pool");

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id                INTEGER            PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name        VARCHAR(256)       NOT NULL,
    last_name         VARCHAR(256)       NOT NULL,
    password_hashed   VARCHAR(256)       NOT NULL,
    email             VARCHAR(256)       UNIQUE NOT NULL,
    profile_pic_name  VARCHAR(512)       DEFAULT(''),
    bio               VARCHAR(1024)      DEFAULT(''),
    joined_date       TIMESTAMPTZ        DEFAULT (TIMEZONE('utc', NOW())) NOT NULL,
    update_date       TIMESTAMPTZ        DEFAULT (TIMEZONE('utc', NOW())) NOT NULL
  );

  --CREATE TABLE IF NOT EXISTS messages (
    
  --);
`;

const main = async () => {
  const client = await pool.connect();
  await client.query(SQL);
  client.release();
};

main();
