import { RiArrowGoBackFill } from 'react-icons/ri'
import { RiArrowGoForwardFill } from 'react-icons/ri'
import { useAppSelector } from '@/hooks/redux'
import { motion } from 'framer-motion'

export default function UndoRedoActions() {
  const { socket } = useAppSelector((state) => state.canvas)
  return (
    <>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          socket?.emit('undo')
        }}
      >
        <RiArrowGoBackFill className='w-6 h-6' />
      </motion.button>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          socket?.emit('redo')
        }}
      >
        <RiArrowGoForwardFill className='w-6 h-6' />
      </motion.button>
    </>
  )
}
