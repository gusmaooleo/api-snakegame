const express = require('express');
const cors = require('cors')
const db = require('./database')
const app = express();

app.use(cors());
app.use(express.json());

app.post('/verify', (req, res) => {
  const { name, pic_id } = req.body
  const trim_name = name.trim()

  db('users')
    .select('*')
    .where({
      user_name: trim_name,
      pic_id: pic_id
    })
    .then((rows) => {
      if (rows.length === 0) {
        res.send(false)
      } else {
        res.send(true)
      }
    })
    .catch((error) => {
      console.error(error)
    });
});

app.post('/push', (req, res) => {
  const { name, pic_id } = req.body
  const trim_name = name.trim()

  db('users')
    .insert({
      user_name: trim_name,
      pic_id: pic_id
    })
    .then(() => {
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    });
});

app.get('/getID', (req, res) => {
  const { name, pic_id } = req.query;
  const trim_name = name.trim();

  db('users')
    .select('user_id')
    .where({
      user_name: trim_name,
      pic_id: pic_id
    })
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((error) => {
      console.error(error)
    });
});

app.listen(3001);