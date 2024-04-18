import { useAppSelector } from '@/hooks/redux'
import { IBrush } from '@/interfaces/brush'
import { ICircle } from '@/interfaces/circle'
import { ILine } from '@/interfaces/line'
import { Message, MessageFigures } from '@/interfaces/message'
import { IRect } from '@/interfaces/rect'
import Brush from '@/tools/brush'
import Circle from '@/tools/circle'
import Eraser from '@/tools/eraser'
import Line from '@/tools/line'
import Rect from '@/tools/rect'

export const useDraw = () => {
  const { canvas } = useAppSelector((state) => state.canvas)
  const draw = (msg: Message) => {
    let ctx = canvas!.getContext('2d')
    const prevColor = canvas!.getContext('2d')?.fillStyle
    const prevlineWidth = canvas!.getContext('2d')?.lineWidth
    switch (msg.type) {
      case MessageFigures.brush:
        const brush: IBrush = msg.figure
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
        const rect: IRect = msg.figure
        Rect.drawRect({
          ctx: ctx!,
          ...rect,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.circle:
        const circle: ICircle = msg.figure
        Circle.drawCircle({
          ctx: ctx!,
          ...circle,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.eraser:
        const eraser: IBrush = msg.figure
        Eraser.erase({
          ctx: ctx!,
          ...eraser,
        })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.line:
        const line: ILine = msg.figure
        Line.drawLine({ ctx: ctx!, ...line })
        ctx!.lineWidth = prevlineWidth!
        ctx!.fillStyle = prevColor!
        ctx!.strokeStyle = prevColor!
        break
      case MessageFigures.finish:
        ctx?.beginPath()
        break
    }
  }
  return draw
}
