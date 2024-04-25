import Tool from './tool'
import { Socket } from 'socket.io-client'

export default class Eraser extends Tool {
  prevColor: string | CanvasGradient | CanvasPattern
  constructor(canvas: HTMLCanvasElement, socket: Socket) {
    super(canvas, socket)
    this.listen()
    this.prevColor = ''
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
  }
  mouseLeaveHandler() {
    this.ctx!.fillStyle = this.prevColor
    this.ctx!.strokeStyle = this.prevColor
  }
  mouseUpHandler() {
    this.mouseDown = false
    this.ctx!.fillStyle = this.prevColor
    this.ctx!.strokeStyle = this.prevColor
    this.socket.emit('finish')
  }
  mouseDownHandler(e: MouseEvent) {
    const { offsetX, offsetY } = e
    this.mouseDown = true
    this.ctx?.beginPath()
    this.prevColor = this.ctx!.fillStyle
    this.ctx!.fillStyle = 'white'
    this.ctx!.strokeStyle = 'white'
    this.ctx?.moveTo(offsetX, offsetY)
    this.ctx?.lineTo(offsetX, offsetY)
    this.ctx?.stroke()
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const { offsetX, offsetY } = e
      this.socket.emit('draw', {
        type: 'eraser',
        figure: {
          x: offsetX,
          y: offsetY,
          color: 'white',
          lineWidth: this.ctx?.lineWidth,
          lineCap: this.ctx?.lineCap!,
        },
      })
    }
  }
  static erase(args: EraseArgs) {
    args.ctx.lineCap = args.lineCap
    args.ctx.fillStyle = args.color
    args.ctx.strokeStyle = args.color
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
  color: string
  lineCap: 'butt' | 'square' | 'round'
}
