const WebSocket = require('ws');
const express = require('express')
const app = express()
const port = 5000

const wss = new WebSocket.Server({ port: 4000 });

let gameState = [];

app.get('/api/play', (req, res) => {
  res.send('');
})

app.get('/api/reset', (req, res) => {
  res.send('');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))