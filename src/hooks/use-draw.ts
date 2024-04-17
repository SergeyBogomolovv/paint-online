import { useAppSelector } from '@/hooks/redux'
import { Message } from '@/interfaces/message'
import Brush from '@/tools/brush'
import Rect from '@/tools/rect'

export const useDraw = () => {
  const { canvas } = useAppSelector((state) => state.canvas)
  const draw = (msg: Message<any>) => {
    const ctx = canvas!.getContext('2d')
    const figure = msg.figure
    switch (figure.type) {
      case 'brush':
        Brush.draw({
          color: figure.color,
          ctx: ctx!,
          y: figure.y,
          x: figure.x,
        })
        break
      case 'rect':
        Rect.drawRect({
          color: figure.color,
          ctx: ctx!,
          y: figure.y,
          x: figure.x,
          h: figure.width,
          w: figure.width,
        })
        break
      case 'finish':
        ctx?.beginPath()
        break
    }
  }
  return draw
}
