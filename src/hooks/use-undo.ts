import { useAppDispatch } from './redux'
import { pushToUndo } from '@/redux/slices/canvas-slice'
import {
  undo as undoAction,
  redo as redoAction,
} from '@/redux/slices/canvas-slice'

export const useUndo = () => {
  const dispatch = useAppDispatch()
  const save = (data: string) => {
    const img = new Image()
    img.src = data
    dispatch(pushToUndo(img))
  }
  const undo = () => {
    dispatch(undoAction())
  }
  const redo = () => {
    dispatch(redoAction())
  }
  return { save, undo, redo }
}
