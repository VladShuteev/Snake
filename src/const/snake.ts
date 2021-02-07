// TOP && BOTTOM = j = 1
// LEFT && RIGHT = j = 1

export enum SnakeDirection {
    TOP = 'top',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
}

export interface IAllowSnakeDirection {
    [SnakeDirection.TOP]?: boolean
    [SnakeDirection.BOTTOM]?: boolean
    [SnakeDirection.LEFT]?: boolean
    [SnakeDirection.RIGHT]?: boolean
}

export const AllowSnakeDirection = {
    [SnakeDirection.TOP]: {
        [SnakeDirection.TOP]: true,
        [SnakeDirection.LEFT]: true,
        [SnakeDirection.RIGHT]: true
    },
    [SnakeDirection.BOTTOM]: {
        [SnakeDirection.BOTTOM]: true,
        [SnakeDirection.LEFT]: true,
        [SnakeDirection.RIGHT]: true
    },
    [SnakeDirection.RIGHT]: {
        [SnakeDirection.RIGHT]: true,
        [SnakeDirection.TOP]: true,
        [SnakeDirection.BOTTOM]: true
    },
    [SnakeDirection.LEFT]: {
        [SnakeDirection.LEFT]: true,
        [SnakeDirection.TOP]: true,
        [SnakeDirection.BOTTOM]: true
    },
}

export enum BoardElement {
    EMPTY,
    SNAKE,
    APPLE,
}