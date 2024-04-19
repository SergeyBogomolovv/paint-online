import { ActionMessage } from '@/interfaces/undo-message'
import { useAppDispatch } from './redux'
import { pushToUndo } from '@/redux/slices/canvas-slice'
import {
  undo as undoAction,
  redo as redoAction,
} from '@/redux/slices/canvas-slice'

export const useUndo = () => {
  const dispatch = useAppDispatch()
  const push = (msg: ActionMessage) => {
    const img = new Image()
    img.src = msg.data!
    dispatch(pushToUndo(img))
  }
  const undo = () => {
    dispatch(undoAction())
  }
  const redo = () => {
    dispatch(redoAction())
  }
  return { push, undo, redo }
}
