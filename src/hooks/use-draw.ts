import { useAppSelector } from '@/hooks/redux'
import { Message } from '@/interfaces/message'
import Brush from '@/tools/brush'
import Circle from '@/tools/circle'
import Rect from '@/tools/rect'

export const useDraw = () => {
  const { canvas } = useAppSelector((state) => state.canvas)
  const draw = (msg: Message<any>) => {
    const ctx = canvas!.getContext('2d')
    const figure = msg.figure
    switch (figure.type) {
      case 'brush':
        Brush.draw({
          ctx: ctx!,
          ...figure,
        })
        break
      case 'rect':
        Rect.drawRect({
          ...figure,
          ctx: ctx!,
        })
        break
      case 'circle':
        Circle.drawCircle({
          ctx: ctx!,
          ...figure,
        })
        break
      case 'finish':
        ctx?.beginPath()
        break
    }
  }
  return draw
}
