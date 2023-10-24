const express = require("express");
const cors = require("cors");
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
