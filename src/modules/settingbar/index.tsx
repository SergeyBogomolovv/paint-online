import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setLineWidth } from '@/redux/slices/tool-slice'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { redo, undo } from '@/redux/slices/canvas-slice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { FaPersonCirclePlus } from 'react-icons/fa6'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { RiArrowGoForwardFill } from 'react-icons/ri'
import { FaRegSave } from 'react-icons/fa'

export default function Settings() {
  const dispatch = useAppDispatch()
  const { toolWidth } = useAppSelector((state) => state.tools)
  const { canvas, sessionId } = useAppSelector((state) => state.canvas)
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
    <div className='flex justify-between py-4 w-[1500px] mx-auto'>
      <div className='flex items-center gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              Толщина линии: {toolWidth}{' '}
              <MdOutlineArrowDropDown className='h-5 w-5 ml-2' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Slider
              onValueChange={(n) => {
                dispatch(setLineWidth(n[0]))
              }}
              defaultValue={[toolWidth]}
              max={50}
              step={1}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center gap-3'>
        <motion.button
          className='bg-white rounded-2xl p-2'
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            dispatch(undo())
          }}
        >
          <RiArrowGoBackFill className='w-6 h-6' />
        </motion.button>
        <motion.button
          className='bg-white rounded-2xl p-2'
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            dispatch(redo())
          }}
        >
          <RiArrowGoForwardFill className='w-6 h-6' />
        </motion.button>
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
            await navigator.clipboard.writeText(sessionId!)
            toast.success('Ключ доски скопирован в буфер обмена')
          }}
        >
          <FaPersonCirclePlus className='w-6 h-6' />
        </motion.button>
      </div>
    </div>
  )
}
