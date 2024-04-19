import { DrawMessage, MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { FinishMessage } from '@/interfaces/finish-message'

export default class Eraser extends Tool {
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
    const message: FinishMessage = {
      method: 'finish',
      id: this.id,
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
      const message: DrawMessage = {
        method: 'draw',
        id: this.id,
        type: MessageFigures.eraser,
        figure: {
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          color: this.ctx?.fillStyle.toString()!,
          lineWidth: this.ctx?.lineWidth,
        },
      }
      this.socket.send(JSON.stringify(message))
    }
  }
  static erase(args: EraseArgs) {
    args.ctx.fillStyle = 'white'
    args.ctx.strokeStyle = 'white'
    args.ctx.lineWidth = args.lineWidth
    args.ctx.lineTo(args.x, args.y)
    args.ctx.stroke()
  }
}
interface EraseArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  lineWidth: number
}
