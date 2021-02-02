import Snake from './Snake';
import { BoardElement, SnakeDirection } from './const/snake';

// 1. Инициализировать доску(Поставить змею и установить направление)
// 2. По нажатию кнопки направления начинается игра по указанному направлению
// 3. Если встречается яблоко, то увеличивается длина и ускоряется змея
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
})