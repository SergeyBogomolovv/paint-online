import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import axios from 'axios'
import {
  nullLists,
  pushToUndo,
  removeConnectedUser,
  setConnectedUsers,
} from '@/redux/slices/canvas-slice'
import { undo, redo } from '@/redux/slices/canvas-slice'
import { ZodError, z } from 'zod'
import { ConnectionResponseSchema } from '@/schemas/connection-response'
import { DisconnectionMessageSchema } from '@/schemas/disconnection-message'
import { ConnectionMessageSchema } from '@/schemas/connection-message'

export const useConnection = (socket: Socket) => {
  const dispatch = useAppDispatch()
  const { username, title, canvas } = useAppSelector((state) => state.canvas)
  const { draw, finish } = useDraw(socket)
  const listeners = [
    {
      event: 'disconnection',
      action: (message: z.infer<typeof DisconnectionMessageSchema>) => {
        try {
          const validateMessage = DisconnectionMessageSchema.parse(message)
          dispatch(removeConnectedUser(validateMessage.id))
          toast.success(`Пользователь ${validateMessage.name} отключился`)
        } catch (error) {
          if (error instanceof ZodError) {
            toast.error('User disconnection error')
          }
        }
      },
    },
    {
      event: 'connection',
      action: (message: z.infer<typeof ConnectionMessageSchema>) => {
        try {
          const validateMessage = ConnectionMessageSchema.parse(message)
          dispatch(nullLists())
          dispatch(setConnectedUsers(validateMessage.users))
          toast.success(`Пользователь ${validateMessage.name} подключился`)
        } catch (error) {
          if (error instanceof ZodError) {
            toast.error('User connection error')
          }
        }
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
    listeners.forEach(({ event, action }) => {
      socket.on(event, action)
    })
    const { data: res } = await axios.get<
      z.infer<typeof ConnectionResponseSchema>
    >(`${import.meta.env.VITE_SERVER_URL}/drawing/${title}`)
    try {
      const validatedData = ConnectionResponseSchema.parse(res)
      const ctx = canvas?.getContext('2d')
      const img = new Image()
      img.src = validatedData.data
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
      }
      draw()
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error('Connection error')
      }
    }
  }
}
