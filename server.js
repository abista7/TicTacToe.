const WebSocket = require('ws');
const express = require('express')
const app = express()
const port = 5000
 
const wss = new WebSocket.Server({ port: 4000 });
 
let gameState = ['', '', '', '', '', '', '', '', ''];
const players = [];
let playerTurn = 0;
 
function checkWinner(gameState, playerSymbol){ 
 if(
   (gameState[0] === playerSymbol && gameState[1] === playerSymbol && gameState[2] === playerSymbol) ||
   (gameState[0] === playerSymbol && gameState[3] === playerSymbol && gameState[6] === playerSymbol) ||
   (gameState[3] === playerSymbol && gameState[4] === playerSymbol && gameState[5] === playerSymbol) ||
   (gameState[1] === playerSymbol && gameState[4] === playerSymbol && gameState[7] === playerSymbol) ||
   (gameState[2] === playerSymbol && gameState[5] === playerSymbol && gameState[8] === playerSymbol) ||
   (gameState[6] === playerSymbol && gameState[7] === playerSymbol && gameState[8] === playerSymbol) ||
   (gameState[0] === playerSymbol && gameState[4] === playerSymbol && gameState[8] === playerSymbol) ||
   (gameState[2] === playerSymbol && gameState[4] === playerSymbol && gameState[6] === playerSymbol)
   ){
    return true;
  }
  else{
   return false;
 }
}
 
app.get('/api/play', (req, res) => {
 const {userId, position} = req.query;
 if(parseInt(userId) === parseInt(playerTurn) && !gameState[position]) {
   playerTurn = parseInt(userId) === 0 ? 1 : 0;
   gameState[position] = players[userId].symbol;
   if(checkWinner(gameState, players[userId].symbol)) {
     res.json({winner:  players[userId].name});
   } else {
     res.json("ok");
   }
 
 } else {
   res.status(400);
   res.json('Invalid Move');
 }
 })
 
app.get('/api/reset', (req, res) => {
 gameState = ['', '', '', '', '', '', '', '', ''];
 playerTurn = 0;
 res.json(gameState);
})
 
app.get('/api/getPlayerInfo', (req, res) => {
 if(!players[0]) {
   players[0] = {
     id: 0,
     symbol: 'X',
     name: "Player 1"
   }
   res.json(players[0]);
 } else {
   players[1] = {
     id: 1,
     symbol: '0',
     name: "Player 2"
   }
   res.json(players[1]);
 }
 })
 
 
wss.on('connection', (ws) => {
 ws.on('message', (message) => {
     if(message === 'Update') {
       wss.clients.forEach(function each(client) {
         client.send(JSON.stringify(gameState));
       });
     
     }
 });
});
 
 
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
