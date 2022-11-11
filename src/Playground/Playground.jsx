import { LetterComponent } from "../LetterComponent/LetterComponent";
import { useState, useEffect } from "react";
import "./Playground.css";

export const Playground = ({ randomLetter, onRestart }) => {
  const COLUMN = 3;
  const ROWS = 3;

  const getPlayground = () =>
    [...Array(ROWS).keys()].map((row) =>
      [...Array(COLUMN).keys()].map((n) => ({
        letter: "",
      }))
    );

  let [playground, setPlayground] = useState(getPlayground());
  let [rightAnswer, setRightAnswer] = useState("");
  let [message, setMessage] = useState("");
  let [classname, setClassName] = useState("");
  let [inactivePlayground, setInactivePlayground] = useState("");
  let [rightAnswerCounter, setRightAnswerCounter] = useState(0);
  let [timer, setTimer] = useState(5);
  let [win, setWin] = useState(0);
  let [disabled, setDisabled] = useState("");
  let [restartBtn, setRestartBtn] = useState(``);
  let [restart, setRestartEvent] = useState(false);

  function countLetters() {
    let cells = document.querySelectorAll(".letter_cell");
    let newArr = [];

    [...cells].map((cell) => {
      newArr.push(cell.innerHTML);
    });

    let countLet = newArr.filter((item) => item === randomLetter).length;

    return countLet;
  }

  function showMessage(rightAnswer) {
    if (rightAnswer === "correct") {
      setMessage((message = "Great"));
      setClassName((classname = "correct"));
      setRightAnswerCounter(rightAnswerCounter + 1);
    } else if (rightAnswer === "incorrect") {
      setMessage((message = "Wrong. You are lose((("));
      setClassName((classname = "incorrect"));
      setDisabled((disabled = "disabled"));
      setRestartEvent((restart = !restart));
      setRestartBtn(
        <button type="button" onClick={(event) => onRestart(restart)}>
          Restart
        </button>
      );
    }
    return rightAnswerCounter;
  }

  function areYouWin() {
    if (countLetters() === 0) return;
    if (rightAnswerCounter === 0) return;

    if (countLetters() === rightAnswerCounter) {
      setWin(win + 1);
      setMessage((message = "Congratulations!!! You won!"));
      setRestartEvent((restart = !restart));
      setRestartBtn(
        <button
          className="restart_btn"
          type="button"
          onClick={(event) => onRestart(restart)}
        >
          Restart
        </button>
      );
    }
  }

  useEffect(() => {
    setTimeout(countLetters, 2000);
  }, []);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    timer > 0 ? setInactivePlayground("inactive") : setInactivePlayground("");
  }, [timer]);

  useEffect(() => {
    areYouWin();
  }, [rightAnswerCounter]);

  return (
    <div className="container">
      <div className={`playground ${inactivePlayground}`}>
        <h3>{timer}</h3>
        <h4>You won {win} times</h4>
        <h2 className={classname}>{message}</h2>
        {restartBtn}
        {playground.map((row, rowIndex) => (
          <div key={rowIndex} className="playground-row">
            {row.map((cell, index) => (
              <LetterComponent
                disabled={disabled}
                key={index}
                randomLetter={randomLetter}
                rightAnswer={rightAnswer}
                onLetterClick={(letter) => {
                  showHiddenLetter(letter);
                }}
                onRightAnswerChecking={(rightAnswer) => {
                  showMessage(rightAnswer);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
