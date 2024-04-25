import { useEffect, useRef, Ref } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCanvas } from '@/redux/slices/canvas-slice'
import Brush from '@/tools/brush'
import { setTool } from '@/redux/slices/tool-slice'
import { useConnection } from '@/hooks/use-connection'
import axios from 'axios'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { title, canvas, socket } = useAppSelector((state) => state.canvas)

  const dispatch = useAppDispatch()
  const connect = useConnection(socket!)

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (canvas && socket) {
      connect()
      dispatch(setTool(new Brush(canvas, socket)))
    }
  }, [canvas])

  return (
    <canvas
      onMouseUp={() => {
        canvasRef.current!.toBlob((blob) => {
          const formData = new FormData()
          formData.append('image', blob!)
          formData.append('title', title)
          axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, formData)
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
  )
}
