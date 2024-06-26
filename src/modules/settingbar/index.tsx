import ToolSettings from './tool-settings'
import Tools from './tools'
import UndoRedoActions from './undo-redo'

export default function Settings() {
  return (
    <div className='flex justify-between py-4 w-[1500px] mx-auto'>
      <ToolSettings />
      <div className='flex items-center gap-3'>
        <UndoRedoActions />
        <Tools />
      </div>
    </div>
  )
}
