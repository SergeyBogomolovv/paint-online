export interface DrawMessage {
  figure: any
  type: MessageFigures
}

export enum MessageFigures {
  brush = 'brush',
  circle = 'circle',
  eraser = 'eraser',
  line = 'line',
  rect = 'rect',
}
