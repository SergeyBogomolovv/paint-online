import { User } from '@/interfaces/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Socket } from 'socket.io-client'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  undoList: HTMLImageElement[]
  redoList: HTMLImageElement[]
  socket: Socket | null
  username: string
  connectedUsers: User[]
  title: string
}

const initialState: CanvasState = {
  username: '',
  title: '',
  canvas: null,
  undoList: [],
  redoList: [],
  socket: null,
  connectedUsers: [],
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setConnectedUsers: (state, action: PayloadAction<User[]>) => {
      state.connectedUsers = action.payload
    },
    removeConnectedUser: (state, action: PayloadAction<string>) => {
      state.connectedUsers = state.connectedUsers.filter(
        (user) => user.id !== action.payload
      )
    },
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
    nullLists: (state) => {
      state.redoList = []
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
        const title = state.title
        state.canvas?.toBlob((blob) => {
          const formData = new FormData()
          formData.append('image', blob!)
          formData.append('title', title)
          axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, formData)
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
        const title = state.title
        state.canvas?.toBlob((blob) => {
          const formData = new FormData()
          formData.append('image', blob!)
          formData.append('title', title)
          axios.put(`${import.meta.env.VITE_SERVER_URL}/drawing`, formData)
        })
      }
    },
  },
})

export const {
  setCanvas,
  removeConnectedUser,
  setConnectedUsers,
  pushToUndo,
  nullLists,
  undo,
  redo,
  setUsername,
  setTitle,
  setSocket,
} = canvasSlice.actions

export default canvasSlice.reducer
