import React, { useState } from "react";

export const Grid = () => {
  const [inputs, setInputs] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("");

  const checkWinner = (inputs) => {
    const winningPatterns = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let i in winningPatterns) {
      winningPatterns[i].forEach((pattern) => {
        if (
          inputs[pattern[0]] === "" ||
          inputs[pattern[1]] === "" ||
          inputs[pattern[2]] === ""
        ) {
        } else if (
          inputs[pattern[0]] === inputs[pattern[1]] &&
          inputs[pattern[1]] === inputs[pattern[2]]
        ) {
          setWinner(inputs[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (index) => {
    if (winner) {
      return;
    }
    if (inputs[index] !== "") {
      return;
    }
    if (turn === "x") {
      inputs[index] = "x";
      setTurn("o");
    } else {
      inputs[index] = "o";
      setTurn("x");
    }
    checkWinner(inputs);
    setInputs(inputs);
  };

  const playAgain = () => {
      setInputs(Array(9).fill(""));
      setTurn('x')
      setWinner('')
  }

  return (
    <main>
      <div className="grid-container">
        {inputs.map((input, index) => {
          return (
            <div
              key={index}
              className="grid-item"
              onClick={() => handleClick(index)}
            >
              {inputs[index]}
            </div>
          );
        })}
      </div>
      <div className="winner-container">
        {winner && <p>
            {winner} is the winner <br /><br />
            <button onClick={playAgain}>play again</button>
            </p>}
      </div>
    </main>
  );
};
