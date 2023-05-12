import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';
import Cell from "./Cell";

export default function App() {

  const [cells, setCells] = useState([]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numTurns, setNumTurns] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Since you're only doing this once and it doesn't depend
    // on component state, I think you can move it outside the
    // component.
    // Think of `useEffect` as a hook that synchronizes your
    // component with external state, rather than manipulating it
    const newCells = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        newCells.push({ i: i, j: j, player: 0 });
      }
    }
    setCells(newCells);
  }, []);

  //Ok, I saw what you mean about how you can't depend on update state variables necessarily because they won't be ready until the next render. I had been having trouble with that- preventing the computer from moving after a winner had been found- because of that reason, but I hadn't considered it til you pointed it out. Now, I've changed the logic so that in setValue, checkWinner takes in the updatedCells and checks those, instead of waiting until the next render to check the updated 'cells' state variable. That seems to have fixed the problem.

  useEffect(() => {
    if (numTurns === 49 && !winner) {
      setWinner('Draw')
      setGameOver(true);
    }
  }, [numTurns])

  useEffect(() => {
    const handleComputerTurn = async () => {
      // see comment above about stale `useState` variables.
      
      if (turn === 1 || winner !== null) {
        return;
      }
      let foundJ = false;
      let counter = 0;

      while (!foundJ && turn !== 1 && counter < 1000) {
        let jToCheck = Math.floor(Math.random() * 7) + 0;
        let valid = await isValidColumn(jToCheck);
        if (valid) {
          foundJ = true;
          fillColumn(jToCheck);
        }
        counter++;
      }
    };

    if (turn === 2 && !winner && !gameOver) {
      handleComputerTurn();
    }

  }, [turn, winner, gameOver]);

  function handleReset() {
    setWinner(null);
    setGameOver(false);
    const newCells = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        newCells.push({ i: i, j: j, player: 0 });
      }
    }
    setCells(newCells);
    setTurn(1);
    setNumTurns(0)
    setLoading(false);
  };

  function getCellIndex(i, j) { return i * 7 + j; }
  
  function inBounds(i, j) { return i >= 0 && i < 7 && j >= 0 && j < 7; }

  function checkColumn(j) {
    for (let i = 6; i >= 0; i--) {
      if (cells[getCellIndex(i, j)].player === 0) {
        return i;
      }
    }
    return -1
  }

  async function fillColumn(j) {
    setLoading(true);
    if (gameOver) { return }
    const checkI = checkColumn(j);
    if (checkI !== -1) {
      setValue(checkI, j);
    }
    else {
      setLoading(false);
    }
  }

  async function isValidColumn(j) {
    const checkI = checkColumn(j);
    if (checkI !== -1) { return true }
    else { return false }
  }

  // Not sure why this is an async function
  //removed async
  function checkWinner(cells) {
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
    let foundWinner = false;

    dirs.forEach(dir => {
      const rr = dir[0];
      const cc = dir[1];

      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const curPlayer = cells[getCellIndex(i, j)].player;

          if (curPlayer === 0) {
            continue;
          }
          for (let k = 0; k < 5; k++) {
            if (k === 4) {
              setWinner(curPlayer);
              setGameOver(true);
              foundWinner = true;
              break;
            }
            if (!inBounds(i + (k * rr), j + (k * cc)) || cells[getCellIndex(i + (k * rr), j + (k * cc))].player !== curPlayer) {
              break;
            }
          }
          if (foundWinner) {
            break;
          }
        }
        if (foundWinner) {
          break;
        }
      }
      if (foundWinner) {return}
    });
    return foundWinner
  }

  async function setValue(iToChange, jToChange) {
    const updatedCells = cells.map((cell, index) => {
      if (cell.i === iToChange && cell.j === jToChange) {
        return { ...cell, player: turn };
      } else {
        return cell;
      }
    });
    setCells(updatedCells);
    const foundWinner = checkWinner(updatedCells);
    if (foundWinner===false) {
      setNumTurns(numTurns + 1);
        setTurn(turn === 1 ? 2 : 1);
        setLoading(false);
    }
    
  }

  return (
    <main>
      <div className="body">
        <div className="buttonsholder">
          <button className="button reset" onClick={() => { handleReset(); }} >New Game</button>
          {winner !== null
            ?
            <div className="button winner">
              {winner === 'Draw' ? "It's a tie!" : `Player ${winner} wins!`}
            </div>
            :
            <div className="button gameon" >Game on!</div>
          }
        </div>
        <div className="grid">
          {cells.map((obj) => <Cell disabled={loading} i={obj.i} j={obj.j} player={obj.player} fillColumn={fillColumn} />)}
        </div>
        <div className="buttonsholder title">
          <div>CONNECT 4</div>
        </div>
        <div className="trapezoid" />
      </div >
    </main>)
}


