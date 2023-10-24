const express = require('express');
var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
const port = 3001;

let users = [];

app.get('/getUsers', (req, res) => {
  res.json(users);
});

app.post('/createUser', (req, res) => {
  const userId = req.body.userId;
  console.log(req.body);
  users.push(userId);
  res.json(userId);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
