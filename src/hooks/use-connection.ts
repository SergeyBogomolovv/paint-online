import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import axios from 'axios'
import { nullLists, pushToUndo } from '@/redux/slices/canvas-slice'
import { ConnectionMessage } from '@/interfaces/connection-message'
import { ConnectionResponse } from '@/interfaces/connection-response'
import { undo, redo } from '@/redux/slices/canvas-slice'

export const useConnection = (socket: Socket) => {
  const dispatch = useAppDispatch()
  const { username, title, canvas } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw(socket)
  const listeners = [
    {
      event: 'connection',
      action: (message: ConnectionMessage) => {
        dispatch(nullLists())
        toast.success(message.message)
      },
    },
    {
      event: 'finish',
      action: () => {
        finish()
      },
    },
    {
      event: 'save',
      action: () => {
        const img = new Image()
        img.src = canvas?.toDataURL()!
        dispatch(pushToUndo(img))
      },
    },
    {
      event: 'undo',
      action: () => {
        dispatch(undo())
      },
    },
    {
      event: 'redo',
      action: () => {
        dispatch(redo())
      },
    },
  ]

  return async () => {
    socket.emit('connection', { name: username, title: title })
    const { data: res } = await axios.get<ConnectionResponse>(
      `${import.meta.env.VITE_SERVER_URL}/drawing/${title}`
    )
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = res.data
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
    }
    listeners.forEach(({ event, action }) => {
      socket.on(event, action)
    })
    draw()
  }
}
