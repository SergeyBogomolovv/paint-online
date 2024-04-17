import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { pushToUndo, setCanvas, setSocket } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { useDraw } from '@/hooks/use-draw'
import { Navigate } from 'react-router'
import { onSocketOpen } from './actions/on-open'
import { onMessage } from './actions/on-message'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username, sessionId, canvas } = useAppSelector(
    (state) => state.canvas
  )
  const dispatch = useAppDispatch()
  const draw = useDraw()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && username) {
      const socket = new WebSocket(`ws://localhost:5174/`)
      dispatch(setTool(new Brush(canvasRef.current!, socket, sessionId!)))
      dispatch(setSocket(socket))
      onSocketOpen(socket, sessionId!, username)
      onMessage(socket, draw)
    }
  }, [username, canvas])

  return (
    <>
      {username && sessionId ? (
        <div className='container mx-auto'>
          <canvas
            onMouseDown={() => {
              dispatch(pushToUndo(canvasRef.current!.toDataURL()))
            }}
            className='mx-auto bg-blue-100'
            ref={canvasRef}
            width={1280}
            height={700}
          />
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  )
}
