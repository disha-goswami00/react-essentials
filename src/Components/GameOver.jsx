function GameOver({ winner, onStartOver }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}

      <p>
        <button onClick={onStartOver}>Start Over!</button>
      </p>
    </div>
  );
}

export default GameOver;
