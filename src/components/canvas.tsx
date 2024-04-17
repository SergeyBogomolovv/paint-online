import { useEffect, useRef, Ref, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  pushToUndo,
  setCanvas,
  setSessionId,
  setSocket,
  setUsername,
} from '../store/slices/canvas-slice'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'react-router'
import Brush from '@/tools/brush'
import { setTool } from '@/store/slices/tool-slice'
import Rect from '@/tools/rect'

export default function Canvas() {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null)
  const { username } = useAppSelector((state) => state.canvas)
  const [name, setName] = useState('')
  const params = useParams()
  const dispatch = useAppDispatch()

  const drawHandler = (msg: any) => {
    const { figure } = msg
    const ctx = canvasRef.current?.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx!, figure.x, figure.y, figure.color)
        break
      case 'rect':
        console.log(msg)
        Rect.drawRect(
          ctx!,
          figure.x,
          figure.y,
          figure.width,
          figure.heigth,
          figure.color
        )
        break
      case 'finish':
        ctx?.beginPath()
        break
    }
  }

  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
  }, [])

  useEffect(() => {
    if (username) {
      const socket = new WebSocket(`ws://localhost:5174/`)
      dispatch(setTool(new Brush(canvasRef?.current!, socket, params?.id!)))
      dispatch(setSocket(socket))
      dispatch(setTool({}))
      dispatch(setSessionId(params.id!))
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username,
            method: 'connection',
          })
        )
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        switch (msg.method) {
          case 'connection':
            console.log(`Пользователь ${msg.username} подключился`)
            break
          case 'draw':
            drawHandler(msg)
            break
        }
      }
    }
  }, [username])
  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current!.toDataURL()))
  }
  return (
    <div className='container mx-auto'>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Введите имя пользователя</AlertDialogTitle>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Gerax'
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={connectionHandler}>Войти</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <canvas
        onMouseDown={mouseDownHandler}
        className='mx-auto bg-blue-100'
        ref={canvasRef}
        width={1280}
        height={500}
      />
    </div>
  )
  function connectionHandler(e: any) {
    dispatch(setUsername(name))
  }
}
