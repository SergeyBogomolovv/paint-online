import Canvas from '@/modules/canvas'
import Settings from '@/modules/settingbar'
import Toolbar from '@/modules/toolbar'

export default function MainPage() {
  return (
    <div className='bg-stone-800 min-h-[100svh] flex flex-col'>
      <Settings />
      <div className='flex mt-8'>
        <Toolbar />
        <Canvas />
      </div>
    </div>
  )
}
