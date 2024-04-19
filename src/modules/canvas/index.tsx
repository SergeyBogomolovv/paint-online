import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { pushToUndo, setCanvas, setSocket } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { Navigate } from 'react-router'
import { useSocketConnection } from '@/hooks/use-socket-connection'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username, sessionId, canvas } = useAppSelector(
    (state) => state.canvas
  )
  const dispatch = useAppDispatch()
  const { onMessage, onOpen } = useSocketConnection()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && username) {
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
            dispatch(pushToUndo(canvasRef.current!.toDataURL()))
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
