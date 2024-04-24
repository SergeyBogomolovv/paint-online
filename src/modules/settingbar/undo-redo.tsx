import { RiArrowGoBackFill } from 'react-icons/ri'
import { RiArrowGoForwardFill } from 'react-icons/ri'
import { useAppSelector } from '@/hooks/redux'
import { motion } from 'framer-motion'
import { Badge } from 'antd'

export default function UndoRedoActions() {
  const { socket, redoList, undoList } = useAppSelector((state) => state.canvas)
  return (
    <>
      <Badge count={undoList.length} color='geekblue'>
        <motion.button
          className='bg-white rounded-2xl p-2'
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            socket?.emit('undo')
          }}
        >
          <RiArrowGoBackFill className='w-6 h-6' />
        </motion.button>
      </Badge>
      <Badge count={redoList.length} color='geekblue'>
        <motion.button
          className='bg-white rounded-2xl p-2'
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            socket?.emit('redo')
          }}
        >
          <RiArrowGoForwardFill className='w-6 h-6' />
        </motion.button>
      </Badge>
    </>
  )
}
