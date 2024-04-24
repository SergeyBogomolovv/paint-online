import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  undoList: HTMLImageElement[]
  redoList: HTMLImageElement[]
  username: string
  socket: Socket | null
  sessionId: string | null
  isOwner: boolean
}

const initialState: CanvasState = {
  username: 'Gerax',
  canvas: null,
  undoList: [],
  redoList: [],
  socket: null,
  sessionId: null,
  isOwner: false,
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload
    },
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload
    },
    pushToUndo: (state, action: PayloadAction<any>) => {
      state.undoList = [...state.undoList, action.payload]
    },
    nullRedo: (state) => {
      state.redoList = []
    },
    nullUndo: (state) => {
      state.undoList = []
    },
    undo: (state) => {
      let ctx = state.canvas?.getContext('2d')
      if (state.undoList.length > 0) {
        const img: any = state.undoList.pop()
        const image: any = new Image()
        image.src = state.canvas?.toDataURL()!
        state.redoList = [...state.redoList, image]
        ctx?.clearRect(0, 0, state.canvas!.width, state.canvas!.height)
        ctx?.drawImage(img, 0, 0, state.canvas!.width, state.canvas!.height)
        state.socket?.emit('set', {
          data: state.canvas?.toDataURL()!,
          id: state.sessionId,
        })
      }
    },
    redo: (state) => {
      let ctx = state.canvas?.getContext('2d')
      if (state.redoList.length > 0) {
        const img: any = state.redoList.pop()
        const image: any = new Image()
        image.src = state.canvas?.toDataURL()!
        state.undoList = [...state.undoList, image]
        ctx?.clearRect(0, 0, state.canvas!.width, state.canvas!.height)
        ctx?.drawImage(img, 0, 0, state.canvas!.width, state.canvas!.height)
        state.socket?.emit('set', {
          data: state.canvas?.toDataURL()!,
          id: state.sessionId,
        })
      }
    },
  },
})

export const {
  setCanvas,
  pushToUndo,
  nullRedo,
  nullUndo,
  undo,
  redo,
  setUsername,
  setSessionId,
  setSocket,
  setIsOwner,
} = canvasSlice.actions

export default canvasSlice.reducer
