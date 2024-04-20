import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToolState {
  tool: CanvasRenderingContext2D | null
  toolWidth: number
}

const initialState: ToolState = {
  tool: null,
  toolWidth: 0,
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<any>) => {
      state.tool = action.payload
      state.toolWidth = state.tool!.lineWidth
      state.tool!.lineCap = 'square'
    },
    setFillColor: (state, action: PayloadAction<string>) => {
      state.tool!.fillStyle = action.payload
      state.tool!.strokeStyle = action.payload
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.tool!.fillStyle = action.payload
      state.tool!.strokeStyle = action.payload
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.tool!.lineWidth = action.payload
      state.toolWidth = state.tool!.lineWidth
    },
    setLineCap: (state, action: PayloadAction<'square' | 'butt' | 'round'>) => {
      state.tool!.lineCap = action.payload
    },
  },
})

export const {
  setTool,
  setFillColor,
  setStrokeColor,
  setLineWidth,
  setLineCap,
} = toolSlice.actions
export default toolSlice.reducer
