import Snake from './Snake';
import { BoardElement, SnakeDirection } from './const/snake';

// 1. Инициализировать доску(Поставить змею и установить направление)
// 2. По нажатию кнопки направления начинается игра по указанному направлению
// 3. Если встречается яблоко, то увеличивается длина и ускоряется змея
// 4. Если змея врезается в себя или в стену игра заканчивается

describe('should get a cool game)))', () => {
  // конечно граничные значения, как то что змея длиннее доски в одну линию,
  // я не буду обрабатывать в этом пример, надеюсь вы понимаете почему)
  describe('should init right props', () => {
    it('should get init board props', () => {
      const snake = new Snake()

      expect(snake.boardSize).toEqual(16)
      expect(snake.snakeSize).toEqual(3)
      expect(snake.snakeDirection).toEqual(SnakeDirection.RIGHT)
    })
    it('should get special board props', () => {
      const snake = new Snake({
        bordSize: 10,
        snakeSize: 5,
        snakeDirection: SnakeDirection.LEFT,
      })

      expect(snake.boardSize).toEqual(10)
      expect(snake.snakeSize).toEqual(5)
      expect(snake.snakeDirection).toEqual(SnakeDirection.LEFT)
    })
    it('should get init board params', () => {
      const snake = new Snake({
        bordSize: 6,
        snakeSize: 2
      })
      const expectBoard = [
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
        [BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY, BoardElement.EMPTY],
      ]

      const board = snake.getBoard()

      expect(expectBoard).toEqual(board)
    })
  })
})