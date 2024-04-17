import Brush from './brush'

export default class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
  }

  draw(x: number, y: number) {
    this.ctx!.strokeStyle = 'rgb(219, 234, 254)'
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()
  }
}
