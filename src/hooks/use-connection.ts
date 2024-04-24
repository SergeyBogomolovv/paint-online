import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { useUndo } from './use-undo'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import axios from 'axios'
import { nullRedo, nullUndo } from '@/redux/slices/canvas-slice'

export const useConnection = () => {
  const dispatch = useAppDispatch()
  const { username, title, canvas } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw()
  const { save, undo, redo } = useUndo()
  const connect = async (title: string) => {
    const response = await axios.get(`http://localhost:5174/drawing/${title}`)
    if (response.data) {
      const ctx = canvas?.getContext('2d')
      const img = new Image()
      img.src = response.data.data
      img.onload = async () => {
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
      }
    }
  }

  const listeners = (socket: Socket) => {
    socket.emit('connection', { name: username, id: title })
    socket.on('connection', (message: any) => {
      dispatch(nullRedo())
      dispatch(nullUndo())
      toast.success(message.message)
    })
    draw(socket)
    socket.on('finish', () => {
      finish()
    })
    socket.on('push', (data: string) => {
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
