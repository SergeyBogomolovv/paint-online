import { RiArrowGoBackFill } from 'react-icons/ri'
import { RiArrowGoForwardFill } from 'react-icons/ri'
import { ActionMessage } from '@/interfaces/undo-message'
import { useAppSelector } from '@/hooks/redux'
import { motion } from 'framer-motion'

export default function UndoRedoActions() {
  const { sessionId, socket } = useAppSelector((state) => state.canvas)

  return (
    <>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          const message: ActionMessage = {
            method: 'action',
            type: 'undo',
            id: sessionId!,
          }
          socket?.send(JSON.stringify(message))
        }}
      >
        <RiArrowGoBackFill className='w-6 h-6' />
      </motion.button>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          const message: ActionMessage = {
            method: 'action',
            type: 'redo',
            id: sessionId!,
          }
          socket?.send(JSON.stringify(message))
        }}
      >
        <RiArrowGoForwardFill className='w-6 h-6' />
      </motion.button>
    </>
  )
}
