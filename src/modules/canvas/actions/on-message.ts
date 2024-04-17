import { Message } from '@/interfaces/message'
import { toast } from 'sonner'

export const onMessage = (
  socket: WebSocket,
  draw: (msg: Message<any>) => void
) => {
  socket.onmessage = (event) => {
    const msg: Message<any> = JSON.parse(event.data)
    switch (msg.method) {
      case 'connection':
        toast.success(`Пользователь ${msg.username} подключился`)
        break
      case 'draw':
        draw(msg)
        break
    }
  }
}
