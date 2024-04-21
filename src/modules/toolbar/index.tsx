import { FaPen } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  setFillColor,
  setStrokeColor,
  setTool,
} from '@/redux/slices/tool-slice'
import Brush from '@/tools/brush'
import Rect from '@/tools/rect'
import Circle from '@/tools/circle'
import Eraser from '@/tools/eraser'
import Line from '@/tools/line'
import { FaCircle } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { ColorPicker } from 'antd'
import { motion } from 'framer-motion'
import { IoRemoveOutline } from 'react-icons/io5'

export default function Toolbar() {
  const dispatch = useAppDispatch()
  const { canvas, socket } = useAppSelector((state) => state.canvas)
  const { tool } = useAppSelector((state) => state.tools)

  const tools = [
    { icon: FaPen, thisTool: Brush },
    { icon: FaSquare, thisTool: Rect },
    { icon: FaCircle, thisTool: Circle },
    { icon: FaEraser, thisTool: Eraser },
    { icon: IoRemoveOutline, thisTool: Line },
  ]

  return (
    <div className='flex flex-col h-full fixed pl-6 text-neutral-400'>
      <div className='flex flex-col items-center gap-4'>
        {tools.map((t) => (
          <motion.button
            key={t.thisTool.name}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              dispatch(setTool(new t.thisTool(canvas!, socket!)))
            }}
          >
            <t.icon
              className={cn(
                'w-6 h-6',
                tool instanceof t.thisTool && 'text-white'
              )}
            />
          </motion.button>
        ))}
        <ColorPicker
          defaultValue={'#000'}
          onChangeComplete={(color) => {
            dispatch(setStrokeColor(color.toRgbString()))
            dispatch(setFillColor(color.toRgbString()))
          }}
        />
      </div>
    </div>
  )
}
