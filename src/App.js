import React from 'react';
import './App.css';
import axios from 'axios'
const ws = new WebSocket('ws://localhost:4000')
 
ws.onopen = () => {
 console.log('connected')
}
 
const App = () => {
 const [gameState, setGameState] = React.useState([]);
 const [player, setPlayer] = React.useState(null);
 const [winner, setWinner] = React.useState(null);
 
 React.useEffect(() => {
   setGameState(['', '', '', '', '', '', '', '', ''])
   axios.get('/api/getPlayerInfo')
   .then(res => {
     setPlayer(res.data)
   })
   .catch(err => console.log(err));
 }, []);
 
 ws.onmessage = evt => {
   const message = JSON.parse(evt.data)
   setGameState(message)
 }
 
 const reset = () => {
   axios.get(`/api/reset`)
   .then(res => {
     ws.send("Update")
   })
   .catch(err => {
    console.log(err)
   });
 };
 
 const handleClick = (e) => {
   //server request
   axios.get(`/api/play?userId=${player.id}&position=${parseInt(e.target.id.split('-')[1])}`)
   .then(res => {
     if(res.data.winner) {
       setWinner(res.data.winner)
     }
     ws.send("Update")
   })
   .catch(err => {
     if(err.response) {
       window.alert(err.response.data);
     }
   });
 }
 
 return (
   <div className="App">
     <button id="reset" onClick={reset}>Reset</button>
     {winner && <h3 id="winner">Winner is {winner}</h3>}
     <div className="board">
       <div className="row">      
         <div onClick={handleClick} id="box-0" className="col"> {gameState[0]} </div>
         <div onClick={handleClick} id="box-1" className="col"> {gameState[1]} </div>
         <div onClick={handleClick} id="box-2" className="col"> {gameState[2]}</div>
       </div>
       <div className="row"> 
         <div onClick={handleClick} id="box-3" className="col">  {gameState[3]} </div>
         <div onClick={handleClick} id="box-4" className="col">  {gameState[4]} </div>
         <div onClick={handleClick} id="box-5" className="col">  {gameState[5]} </div>
       </div>
       <div className="row"> 
         <div onClick={handleClick} id="box-6" className="col">  {gameState[6]} </div>
         <div onClick={handleClick} id="box-7" className="col">  {gameState[7]} </div>
         <div onClick={handleClick} id="box-8" className="col">  {gameState[8]} </div>
       </div>
     </div>
   </div>
 );
}
 
export default App;
