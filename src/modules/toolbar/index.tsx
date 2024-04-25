import { FaPen } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setColor, setTool } from '@/redux/slices/tool-slice'
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
  const { tool, toolColor } = useAppSelector((state) => state.tools)

  const tools = [
    { Icon: FaPen, thisTool: Brush },
    { Icon: FaSquare, thisTool: Rect },
    { Icon: FaCircle, thisTool: Circle },
    { Icon: FaEraser, thisTool: Eraser },
    { Icon: IoRemoveOutline, thisTool: Line },
  ]

  return (
    <div className='flex flex-col h-full fixed pl-6 text-neutral-400'>
      <div className='flex flex-col items-center gap-4'>
        {tools.map(({ Icon, thisTool }) => (
          <motion.button
            key={thisTool.name}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              dispatch(setTool(new thisTool(canvas!, socket!)))
            }}
          >
            <Icon
              className={cn(
                'w-6 h-6',
                tool instanceof thisTool && 'text-white'
              )}
            />
          </motion.button>
        ))}
        <ColorPicker
          defaultValue={toolColor}
          onChangeComplete={(color) => {
            dispatch(setColor(color.toRgbString()))
          }}
        />
      </div>
    </div>
  )
}
