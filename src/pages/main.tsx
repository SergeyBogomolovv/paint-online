import { useAppSelector } from '@/hooks/redux'
import Canvas from '@/modules/canvas'
import Settings from '@/modules/settingbar'
import Toolbar from '@/modules/toolbar'
import { Navigate } from 'react-router'

export default function MainPage() {
  const { title } = useAppSelector((state) => state.canvas)
  return (
    <>
      {title ? (
        <div className='bg-stone-800 min-h-[100svh] flex flex-col'>
          <Settings />
          <div className='flex mt-8'>
            <Toolbar />
            <Canvas />
          </div>
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  )
}
