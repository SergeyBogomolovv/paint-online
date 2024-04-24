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
  const { username, title, canvas, socket } = useAppSelector(
    (state) => state.canvas
  )

  const dispatch = useAppDispatch()
  const { listeners, connect } = useConnection()

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && title) {
      const socket = io(`${import.meta.env.VITE_SERVER_URL}`)
      connect(title)
      listeners(socket)
      dispatch(setTool(new Brush(canvas, socket)))
      dispatch(setSocket(socket))
    }
  }, [title, canvas])

  return (
    <>
      {username && title ? (
        <canvas
          onMouseUp={() => {
            const data = canvasRef.current!.toDataURL()
            axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, {
              data,
              title: title,
            })
          }}
          onMouseDown={() => {
            socket?.emit('save')
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
