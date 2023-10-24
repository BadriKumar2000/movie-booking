const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors");
const db = new sqlite3.Database(
  "./movieTickets.db",
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) return console.error(error.message);
  }
);
let sql;
// Creating a table user
// let sql =
//   "CREATE TABLE user(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)";
// db.run(sql);

// db.run("DROP TABLE user");
// Inserting data into table user
// sql =
//   "INSERT INTO user(first_name,last_name,username,password,email)VALUES(?,?,?,?,?)";
// db.run(
//   sql,
//   ["badrikumar", "gudisha", "badri", "gudishabadri", "badri@gmail.com"],
//   (error) => {
//     if (error) return console.error(error.message);
//   }
// );

sql = "SELECT * FROM user";
db.all(sql, [], (error, rows) => {
  if (error) return console.error(error.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

const app = express();

app.use(cors());

const initializeDBAndServer = () => {
  try {
    app.listen(3400, () => {
      console.log("Server Running at http://localhost:3400/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/api", (request, response) => {
  response.send([
    { userName: "badri", id: 1 },
    { userName: "moulali", id: 2 },
    { userName: "giribabu", id: 3 },
  ]);
});
