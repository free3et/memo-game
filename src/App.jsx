import "./App.css";
import { useState, useEffect } from "react";
import { Playground } from "./Playground/Playground";

function App() {
  let [isGameBegin, setBeginGame] = useState(false);
  let [randomLetter, setRandomLetter] = useState("");
  let [restartGame, setRestartGame] = useState(false);
  let [disabled, setDisabled] = useState(false);

  function beginGame() {
    setBeginGame(true);
    setBeginGameBtn();
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

  function playAgain(restart) {
    if (restart) {
      setRestartGame((restartGame = !restartGame));
      setBeginGame(false);
      setDisabled((disabled = !disabled));
    }
  }

  useEffect(() => {
    showRandomLetter();
  }, []);

  return (
    <div className="App">
      <main>
        {isGameBegin ? (
          <>
            <div>
              <h1>
                Find all <span>{randomLetter}</span> letters!
              </h1>
            </div>
            <Playground
              randomLetter={randomLetter}
              onRestart={(restart) => {
                playAgain(restart);
              }}
            />
          </>
        ) : (
          <div>
            <button
              onClick={beginGame}
              disabled={disabled}
              className="begin-game"
            >
              Start game
            </button>
          </div>
        )}
        {restartGame ? (
          <>
            <div>
              <h1>
                Find all <span>{randomLetter}</span> letters!
              </h1>
            </div>
            <Playground
              randomLetter={randomLetter}
              onRestart={(restart) => {
                playAgain(restart);
              }}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}

export default App;
