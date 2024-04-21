import { Socket } from 'socket.io-client'

export default class Tool {
  canvas: HTMLCanvasElement
  mouseDown: boolean
  ctx: CanvasRenderingContext2D | null
  socket: Socket

  constructor(canvas: HTMLCanvasElement, socket: Socket) {
    this.mouseDown = false
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
    this.socket = socket
  }
  set lineCap(type: 'round' | 'butt' | 'square') {
    this.ctx!.lineCap = type
  }
  set fillStyle(color: string) {
    this.ctx!.fillStyle = color
  }
  set strokeStyle(color: string) {
    this.ctx!.strokeStyle = color
  }
  set lineWidth(width: number) {
    this.ctx!.lineWidth = width
  }
  get lineWidth() {
    return this.ctx!.lineWidth
  }
  destroyEvents() {
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
    this.canvas.onmouseup = null
  }
}
