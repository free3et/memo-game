import "./App.css";
import { useState, useEffect } from "react";
import { Playground } from "./Playground/Playground";

function App() {
  let [isGameBegin, setBeginGame] = useState(false);
  let [randomLetter, setRandomLetter] = useState("");
  let [restartGame, setRestartGame] = useState(false);
  let [disabled, setDisabled] = useState(false);

  function totalGamesCount() {
    let n = localStorage.getItem("total_games_count");
    if (n === null) {
      n = 0;
    }
    n++;

    localStorage.setItem("total_games_count", n);
    return n;
  }
  let [totalGamesCounter, setTotalGamesCounter] = useState(0);

  function beginGame() {
    setBeginGame(true);
  }

  function showRandomLetter() {
    let dif = Math.random().toFixed(2);
    if (dif < 0.33) {
      setRandomLetter((randomLetter = "A"));
    } else if (dif >= 0.33 && dif <= 0.66) {
      setRandomLetter((randomLetter = "B"));
    } else if (dif > 0.67) {
      setRandomLetter((randomLetter = "C"));
    } else {
      setRandomLetter((randomLetter = ""));
    }
  }

  function renderPlayground() {
    return (
      <>
        <div>
          <h1>
            Find all <span>{randomLetter}</span> letters!
          </h1>
          <h4>
            You won <span>{localStorage.getItem("total_victories")}</span>
            &nbsp;times. <br />
            Total games: <span>{totalGamesCounter}</span>
          </h4>
        </div>
        <Playground
          randomLetter={randomLetter}
          onRestart={(restart) => {
            playAgain(restart);
          }}
          onWinGame={(win) => {
            countVictories(win);
          }}
        />
      </>
    );
  }

  function playAgain(restart) {
    if (restart) {
      setRestartGame((restartGame = !restartGame));
      setBeginGame(false);
      setDisabled((disabled = !disabled));
      setTotalGamesCounter((totalGamesCounter = totalGamesCount()));
    }
  }

  function countVictories(win) {
    console.log(win);
    win = localStorage.getItem("total_victories");
    if (win === null) {
      win = 0;
    }
    win++;

    localStorage.setItem("total_victories", win);
    return win;
  }

  useEffect(() => {
    showRandomLetter();
  }, []);

  return (
    <div className="App">
      <main>
        {isGameBegin ? (
          renderPlayground()
        ) : (
          <div>
            <button
              onClick={beginGame}
              className="begin-game"
              disabled={disabled}
            >
              Start game
            </button>
          </div>
        )}
        {restartGame ? renderPlayground() : null}
      </main>
    </div>
  );
}

export default App;
