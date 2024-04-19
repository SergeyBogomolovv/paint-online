import { IBrush } from './brush'
import { ICircle } from './circle'
import { Figure } from './figure'
import { ILine } from './line'
import { IRect } from './rect'

export interface DrawMessage {
  id: string
  method: 'draw'
  figure: Figure | IBrush | ILine | IRect | ICircle
  type: MessageFigures
}

export enum MessageFigures {
  brush = 'brush',
  circle = 'circle',
  eraser = 'eraser',
  line = 'line',
  rect = 'rect',
}
