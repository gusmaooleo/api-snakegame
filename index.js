const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/verify", (req, res) => {
  const { name, pic_id } = req.body;
  const trim_name = name.trim();

  db("users")
    .select("*")
    .where({
      user_name: trim_name,
      pic_id: pic_id,
    })
    .then((rows) => {
      if (rows.length === 0) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/push", (req, res) => {
  const { name, pic_id } = req.body;
  const trim_name = name.trim();

  db("users")
    .insert({
      user_name: trim_name,
      pic_id: pic_id,
    })
    .then(() => {
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });
});

app.get("/getID", (req, res) => {
  const { name, pic_id } = req.query;
  const trim_name = name.trim();

  db("users")
    .select("user_id")
    .where({
      user_name: trim_name,
      pic_id: pic_id,
    })
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/getMatchID", (req, res) => {
  const { userId } = req.body;

  db("matches")
    .insert({
      user_id: userId,
    })
    .then(() => {
      db("matches")
        .select("match_id")
        .where({
          user_id: userId,
        })
        .then((rows) => {
          res.send(rows[rows.length - 1]);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/insertMatchValues", (req, res) => {
  const { matchId, matchResult, matchScore, matchMoves, matchTime } = req.body;

  db("matches_stats")
    .insert({
      match_id: matchId,
      score: matchScore,
      moves: matchMoves,
      final_result: matchResult,
      match_time: matchTime,
    })
    .then(() => {
      console.log("data send!");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3001);
