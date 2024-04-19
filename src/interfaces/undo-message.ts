export interface ActionMessage {
  id: string
  data?: string
  type: 'save' | 'undo' | 'redo'
  method: 'action'
}
