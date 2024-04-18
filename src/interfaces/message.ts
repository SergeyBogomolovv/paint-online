export interface Message {
  method: 'draw' | 'connection'
  id: string
  figure: any
  type: MessageFigures
  username?: string
}

export enum MessageFigures {
  brush = 'brush',
  circle = 'circle',
  eraser = 'eraser',
  line = 'line',
  rect = 'rect',
  finish = 'finish',
}
