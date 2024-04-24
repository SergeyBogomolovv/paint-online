import { Socket } from 'socket.io-client'
import { useDraw } from './use-draw'
import { useUndo } from './use-undo'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from './redux'
import { DataMessage } from '@/interfaces/data-message'
import axios from 'axios'
import { useState } from 'react'
import { pushToRedo, pushToUndo } from '@/redux/slices/canvas-slice'

export const useConnection = () => {
  const { username, sessionId, canvas } = useAppSelector(
    (state) => state.canvas
  )
  const dispatch = useAppDispatch()
  const [pending, setPending] = useState(false)
  const { draw, finish } = useDraw()
  const { save, undo, redo } = useUndo()
  const connect = async (id: string) => {
    setPending(true)
    const response = await axios.get(`http://localhost:5174/drawing/${id}`)
    setPending(false)
    if (response.data) {
      const ctx = canvas?.getContext('2d')
      const img = new Image()
      img.src = response.data.data
      img.onload = async () => {
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx?.drawImage(img, 0, 0, canvas!.width, canvas!.height)
      }
      response.data.undoList.forEach((data: string) => {
        const img = new Image()
        img.src = data
        dispatch(pushToUndo(img))
      })
      response.data.redoList.forEach((data: string) => {
        const img = new Image()
        img.src = data
        dispatch(pushToRedo(img))
      })
    }
  }
  const create = async (data: { data: string; key: string }) => {
    await axios.post('http://localhost:5174/drawing', data)
  }
  const listeners = (socket: Socket) => {
    socket.emit('connection', { name: username, id: sessionId })
    socket.on('data', (data: DataMessage) => {
      console.log(data)
    })
    socket.on('connection', (message: any) => {
      toast.success(message.message)
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
  return { listeners, create, connect, pending }
}
