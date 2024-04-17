import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  undoList: any[]
  redoList: any[]
  username: string
  socket: WebSocket | null
  sessionId: string | null
}

const initialState: CanvasState = {
  username: 'Gerax',
  canvas: null,
  undoList: [],
  redoList: [],
  socket: null,
  sessionId: null,
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload
    },
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload
    },
    pushToUndo: (state, action: PayloadAction<any>) => {
      state.undoList = [...state.undoList, action.payload]
    },
    pushToRedo: (state, action: PayloadAction<any>) => {
      state.redoList = [...state.redoList, action.payload]
    },
    undo: (state) => {
      let ctx = state.canvas?.getContext('2d')
      if ([...state.undoList].length > 0) {
        const dataUrl = state.undoList.pop()
        const img = new Image()
        state.redoList = [...state.redoList, state.canvas?.toDataURL()]
        img.src = dataUrl
        ctx?.clearRect(0, 0, state.canvas!.width, state.canvas!.height)
        ctx?.drawImage(img, 0, 0, state.canvas!.width, state.canvas!.height)
      }
    },
    redo: (state) => {
      let ctx = state.canvas?.getContext('2d')
      if ([...state.redoList].length > 0) {
        const dataUrl = state.redoList.pop()
        const img = new Image()
        state.undoList = [...state.undoList, state.canvas?.toDataURL()]
        img.src = dataUrl
        ctx?.clearRect(0, 0, state.canvas!.width, state.canvas!.height)
        ctx?.drawImage(img, 0, 0, state.canvas!.width, state.canvas!.height)
      }
    },
  },
})

export const {
  setCanvas,
  pushToUndo,
  pushToRedo,
  undo,
  redo,
  setUsername,
  setSessionId,
  setSocket,
} = canvasSlice.actions
export default canvasSlice.reducer
