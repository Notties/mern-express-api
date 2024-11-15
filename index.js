import express from "express";
import bodyParser from "body-parser";
import config from "./config.js";
import db from "./mongoC.js";

const port = config.PORT || 4000;
const app = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get("/", (_, res) => {
  const uptimeInSeconds = process.uptime();
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  res.status(200).json({
    status: "UP",
    message: "Server is healthy",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
  });
});

app.post("/addUser", async (req, res) => {
  try {
    const { name, email } = req.body;
    let collection = await db.collection("users");
    const payload = {
      name,
      email,
      date: new Date(),
    };
    let result = await collection.insertOne(payload);
    res.send(result).status(204);
  } catch (e) {
    res.send({ msg: "Can't Add User", err: e.message }).status(500);
  }
});

app.get("/getUsers", async (_, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection
      .find({})

      .toArray();
    res.send(results).status(200);
  } catch (e) {
    res.send({ msg: "Can't Get Users", err: e.message }).status(500);
  }
});

app.listen(port, function () {
  console.log(`listening at port: ${port}\nvisit: http://localhost:${port}`);
});
