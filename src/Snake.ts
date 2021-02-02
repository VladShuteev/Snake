import { BoardElement, SnakeDirection } from './const/snake'

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
  }

  setAppleOnBoard(apple: number[]) {
    const [prevAppleX, prevAppleY] = this.apple
    const [appleX, appleY] = apple

    if (this.board[prevAppleX][prevAppleY] !== BoardElement.SNAKE) {
      this.board[prevAppleX][prevAppleY] = BoardElement.EMPTY
    }

    this.board[appleX][appleY] = BoardElement.APPLE
  }

  setSnakeDirection(direction: SnakeDirection) {
    this.snakeDirection = direction
  }

  run() {

  }
}