import { AllowSnakeDirection, BoardElement, IAllowSnakeDirection, SnakeDirection } from './const/snake'

export type TBoard = Array<Array<BoardElement>>
type TCoordinate = Array<number>
type TSnake = Array<TCoordinate>

interface ISnakeClass {
  boardSize?: number,
  snake?: TSnake
  apple?: TCoordinate
  boardReactHandler?: React.Dispatch<React.SetStateAction<TBoard>>
  appledReactHandler?: React.Dispatch<React.SetStateAction<number>>
}


export default class Snake {
  boardSize = 16
  board: TBoard
  snake: TSnake = [[2, 3], [2, 4]]
  snakeDirection = SnakeDirection.RIGHT
  apple: TCoordinate = [1, 1]
  numberOfApple = 0
  snakeSpeed = 500
  snakeSpeedDec = 20
  timerId: number | undefined
  boardReactHandler
  appledReactHandler

  constructor(init?: ISnakeClass ) {
    if (init?.boardSize) this.boardSize = init.boardSize
    if (init?.snake) this.snake = init.snake
    if (init?.apple) this.apple = init.apple
    if (init?.boardReactHandler) this.boardReactHandler = init.boardReactHandler
    if (init?.appledReactHandler) this.appledReactHandler = init.appledReactHandler

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

  getNewSnakePosition(): TSnake {
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

  checkContentOfSnake(snake: TSnake, square: TCoordinate): boolean {
    const [squareX, squareY] = square
    const foundSquare = snake.find(([snakeX, snakeY]) => squareX === snakeX && squareY === snakeY)
    
    return !!foundSquare
  }

  checkSnakeError(snake: TSnake): boolean {
    const snakeHeadCoordinate = snake.length - 1
    const snakeHead = snake[snakeHeadCoordinate]
    const snakeWithoutHead = snake.slice(0, snakeHeadCoordinate)
    const isHeadInSnake = this.checkContentOfSnake(snakeWithoutHead, snakeHead)
    const isHeadEqualEnd = this.checkContentOfSnake([snake[0]], snakeHead)
    const isHeadEqualBoard = snakeHead.some(coordinate => coordinate >= this.boardSize)

    return isHeadInSnake || isHeadEqualEnd || isHeadEqualBoard
  }

  getNewAppleCoordinate(): TCoordinate {
    const getRandomInt = () => Math.floor(Math.random() * Math.floor(this.boardSize))
    const appleX = getRandomInt()
    const appleY = getRandomInt()

    const apple = [appleX, appleY]

    if (this.checkContentOfSnake(this.snake, apple)) {
      return this.getNewAppleCoordinate()
    } else {
      return apple 
    }
  }

  updateGame() {
    let snake = this.getNewSnakePosition()

    if (this.checkSnakeError(snake)) {
      if (this.boardReactHandler) {
        alert('oooops you lose')
      }
      return this.stop()
    }

    if (this.checkContentOfSnake(snake, this.apple)) {
      this.setAppleOnBoard(this.getNewAppleCoordinate())
      snake.unshift(this.snake[0])
      this.snakeSpeed = this.snakeSpeed - this.snakeSpeedDec 
      this.stop()
      this.run()
      this.numberOfApple++
    }

    this.setSnakeOnBoard(snake)

    if (this.boardReactHandler) this.boardReactHandler(this.board)
    if (this.appledReactHandler) this.appledReactHandler(this.numberOfApple)
  }

  stop() {
    clearInterval(this.timerId)
  }

  run() {
    this.timerId = window.setInterval(this.updateGame.bind(this), this.snakeSpeed)
  }
}