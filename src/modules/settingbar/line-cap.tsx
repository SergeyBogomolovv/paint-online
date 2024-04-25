import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setLineCap } from '@/redux/slices/tool-slice'
import { FaSquareFull } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'

export default function LineCap() {
  const dispatch = useAppDispatch()
  const { toolLineCap } = useAppSelector((state) => state.tools)
  return (
    <div className='flex justify-start gap-4 items-center'>
      <p>Тип инструмента</p>
      <ToggleGroup
        type='single'
        defaultValue={toolLineCap || 'round'}
        onValueChange={(val) => {
          if (val === 'butt' || val === 'square' || val === 'round')
            dispatch(setLineCap(val))
        }}
      >
        <ToggleGroupItem value='round'>
          <FaCircle className='w-4 h-4' />
        </ToggleGroupItem>
        <ToggleGroupItem value='butt'>
          <FaSquareFull className='w-4 h-4' />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
