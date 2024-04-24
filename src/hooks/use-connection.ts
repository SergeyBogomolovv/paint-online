import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { useUndo } from './use-undo'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import axios from 'axios'
import { nullRedo, nullUndo } from '@/redux/slices/canvas-slice'
import { ConnectionMessage } from '@/interfaces/connection-message'
import { ConnectionResponse } from '@/interfaces/connection-response'

export const useConnection = () => {
  const dispatch = useAppDispatch()
  const { username, title, canvas } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw()
  const { save, undo, redo } = useUndo()
  const connect = async (title: string) => {
    const response = await axios.get<ConnectionResponse>(
      `${import.meta.env.VITE_SERVER_URL}/drawing/${title}`
    )
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = response.data.data
    img.onload = async () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
    }
  }
  const listeners = (socket: Socket) => {
    socket.emit('connection', { name: username, title: title })
    socket.on('connection', (message: ConnectionMessage) => {
      dispatch(nullRedo())
      dispatch(nullUndo())
      toast.success(message.message)
    })
    draw(socket)
    socket.on('finish', () => {
      finish()
    })
    socket.on('save', () => {
      const data = canvas?.toDataURL()!
      save(data)
    })
    socket.on('undo', () => {
      undo()
    })
    socket.on('redo', () => {
      redo()
    })
  }
  return { listeners, connect }
}
