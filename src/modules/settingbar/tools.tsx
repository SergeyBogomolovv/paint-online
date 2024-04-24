import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { FaPersonCirclePlus } from 'react-icons/fa6'
import { FaRegSave } from 'react-icons/fa'
import { useAppSelector } from '@/hooks/redux'

export default function Tools() {
  const { canvas, title } = useAppSelector((state) => state.canvas)
  const download = () => {
    const dataUrl = canvas?.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl!
    a.download = title + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={download}
      >
        <FaRegSave className='w-6 h-6 text-neutral-700' />
      </motion.button>
      <motion.button
        className='bg-white rounded-2xl p-2'
        whileHover={{ scale: 1.2 }}
        onClick={async () => {
          await navigator.clipboard.writeText(title)
          toast.success('Название доски скопировано в буфер обмена')
        }}
      >
        <FaPersonCirclePlus className='w-6 h-6' />
      </motion.button>
    </>
  )
}
