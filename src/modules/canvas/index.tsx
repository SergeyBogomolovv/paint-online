import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCanvas, setSocket } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { Navigate } from 'react-router'
import { io } from 'socket.io-client'
import { useConnection } from '@/hooks/use-connection'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username, sessionId, canvas, socket, undoList, redoList, isOwner } =
    useAppSelector((state) => state.canvas)
  const dispatch = useAppDispatch()
  const { listeners, create, connect, pending } = useConnection()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])
  useEffect(() => {
    if (canvas && username) {
      const socket = io('http://localhost:5174')
      if (isOwner) {
        create({
          undoList,
          redoList,
          data: canvas!.toDataURL(),
          key: sessionId!,
        })
      }
      connect(sessionId!)
      listeners(socket)
      dispatch(setTool(new Brush(canvas, socket)))
      dispatch(setSocket(socket))
    }
  }, [username, canvas])

  return (
    <>
      {username && sessionId ? (
        <canvas
          aria-disabled={pending}
          onMouseUp={() => {
            const data = canvasRef.current!.toDataURL()
            socket?.emit('save', { data, id: sessionId })
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
