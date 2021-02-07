import Snake from './Snake';
import { BoardElement, SnakeDirection } from './const/snake';

// 1. DONE | Инициализировать доску(Поставить змею и установить направление)
// 2. DONE | По нажатию кнопки направления начинается игра по указанному направлению
// 3. DONE | Если встречается яблоко, то увеличивается длина и ускоряется змея
// 4. Если змея врезается в себя или в стену игра заканчивается

describe('should get a cool game without errors)))', () => {
  // конечно граничные значения, как то что змея длиннее доски в одну линию,
  // я не буду обрабатывать в этом пример, надеюсь вы понимаете почему)
  describe('should init right props', () => {
    it('should get init board props', () => {
      const snake = new Snake()

      expect(snake.boardSize).toEqual(16)
      expect(snake.snakeDirection).toEqual(SnakeDirection.RIGHT)
      expect(snake.snake).toEqual([[2, 3], [2, 4]])
      expect(snake.apple).toEqual([1, 1])
    })
    it('should get special board props', () => {
      const snake = new Snake({
        boardSize: 10,
        snake: [[5, 5], [6, 5]],
      })

      expect(snake.boardSize).toEqual(10)
      expect(snake.snake).toEqual([[5, 5], [6, 5]])
    })
    it('should get init board', () => {
      const snake = new Snake({
        boardSize: 6,
      })
      const { EMPTY, SNAKE, APPLE } = BoardElement
      const expectBoard = [
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, APPLE, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, SNAKE, SNAKE, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]

      const board = snake.board

      expect(board).toEqual(expectBoard)
    })
    it('should get board with snake | RIGHT SNAKE | LENGHT 2', () => {
      const snake = new Snake({
        boardSize: 6,
        snake: [[0, 1], [0, 2]]
      })
      const { EMPTY, SNAKE, APPLE } = BoardElement
      const expectBoard = [
        [EMPTY, SNAKE, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, APPLE, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]

      const board = snake.board

      expect(board).toEqual(expectBoard)
    })
    it('should get board with snake | BOTTOM SNAKE | LENGHT 3', () => {
      const snake = new Snake({
        boardSize: 6,
        snake: [[1, 2], [2, 2], [3, 2]],
      })
      const { EMPTY, SNAKE, APPLE } = BoardElement
      const expectBoard = [
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, APPLE, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]

      const board = snake.board

      expect(board).toEqual(expectBoard)
    })
    it('should set new snake on board', () => {
      const snake = new Snake({
        boardSize: 6,
        snake: [[1, 2], [2, 2], [3, 2]],
      })
      const { EMPTY, SNAKE, APPLE } = BoardElement
      const expectBoard = [
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, APPLE, EMPTY, EMPTY, EMPTY, SNAKE],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, SNAKE],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]

      snake.setSnakeOnBoard([[1, 5], [2, 5]])
      const board = snake.board

      expect(board).toEqual(expectBoard)
    })
    it('should set apple on board', () => {
      const snake = new Snake({
        boardSize: 6,
        snake: [[1, 2], [2, 2], [3, 2]],
      })
      const { EMPTY, SNAKE, APPLE } = BoardElement
      const expectBoard = [
        [APPLE, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, SNAKE, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]

      snake.setAppleOnBoard([0, 0])
      const board = snake.board

      expect(board).toEqual(expectBoard)
    })
  })

  describe('should start game', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('should start the game after fire run method', () => {
      const snake = new Snake()

      snake.run()

      expect(setInterval).toBeCalledTimes(1)      
    })
    it('should change position for the snake with the default speed', () => {
      const snake = new Snake()
      const ExpectSnakePosition = [[2, 4], [2, 5]]

      snake.run()
      
      jest.advanceTimersByTime(1500)
      expect(snake.snake).toEqual(ExpectSnakePosition)
    })
    it('should change position for snake with new direction', () => {
      const snake = new Snake({
        snake: [[2, 4], [2, 5], [2, 6]]
      })
      const ExpectSnakePosition = [[2, 5], [2, 6], [3, 6]]

      snake.run()
      snake.setSnakeDirection(SnakeDirection.BOTTOM)

      jest.advanceTimersByTime(1500)
      expect(snake.snake).toEqual(ExpectSnakePosition)
    })
  })

  describe('should eat apple', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('should set new apple after eating prev', () => {
      const [AppleX, AppleY] = [1, 3]
      const snake = new Snake({
        boardSize: 9,
        snake: [[1, 0], [1, 1]],
        apple: [AppleX, AppleY]
      })
      snake.getNewAppleCoordinate = () => [0, 0]

      snake.run()

      jest.advanceTimersByTime(2500)
      expect(snake.apple).toEqual([0, 0])
      expect(snake.board[AppleX][AppleY]).toEqual(BoardElement.SNAKE)
    })
    it('should increase length after eating', () => {
      const snake = new Snake({
        boardSize: 9,
        snake: [[1, 0], [1, 1]],
        apple: [1, 3]
      })

      snake.run()

      jest.advanceTimersByTime(2500)
      expect(snake.snake).toEqual([[1, 1], [1, 2], [1, 3]])
    })
    it('should increase length after eating for curve snake', () => {
      const snake = new Snake({
        boardSize: 9,
        snake: [[1, 2], [1, 3], [2, 3]],
        apple: [2, 4]
      })

      snake.run()

      jest.advanceTimersByTime(1500)
      expect(snake.snake).toEqual([[1, 2], [1, 3], [2, 3], [2, 4]])
    })
    it('should increase speed after eating', () => {
      const snake = new Snake({
        boardSize: 9,
        snake: [[1, 0], [1, 1]],
        apple: [1, 3]
      })
      snake.getNewAppleCoordinate = () => [0, 0]

      snake.run()

      jest.advanceTimersByTime(2000)
      expect(snake.snakeSpeed).toEqual(950)
      jest.advanceTimersByTime(950)
      expect(snake.snake).toEqual([[1, 2], [1, 3], [1, 4]])
    })
  })

  describe('should stop game', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('should stop the snake game to eat itself', () => {
      const expectSnake = [[2, 1], [2, 2], [2, 3], [3, 3], [3, 2]]
      const snake = new Snake({
        boardSize: 9,
        snake: [[2, 1], [2, 2], [2, 3], [3, 3], [3, 2]]
      })
      snake.getNewAppleCoordinate = () => [0, 0]

      snake.run()
      snake.setSnakeDirection(SnakeDirection.TOP)

      jest.advanceTimersByTime(1000)
      expect(snake.snake).toEqual(expectSnake)
      jest.advanceTimersByTime(2000)
      expect(snake.snake).toEqual(expectSnake)
    })
    it('should stop the snake game to eat board', () => {
      const expectSnake = [[2, 6], [2, 7], [2, 8]]
      const snake = new Snake({
        boardSize: 9,
        snake: [[2, 5], [2, 6], [2, 7]]
      })
      snake.getNewAppleCoordinate = () => [0, 0]

      snake.run()

      jest.advanceTimersByTime(2000)
      expect(snake.snake).toEqual(expectSnake)
      jest.advanceTimersByTime(2000)
      expect(snake.snake).toEqual(expectSnake)
    })
  })
})