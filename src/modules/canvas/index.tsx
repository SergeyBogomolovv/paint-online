import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCanvas, setSocket } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { Navigate } from 'react-router'
import { io } from 'socket.io-client'
import { useConnection } from '@/hooks/use-connection'
import axios from 'axios'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username, sessionId, canvas, socket, isOwner } = useAppSelector(
    (state) => state.canvas
  )
  const dispatch = useAppDispatch()
  const { listeners, create, connect } = useConnection()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && username) {
      const socket = io('http://localhost:5174')
      if (isOwner) {
        create({
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
          onMouseUp={() => {
            const data = canvasRef.current!.toDataURL()
            axios.put('http://localhost:5174/drawing', {
              data,
              id: sessionId,
            })
          }}
          onMouseDown={() => {
            const data = canvasRef.current!.toDataURL()
            socket?.emit('push', { data, id: sessionId })
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
