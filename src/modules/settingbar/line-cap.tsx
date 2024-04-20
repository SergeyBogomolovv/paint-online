import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useAppDispatch } from '@/hooks/redux'
import { setLineCap } from '@/redux/slices/tool-slice'
import { FaSquareFull } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'

export default function LineCap() {
  const dispatch = useAppDispatch()

  return (
    <ToggleGroup
      type='single'
      defaultValue={'round'}
      onValueChange={(val) => {
        if (val === 'butt' || val === 'square' || val === 'round')
          dispatch(setLineCap(val))
      }}
    >
      <ToggleGroupItem value='round'>
        <FaCircle className='w-6 h-6' />
      </ToggleGroupItem>
      <ToggleGroupItem value='butt'>
        <FaSquareFull className='w-6 h-6' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
