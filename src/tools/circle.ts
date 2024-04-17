import Tool from './canvas'

export default class Circle extends Tool {
  startX: number
  startY: number
  saved: string
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.startX = 0
    this.startY = 0
    this.saved = ''
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
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let curentX = e.pageX - e.target.offsetLeft
      let curentY = e.pageY - e.target.offsetTop
      let width = curentX - this.startX
      let height = curentY - this.startY
      let r = Math.sqrt(width ** 2 + height ** 2)
      this.draw(this.startX, this.startY, r)
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
}
