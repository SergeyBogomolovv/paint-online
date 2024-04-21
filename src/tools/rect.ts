import { MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { Socket } from 'socket.io-client'
export default class Rect extends Tool {
  startX: number
  startY: number
  saved: string
  width: number
  heigth: number
  constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
    super(canvas, socket, id)
    this.startX = 0
    this.heigth = 0
    this.width = 0
    this.startY = 0
    this.saved = ''
    this.listen()
  }
  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }
  mouseUpHandler() {
    this.mouseDown = false

    this.socket.emit('draw', {
      type: MessageFigures.rect,
      figure: {
        x: this.startX,
        y: this.startY,
        width: this.width,
        heigth: this.heigth,
        color: this.ctx?.fillStyle.toString()!,
        lineCap: this.ctx?.lineCap!,
      },
    })
    this.socket.emit('finish')
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      this.width = currentX - this.startX
      this.heigth = currentY - this.startY
      this.draw(this.startX, this.startY, this.width, this.heigth)
    }
  }
  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx!.lineWidth = 1
      this.ctx?.rect(x, y, w, h)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }
  static drawRect(args: DrawRectArgs) {
    args.ctx.lineWidth = 1
    args.ctx.fillStyle = args.color
    args.ctx.strokeStyle = args.color
    args.ctx.beginPath()
    args.ctx.rect(args.x, args.y, args.width, args.heigth)
    args.ctx.fill()
    args.ctx.stroke()
  }
}

export interface DrawRectArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  width: number
  heigth: number
  color: string
}
