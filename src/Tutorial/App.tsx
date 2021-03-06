import { FC, useState } from 'react';
import './index.css';

//
// 型定義
//
type SquareState = 'X' | 'O' | null;

interface SquareProps {
  value: SquareState;
  onClick: () => void;
}

interface BoardProps {
  squares: SquareState[];
  onClick: (i: number) => void;
}

//
// 関数コンポーネント
//
/* eslint-disable react/button-has-type */
const Square: FC<SquareProps> = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
/* eslint-enable */

const Board: FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: FC = () => {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${state.xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i: number) => {
    // すでに勝者が決まっている or すでに石が置かれているときはなにもしない
    if (winner || current.squares[i]) {
      return;
    }
    const history = state.history.slice(0, state.stepNumber + 1);
    const next = history[history.length - 1];
    const squares = next.squares.slice();
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      history: history.concat([
        {
          squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step: number) => {
    setState({
      history: state.history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  /* eslint-disable react/button-has-type, react/no-array-index-key */
  const moves = state.history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  /* eslint-enable */

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;

//
// ヘルパー関数
//
const calculateWinner = (squares: String[]) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
