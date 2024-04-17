import { Message } from '@/interfaces/message'
import Tool from './tool'
import { Figures } from '@/interfaces/figure'
import { Circle as ICircle } from '@/interfaces/circle'
export default class Circle extends Tool {
  startX: number
  startY: number
  saved: string
  radius: number
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id)
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
    const message: Message<ICircle> = {
      method: 'draw',
      id: this.id,
      figure: {
        type: Figures.circle,
        x: this.startX,
        y: this.startY,
        color: this.ctx?.fillStyle,
        radius: this.radius,
      },
    }
    this.socket.send(JSON.stringify(message))
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
      this.ctx?.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }

  static drawCircle(args: DrawCircleArgs) {
    args.ctx.fillStyle = args.color
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
