import { Message } from '@/interfaces/message'
import Tool from './tool'
import { Brush as IBrush } from '@/interfaces/brush'
import { Figures } from '@/interfaces/figure'

export default class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id)
    this.listen()
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }
  mouseUpHandler() {
    this.mouseDown = false
    const message: Message<any> = {
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      },
    }
    this.socket.send(JSON.stringify(message))
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    )
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      const message: Message<IBrush> = {
        method: 'draw',
        id: this.id,
        figure: {
          type: Figures.brush,
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          color: this.ctx?.fillStyle,
        },
      }
      this.socket.send(JSON.stringify(message))
    }
  }
  static draw(args: DrawArgs) {
    args.ctx.fillStyle = args.color
    args.ctx?.lineTo(args.x, args.y)
    args.ctx?.stroke()
  }
}
interface DrawArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
}
