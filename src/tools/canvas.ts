export default class Tool {
  canvas: HTMLCanvasElement
  mouseDown: boolean
  ctx: CanvasRenderingContext2D | null
  socket: WebSocket
  id: string

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    this.mouseDown = false
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
    this.socket = socket
    this.id = id
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
  destroyEvents() {
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
    this.canvas.onmouseup = null
  }
}
