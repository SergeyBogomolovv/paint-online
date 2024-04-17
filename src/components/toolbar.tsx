import { FaPen } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaRegCircle } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { IoPencilOutline } from 'react-icons/io5'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { RiArrowGoForwardFill } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setFillColor,
  setStrokeColor,
  setTool,
} from '../store/slices/tool-slice'
import Brush from '../tools/brush'
import Rect from '../tools/rect'
import Circle from '../tools/circle'
import Eraser from '../tools/eraser'
import Line from '../tools/line'
import { redo, undo } from '../store/slices/canvas-slice'

export default function Toolbar() {
  const dispatch = useAppDispatch()
  const { canvas, socket, sessionId } = useAppSelector((state) => state.canvas)
  const download = () => {
    const dataUrl = canvas?.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl!
    a.download = sessionId + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <div className='py-4 px-20 flex justify-between items-center border border-neutral-500'>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => {
            dispatch(setTool(new Brush(canvas!, socket!, sessionId!)))
          }}
        >
          <FaPen className='w-6 h-6' />
        </button>
        <button
          onClick={() => {
            dispatch(setTool(new Rect(canvas!, socket!, sessionId!)))
          }}
        >
          <FaSquare className='w-6 h-6' />
        </button>
        <button
          onClick={() => {
            dispatch(setTool(new Circle(canvas!)))
          }}
        >
          <FaRegCircle className='w-6 h-6' />
        </button>
        <button
          onClick={() => {
            dispatch(setTool(new Eraser(canvas!)))
          }}
        >
          <FaEraser className='w-6 h-6' />
        </button>
        <button
          onClick={() => {
            dispatch(setTool(new Line(canvas!)))
          }}
        >
          <IoPencilOutline className='w-6 h-6' />
        </button>
        <input
          type='color'
          onChange={(e) => {
            dispatch(setStrokeColor(e.target.value))
            dispatch(setFillColor(e.target.value))
          }}
        />
      </div>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => {
            dispatch(undo())
          }}
        >
          <RiArrowGoBackFill className='w-6 h-6' />
        </button>
        <button
          onClick={() => {
            dispatch(redo())
          }}
        >
          <RiArrowGoForwardFill className='w-6 h-6' />
        </button>
        <button onClick={download}>
          <FaRegSave className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}
