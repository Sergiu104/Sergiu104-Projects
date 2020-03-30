const express = require("express");
const cors = require("cors");
const app = express();

const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "localhost",
      user: "developer",
      password: "Samsunggalaxys9",
      database: "stopwatch",
      port: 8080
    }
  });

  app.use(express.json());
  app.use(cors());

  app.get("/timers", async function(req, res) {
    const timers = await knex.select("id", "name", "time").from("timers");
    res.json(timers);
  });
  
  app.post("/timers", async function(req, res) {
    const result = await knex("timers").insert({
      name: req.body.name,
      time: req.body.time
    });
  
    res.json(result[0]);
  });

  app.delete("/timers/:id", async function(req, res) {
    await knex("timers")
      .delete()
      .where({
        id: req.params.id
      });
  
    res.json();
  });

app.listen(8000);