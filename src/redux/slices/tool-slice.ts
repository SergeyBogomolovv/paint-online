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
    },
    setFillColor: (state, action: PayloadAction<string>) => {
      state.tool!.fillStyle = action.payload
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.tool!.strokeStyle = action.payload
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.tool!.lineWidth = action.payload
      state.toolWidth = state.tool!.lineWidth
    },
  },
})

export const { setTool, setFillColor, setStrokeColor, setLineWidth } =
  toolSlice.actions
export default toolSlice.reducer
