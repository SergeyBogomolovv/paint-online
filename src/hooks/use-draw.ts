import { useAppSelector } from '@/hooks/redux'
import { Figures } from '@/schemas/figures'
import Brush from '@/tools/brush'
import Circle from '@/tools/circle'
import Eraser from '@/tools/eraser'
import Line from '@/tools/line'
import Rect from '@/tools/rect'
import { Socket } from 'socket.io-client'

export const useDraw = (socket: Socket) => {
  const figures = ['brush', 'circle', 'eraser', 'rect', 'line']
  const { canvas } = useAppSelector((state) => state.canvas)
  const finish = () => {
    const ctx = canvas?.getContext('2d')
    ctx?.beginPath()
  }
  const draw = () => {
    figures.forEach((figure) => {
      socket.on(figure, (res) => {
        const ctx = canvas?.getContext('2d')
        const prevColor = canvas?.getContext('2d')?.fillStyle
        const prevlineWidth = canvas?.getContext('2d')?.lineWidth
        const prevlineCap = canvas?.getContext('2d')?.lineCap
        if (figure === Figures.Enum.brush) Brush.draw({ ctx: ctx!, ...res })
        if (figure === Figures.Enum.circle)
          Circle.drawCircle({ ctx: ctx!, ...res })
        if (figure === Figures.Enum.eraser) Eraser.erase({ ctx: ctx!, ...res })
        if (figure === Figures.Enum.rect) Rect.drawRect({ ctx: ctx!, ...res })
        if (figure === Figures.Enum.line) Line.drawLine({ ctx: ctx!, ...res })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        ctx!.lineCap = prevlineCap!
      })
    })
  }
  return { draw, finish }
}
