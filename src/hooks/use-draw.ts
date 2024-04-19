import { useAppSelector } from '@/hooks/redux'
import { IBrush } from '@/interfaces/brush'
import { ICircle } from '@/interfaces/circle'
import { DrawMessage, MessageFigures } from '@/interfaces/draw-message'
import { ILine } from '@/interfaces/line'
import { IRect } from '@/interfaces/rect'
import Brush from '@/tools/brush'
import Circle from '@/tools/circle'
import Eraser from '@/tools/eraser'
import Line from '@/tools/line'
import Rect from '@/tools/rect'

export const useDraw = () => {
  const { canvas } = useAppSelector((state) => state.canvas)
  const finish = () => {
    const ctx = canvas!.getContext('2d')
    ctx?.beginPath()
  }
  const draw = (msg: DrawMessage) => {
    const ctx = canvas!.getContext('2d')
    const prevColor = canvas!.getContext('2d')?.fillStyle
    const prevlineWidth = canvas!.getContext('2d')?.lineWidth
    switch (msg.type) {
      case MessageFigures.brush:
        const brush = msg.figure as IBrush
        Brush.draw({
          ctx: ctx!,
          ...brush,
          color: brush.color,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.rect:
        const rect = msg.figure as IRect
        Rect.drawRect({
          ctx: ctx!,
          ...rect,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.circle:
        const circle = msg.figure as ICircle
        Circle.drawCircle({
          ctx: ctx!,
          ...circle,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.eraser:
        const eraser = msg.figure as IBrush
        Eraser.erase({
          ctx: ctx!,
          ...eraser,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.line:
        const line = msg.figure as ILine
        Line.drawLine({ ctx: ctx!, ...line })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
    }
  }
  return { draw, finish }
}
