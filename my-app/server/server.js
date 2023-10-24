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

// sql =
//   "CREATE TABLE MovieTickets(TicketID INTEGER PRIMARY KEY,RowNumber TEXT,MovieName TEXT NOT NULL,Showtime DATETIME NOT NULL,SeatNumber TEXT NOT NULL);";
// db.run(sql);

// Define common values for movie name and showtime
const movieName = "Leo";
const showtime = "6:00 pm";

// Function to convert a number to an alphabetic representation
function numberToAlphabet(num) {
  const base = "A".charCodeAt(0);
  let result = "";
  while (num > 0) {
    const remainder = (num - 1) % 26;
    result = String.fromCharCode(base + remainder) + result;
    num = Math.floor((num - 1) / 26);
  }
  return result;
}

// Insert up to 15 rows with alphabetic RowNumber, each with 40 seats
db.serialize(() => {
  for (let rowNumber = 1; rowNumber <= 15; rowNumber++) {
    const alphabeticRowNumber = numberToAlphabet(rowNumber);
    for (let seatNumber = 1; seatNumber <= 40; seatNumber++) {
      const seatLabel = `Row ${alphabeticRowNumber} Seat ${seatNumber}`;
      db.run(
        "INSERT INTO MovieTickets (RowNumber, MovieName, Showtime, SeatNumber) VALUES (?, ?, ?, ?)",
        [alphabeticRowNumber, movieName, showtime, seatLabel]
      );
    }
  }
});

// Close the database connection after the inserts
db.close();
