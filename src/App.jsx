import Header from "./Components/Header";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
function App() {
  // return <Header />;
  const [activePlayer, setActivePlayer] = useState("X");
  const HandleSelect = () => {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={HandleSelect}
          activePlayerSymbol={activePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;
