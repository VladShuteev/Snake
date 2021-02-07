import React from 'react'
import { BoardElement } from '../const/snake'
import './Square.css'

const TYPE_CLASS = {
    [BoardElement.APPLE]: 'Apple',
    [BoardElement.SNAKE]: 'Snake',
    [BoardElement.EMPTY]: '',
}

function Square({ type }: { type: BoardElement}) {
    let typeClass = TYPE_CLASS[type]
    return <div className={`Square ${typeClass}`} />
}

export default React.memo(Square)
