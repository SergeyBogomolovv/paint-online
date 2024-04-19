import { DrawMessage, MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { FinishMessage } from '@/interfaces/finish-message'

export default class Line extends Tool {
  name: string
  currentX: number
  currentY: number
  x: number
  y: number
  saved: string
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id)
    this.listen()
    this.name = 'Line'
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

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.currentX = e.pageX - e.target.offsetLeft
    this.currentY = e.pageY - e.target.offsetTop
    this.ctx?.beginPath()
    this.ctx?.moveTo(this.currentX, this.currentY)
    this.saved = this.canvas.toDataURL()
  }
  mouseUpHandler() {
    this.mouseDown = false
    const message: DrawMessage = {
      method: 'draw',
      id: this.id,
      type: MessageFigures.line,
      figure: {
        x: this.x,
        y: this.y,
        currentX: this.currentX,
        currentY: this.currentY,
        color: this.ctx?.fillStyle.toString()!,
        lineWidth: this.ctx?.lineWidth,
      },
    }
    const finish: FinishMessage = {
      method: 'finish',
      id: this.id,
    }
    this.socket.send(JSON.stringify(message))
    this.socket.send(JSON.stringify(finish))
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.x = e.pageX - e.target.offsetLeft
      this.y = e.pageY - e.target.offsetTop
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
  color: string
}
