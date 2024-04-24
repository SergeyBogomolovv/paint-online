import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Socket } from 'socket.io-client'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  undoList: HTMLImageElement[]
  redoList: HTMLImageElement[]
  username: string
  socket: Socket | null
  title: string
}

const initialState: CanvasState = {
  username: '',
  title: '',
  canvas: null,
  undoList: [],
  redoList: [],
  socket: null,
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
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
        axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, {
          title: state.title,
          data: state.canvas?.toDataURL()!,
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
        axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, {
          title: state.title,
          data: state.canvas?.toDataURL()!,
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
  setTitle,
  setSocket,
} = canvasSlice.actions

export default canvasSlice.reducer
