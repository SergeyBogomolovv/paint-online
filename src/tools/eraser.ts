import { MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { Socket } from 'socket.io-client'

export default class Eraser extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
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
    this.socket.emit('finish')
  }
  mouseDownHandler(e: MouseEvent) {
    const { offsetX, offsetY } = e
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(offsetX, offsetY)
    this.ctx?.lineTo(offsetX, offsetY)
    this.ctx?.stroke()
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const { offsetX, offsetY } = e
      this.socket.emit('draw', {
        type: MessageFigures.eraser,
        figure: {
          x: offsetX,
          y: offsetY,
          color: this.ctx?.fillStyle.toString()!,
          lineWidth: this.ctx?.lineWidth,
          lineCap: this.ctx?.lineCap!,
        },
      })
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
