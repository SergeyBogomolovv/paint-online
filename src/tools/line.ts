import { MessageFigures } from '@/interfaces/message-figures'
import Tool from './tool'
import { Socket } from 'socket.io-client'

export default class Line extends Tool {
  currentX: number
  currentY: number
  x: number
  y: number
  saved: string
  constructor(canvas: HTMLCanvasElement, socket: Socket) {
    super(canvas, socket)
    this.listen()
    this.currentX = 0
    this.currentY = 0
    this.x = 0
    this.y = 0
    this.saved = ''
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }
  mouseDownHandler(e: MouseEvent) {
    const { offsetX, offsetY } = e
    this.mouseDown = true
    this.currentX = offsetX
    this.currentY = offsetY
    this.ctx?.beginPath()
    this.ctx?.moveTo(this.currentX, this.currentY)
    this.saved = this.canvas.toDataURL()
  }
  mouseUpHandler() {
    this.mouseDown = false
    this.socket.emit('draw', {
      type: MessageFigures.line,
      figure: {
        x: this.x,
        y: this.y,
        currentX: this.currentX,
        currentY: this.currentY,
        color: this.ctx?.fillStyle.toString()!,
        lineWidth: this.ctx?.lineWidth!,
        lineCap: this.ctx?.lineCap!,
      },
    })
    this.socket.emit('finish')
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const { offsetX, offsetY } = e
      this.x = offsetX
      this.y = offsetY
      this.draw(this.x, this.y)
    }
  }
  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = async () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.moveTo(this.currentX, this.currentY)
      this.ctx?.lineTo(x, y)
      this.ctx?.stroke()
    }
  }
  static drawLine(args: DrawArgs) {
    args.ctx.lineCap = args.lineCap
    args.ctx.fillStyle = args.color
    args.ctx.strokeStyle = args.color
    args.ctx.lineWidth = args.lineWidth
    args.ctx.beginPath()
    args.ctx.moveTo(args.currentX, args.currentY)
    args.ctx.lineTo(args.x, args.y)
    args.ctx.stroke()
  }
}
interface DrawArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  currentX: number
  currentY: number
  lineWidth: number
  lineCap: 'butt' | 'square' | 'round'
  color: string
}
