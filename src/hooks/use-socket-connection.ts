import { useAppSelector } from '@/hooks/redux'
import { useDraw } from '@/hooks/use-draw'
import { Message } from '@/interfaces/message'
import { toast } from 'sonner'

export const useSocketConnection = () => {
  const { username, sessionId } = useAppSelector((state) => state.canvas)
  const draw = useDraw()
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
      const msg: Message = JSON.parse(event.data)
      switch (msg.method) {
        case 'connection':
          toast.success(`Пользователь ${msg.username} подключился`)
          break
        case 'draw':
          draw(msg)
          break
        case 'undo':
          draw(msg)
          break
      }
    }
  }
  return { onMessage, onOpen }
}
