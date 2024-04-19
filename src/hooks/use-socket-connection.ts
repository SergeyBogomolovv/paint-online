import { useAppSelector } from '@/hooks/redux'
import { useDraw } from '@/hooks/use-draw'
import { toast } from 'sonner'
import { useUndo } from './use-undo'

export const useSocketConnection = () => {
  const { username, sessionId } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw()
  const { push, undo, redo } = useUndo()
  const onOpen = (socket: WebSocket) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: sessionId,
          username,
          method: 'connection',
        })
      )
    }
  }
  const onMessage = (socket: WebSocket) => {
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      switch (msg.method) {
        case 'connection':
          toast.success(`Пользователь ${msg.username} подключился`)
          break
        case 'draw':
          draw(msg)
          break
        case 'finish':
          finish()
          break
        case 'action':
          switch (msg.type) {
            case 'save':
              push(msg)
              break
            case 'redo':
              redo()
              break
            case 'undo':
              undo()
              break
          }
      }
    }
  }
  return { onMessage, onOpen }
}
