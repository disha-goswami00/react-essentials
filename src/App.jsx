import Header from "./Components/Header";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";
import { useState } from "react";

const PLAYER_NAMES = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const getGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};
const getWinner = (gameBoard, players) => {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  // return <Header />;
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState(PLAYER_NAMES);
  const activePlayer = getActivePlayer(gameTurns);

  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelect = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  const handleStartOver = () => {
    setGameTurns([]);
  };
  const handlePlayerNames = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER_NAMES.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNames}
          />
          <Player
            initialName={PLAYER_NAMES.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNames}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onStartOver={handleStartOver} />
        )}

        <GameBoard onSelectSquare={handleSelect} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
