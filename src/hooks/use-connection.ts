import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { useUndo } from './use-undo'
import { toast } from 'sonner'
import { useAppSelector } from './redux'

export const useConnection = () => {
  const { username, sessionId } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw()
  const { save, undo, redo } = useUndo()
  const connection = (socket: Socket) => {
    socket.emit('connection', { name: username, id: sessionId })
    socket.on('connection', (message: string) => {
      toast.success(message)
    })
    draw(socket)
    socket.on('finish', () => {
      finish()
    })
    socket.on('save', (data: string) => {
      save(data)
    })
    socket.on('undo', () => {
      undo()
    })
    socket.on('redo', () => {
      redo()
    })
  }
  return connection
}
