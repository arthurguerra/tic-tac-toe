import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({isXNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares))
      return;

    const updatedSquares = squares.slice();

    isXNext ? (updatedSquares[i] = 'X') : (updatedSquares[i] = 'O');

    onPlay(updatedSquares);
  }

  const winner = calculateWinner(squares)
  let status;
  if (winner)
    status = "Winner: " + winner;
  else
    status = "Next player: " + (isXNext ? "X" : "O");

  const rows = buildBoard();

  function buildBoard() {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const columns = [];
      for (let col = 0; col < 3; col++) {
        const squareIndex = row * 3 + col;
        columns.push(
          <Square
            value={squares[squareIndex]}
            onSquareClick={() => handleClick(squareIndex)} />
        );
      }
      rows.push(<div className="board-row">{columns}</div>);
    }
    return rows;
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquaresState = history[currentMove];

  function handePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (currentMove === move) {
      description = "You are at move #" + move;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {currentMove === move ? 
        (<span className="current-move">{description}</span>) 
        : (<button className="move-button" onClick={() => jumpTo(move)}>{description}</button>)
        }
      </li>
    );
  });

  function reverseOrder() {
    setAscending(!isAscending);
  }

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board isXNext={xIsNext} squares={currentSquaresState} onPlay={handePlay}/>
      </div>
      <div className="game-info">
        <button onClick={reverseOrder}>Sort {isAscending ? "Descending" : "Ascending"}</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>      
  );

}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  if (squares.every((square) => square !== null)) {
    return "Draw";
  }
  return null;
}

