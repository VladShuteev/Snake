import { stringify } from 'querystring'
import { isThisTypeNode } from 'typescript'
import { AllowSnakeDirection, BoardElement, IAllowSnakeDirection, SnakeDirection } from './const/snake'

type TBoard = Array<Array<BoardElement>>
type TCoordinate = Array<number>
type TSnake = Array<TCoordinate>

interface ISnakeClass {
  boardSize?: number,
  snake?: TSnake
}


export default class Snake {
  boardSize = 16
  board: TBoard
  snake: TSnake = [[2, 3], [2, 4]]
  snakeDirection = SnakeDirection.RIGHT
  apple: TCoordinate = [1, 1]
  snakeSpeed = 1000
  timerId: number | undefined

  constructor(init?: ISnakeClass ) {
    if (init?.boardSize) this.boardSize = init.boardSize
    if (init?.snake) this.snake = init.snake

    this.board = this.getEmptyBoard()
    this.setSnakeOnBoard(this.snake)
    this.setAppleOnBoard(this.apple)
  }


  getEmptyBoard(): TBoard {
    const board: TBoard = []
    for(let i = 0; i < this.boardSize; i++) {
      board[i] = []
      for(let j = 0; j < this.boardSize; j++) {
          board[i][j] = BoardElement.EMPTY
      }
    }

    return board
  }

  setSnakeOnBoard(snake: TSnake) {
    this.board = this.getEmptyBoard()

    snake.forEach(([snakeX, snakeY]) => {
      this.board[snakeX][snakeY] = BoardElement.SNAKE
    })

    this.setAppleOnBoard(this.apple)
    this.snake = snake
  }

  setAppleOnBoard(apple: number[]) {
    const [prevAppleX, prevAppleY] = this.apple
    const [appleX, appleY] = apple
    this.apple = apple

    if (this.board[prevAppleX][prevAppleY] !== BoardElement.SNAKE) {
      this.board[prevAppleX][prevAppleY] = BoardElement.EMPTY
    }

    this.board[appleX][appleY] = BoardElement.APPLE
  }

  setSnakeDirection(direction: SnakeDirection) {
    const allowSnakeDirections: IAllowSnakeDirection = AllowSnakeDirection[this.snakeDirection]

    if (allowSnakeDirections[direction]) {
      this.snakeDirection = direction
    }
  }

  getSnakePosition(): TSnake {
    let newSnakePosition = [...this.snake.slice(1)] 
    const headOfSnake = newSnakePosition[newSnakePosition.length - 1]
    let newHeadOfSnake = [...headOfSnake]

    switch (this.snakeDirection) {
      case SnakeDirection.TOP:
        newHeadOfSnake[0]--
        break;
      case SnakeDirection.BOTTOM:
        newHeadOfSnake[0]++
        break;
      case SnakeDirection.LEFT:
        newHeadOfSnake[1]--
        break;
      case SnakeDirection.RIGHT:
        newHeadOfSnake[1]++
    }

    newSnakePosition.push(newHeadOfSnake)

    return newSnakePosition
  }

  updateGame() {
    const snake = this.getSnakePosition()
    this.setSnakeOnBoard(snake)
  }

  run() {
    this.timerId = window.setInterval(this.updateGame.bind(this), this.snakeSpeed)
  }
}