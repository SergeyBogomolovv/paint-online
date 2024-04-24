import { MessageFigures } from '@/interfaces/draw-message'
import Tool from './tool'
import { Socket } from 'socket.io-client'
export default class Circle extends Tool {
  startX: number
  startY: number
  saved: string
  radius: number
  constructor(canvas: HTMLCanvasElement, socket: Socket) {
    super(canvas, socket)
    this.startX = 0
    this.startY = 0
    this.saved = ''
    this.radius = 0
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true
    let canvasData = this.canvas.toDataURL()
    this.ctx?.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = canvasData
  }
  mouseUpHandler() {
    this.mouseDown = false
    this.socket.emit('draw', {
      type: MessageFigures.circle,
      figure: {
        x: this.startX,
        y: this.startY,
        color: this.ctx?.fillStyle.toString()!,
        radius: this.radius,
        lineCap: this.ctx?.lineCap!,
      },
    })
    this.socket.emit('finish')
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let curentX = e.pageX - e.target.offsetLeft
      let curentY = e.pageY - e.target.offsetTop
      let width = curentX - this.startX
      let height = curentY - this.startY
      this.radius = Math.sqrt(width ** 2 + height ** 2)
      this.draw(this.startX, this.startY, this.radius)
    }
  }
  draw(x: number, y: number, r: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = async () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx!.lineWidth = 1
      this.ctx?.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }
  static drawCircle(args: DrawCircleArgs) {
    args.ctx.lineWidth = 1
    args.ctx.fillStyle = args.color
    args.ctx.strokeStyle = args.color
    args.ctx.beginPath()
    args.ctx.arc(args.x, args.y, args.radius, 0, 2 * Math.PI)
    args.ctx.fill()
    args.ctx.stroke()
  }
}

export interface DrawCircleArgs {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  color: string
}
