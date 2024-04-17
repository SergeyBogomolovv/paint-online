import { useAppDispatch } from '../store/hooks'
import { setLineWidth } from '../store/slices/tool-slice'

export default function Settings() {
  const dispatch = useAppDispatch()
  return (
    <div className='py-4 px-20 border-b border-neutral-500 mb-10'>
      <div className='flex items-center gap-2'>
        <label htmlFor='line-width'>Толщина линии:</label>
        <input
          onChange={(e) => {
            dispatch(setLineWidth(Number(e.target.value)))
          }}
          type='number'
          min={1}
          id='line-width'
          defaultValue={1}
          max={50}
        />
      </div>
    </div>
  )
}
