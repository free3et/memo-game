import "./App.css";
import { useState, useEffect } from "react";
import { Playground } from "./Playground/Playground";

function App() {
  let [isGameBegin, setBeginGame] = useState(false);
  let [randomLetter, setRandomLetter] = useState("");

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
            <Playground randomLetter={randomLetter} />
          </>
        ) : (
          <div>
            <button onClick={beginGame}>Start game</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
