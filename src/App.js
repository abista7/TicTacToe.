import React from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = React.useState([]);
  const [playerId, setPlayerId] = React.useState(null);
  const [winner, setWinner] = React.useState(null);

  const reset = () => {
  };

  return (
    <div className="App">
      <button id="reset" onClick={reset}>Reset</button>
      {winner && <h3 id="winner">Winner is {winner}</h3>}
      Put game here!
    </div>
  );
}

export default App;
