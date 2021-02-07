import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Square from './components/Square'
import { SnakeDirection } from './const/snake';
import Snake, { TBoard } from './Snake';


function App() {
  const [snakeBoard, setBoard] = useState([[]] as TBoard)
  const [numberOfApple, setNumberOfApple] = useState(0)
  const snake = new Snake({
    boardReactHandler: setBoard,
    appledReactHandler: setNumberOfApple
  })

  const handleArrow = (e: any) => {
    e.preventDefault()
    console.log(e.key)
    switch (e.key) {
      case "ArrowLeft":
        snake.setSnakeDirection(SnakeDirection.LEFT)
        break;
      case "ArrowRight":
        snake.setSnakeDirection(SnakeDirection.RIGHT)
        break;
      case "ArrowUp":
        snake.setSnakeDirection(SnakeDirection.TOP)
        break;
      case "ArrowDown":
        snake.setSnakeDirection(SnakeDirection.BOTTOM)
        break;
    }
  }

  document.addEventListener('keydown', handleArrow, false)

  useEffect(() => {
    snake.run()
  }, [])



  return (
    <div
      className="App"
    >
      <div>{numberOfApple}</div>
      {snakeBoard.map((line, i) => (
        <div key={i} className="Line">
          {line.map((squareType, i) => (
            <Square key={i} type={squareType} />
          ))}
        </div> 
      ))}
    </div>
  );
}

export default App;