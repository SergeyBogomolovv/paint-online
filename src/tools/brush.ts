import { DrawMessage, MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { FinishMessage } from '@/interfaces/finish-message'

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
    const message: FinishMessage = {
      method: 'finish',
      id: this.id,
    }
    this.socket.send(JSON.stringify(message))
  }
  mouseDownHandler(e: MouseEvent) {
    const { offsetX, offsetY } = e
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(offsetX, offsetY)
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const { offsetX, offsetY } = e
      const message: DrawMessage = {
        method: 'draw',
        id: this.id,
        type: MessageFigures.brush,
        figure: {
          lineCap: this.ctx?.lineCap!,
          x: offsetX,
          y: offsetY,
          color: this.ctx?.fillStyle.toString()!,
          lineWidth: this.ctx?.lineWidth!,
        },
      }
      this.socket.send(JSON.stringify(message))
    }
  }
  static draw(args: DrawArgs) {
    args.ctx.lineCap = args.lineCap
    args.ctx.fillStyle = args.color
    args.ctx.strokeStyle = args.color
    args.ctx.lineWidth = args.lineWidth
    args.ctx.lineTo(args.x, args.y)
    args.ctx.stroke()
  }
}
interface DrawArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  color: string
  lineWidth: number
  lineCap: 'butt' | 'square' | 'round'
}
