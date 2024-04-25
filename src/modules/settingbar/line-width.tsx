import { setLineWidth } from '@/redux/slices/tool-slice'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

export default function LineWidth() {
  const dispatch = useAppDispatch()
  const { toolWidth } = useAppSelector((state) => state.tools)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>
          Толщина линии: {toolWidth}
          <MdOutlineArrowDropDown className='h-5 w-5 ml-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Slider
          onValueChange={(n) => {
            dispatch(setLineWidth(n[0]))
          }}
          defaultValue={[toolWidth]}
          max={100}
          step={1}
        />
      </PopoverContent>
    </Popover>
  )
}
