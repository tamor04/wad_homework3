const Pool = require('pg').Pool;

const pool = new Pool({ //kui vaja siis mingid andmed siin ära
  user: "postgres", //process.env.DB_USER,
  host: "localhost", //process.env.DB_HOST,
  database: "wad4", //process.env.DB_NAME,
  password: "5432", //process.env.DB_PASSWORD,
  port: "5433", //process.env.DB_PORT,
});

const execute = async(query1, query2) => {
  try {
      await pool.connect(); // gets connection
      await pool.query(query1); // sends queries
      await pool.query(query2); // sends queries
      return true;
  } catch (error) {
      console.error(error.stack);
      return false;
  }
};

const createTblQuery1 = `
CREATE TABLE IF NOT EXISTS "posttable" (
 "id" SERIAL PRIMARY KEY,         
 "title" VARCHAR(200) NOT NULL,
 "body" VARCHAR(500) NOT NULL,
 "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 "urllink" VARCHAR(200)  
);`;

const createTblQuery2 = `
CREATE TABLE IF NOT EXISTS "users" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL 
);`;

// A function to execute the previous query   
execute(createTblQuery1, createTblQuery2).then(result => {
  if (result) {
      console.log('If does not exists, table "users" and  table "posttable" are created');
  }
});


module.exports = pool;
