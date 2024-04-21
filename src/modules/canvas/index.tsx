import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCanvas, setSocket } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { Navigate } from 'react-router'
import { useSocketConnection } from '@/hooks/use-socket-connection'
import { ActionMessage } from '@/interfaces/undo-message'
import { io } from 'socket.io-client'
import { toast } from 'sonner'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username, sessionId, canvas, socket } = useAppSelector(
    (state) => state.canvas
  )
  const dispatch = useAppDispatch()
  const { onMessage, onOpen } = useSocketConnection()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && username) {
      const sock = io('http://localhost:5174')
      sock.emit(
        'connection',
        { name: username, id: sessionId },
        (message: string) => {
          toast.success(message)
        }
      )
      sock.on('connection', (message: string) => {
        toast.success(message)
      })
      const socket = new WebSocket(`ws://localhost:5174/`)
      dispatch(setTool(new Brush(canvas, socket, sessionId!)))
      dispatch(setSocket(socket))
      onMessage(socket)
      onOpen(socket)
    }
  }, [username, canvas])

  return (
    <>
      {username && sessionId ? (
        <canvas
          onMouseDown={() => {
            const data = canvasRef.current!.toDataURL()
            const message: ActionMessage = {
              id: sessionId,
              method: 'action',
              type: 'save',
              data,
            }
            socket?.send(JSON.stringify(message))
          }}
          className='mx-auto bg-white rounded-lg '
          ref={canvasRef}
          width={1500}
          height={750}
        />
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  )
}
