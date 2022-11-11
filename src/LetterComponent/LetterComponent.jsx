import "./LetterComponent.css";
import { useState, useEffect } from "react";

export const LetterComponent = ({
  randomLetter,
  onLetterClick,
  onRightAnswerChecking,
  disabled,
}) => {
  let [letter, setLetter] = useState("");
  let [color, setColor] = useState("");
  let [rightAnswer, setRightAnswer] = useState("");

  function findRandomLetter() {
    let dif = Math.random().toFixed(2);
    if (dif < 0.33) {
      setLetter((letter = "A"));
      setColor((color = "violet"));
    } else if (dif >= 0.33 && dif <= 0.66) {
      setLetter((letter = "B"));
      setColor((color = "yellow"));
    } else if (dif > 0.66) {
      setLetter((letter = "C"));
      setColor((color = "blue"));
    }
  }

  function disableMatrix() {
    setColor(color + " transparent");
  }

  function onLetterClick(letter) {
    if (letter === randomLetter) {
      setRightAnswer((rightAnswer = "correct"));
      setColor((color = ""));
    } else {
      setRightAnswer((rightAnswer = "incorrect"));
      setColor((color = ""));
    }
    return rightAnswer;
  }

  useEffect(() => {
    findRandomLetter();
    setTimeout(disableMatrix, 5000);
  }, []);

  return (
    <>
      <button
        disabled={disabled}
        className={`letter_cell ${color} ${rightAnswer}`}
        onClick={(event) => {
          onLetterClick(letter);
          onRightAnswerChecking(rightAnswer);
        }}
      >
        {letter}
      </button>
    </>
  );
};
