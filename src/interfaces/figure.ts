export interface Figure {
  type: Figures
  x: number
  y: number
  color: string | CanvasGradient | CanvasPattern | undefined
}

export enum Figures {
  brush = 'brush',
  circle = 'circle',
  eraser = 'eraser',
  line = 'line',
  rect = 'rect',
  finish = 'finish',
}
