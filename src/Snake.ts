import { SnakeDirection } from './const/snake'

interface ISnake {
  bordSize?: number,
  snakeDirection?: SnakeDirection,
  snakeSize?: number
}

export default class Snake {
  boardSize = 16
  snakeSize = 3
  snakeDirection = SnakeDirection.RIGHT

  constructor(init?: ISnake ) {
    if (init?.bordSize) this.boardSize = init.bordSize
    if (init?.snakeDirection) this.snakeDirection = init.snakeDirection
    if (init?.snakeSize) this.snakeSize = init.snakeSize
  }


  getBoard() {


  }

}