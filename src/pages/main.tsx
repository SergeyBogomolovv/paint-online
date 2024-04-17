import Canvas from '@/modules/canvas'
import Settings from '@/modules/settingbar'
import Toolbar from '@/modules/toolbar'

export default function MainPage() {
  return (
    <div>
      <Toolbar />
      <Settings />
      <Canvas />
    </div>
  )
}
