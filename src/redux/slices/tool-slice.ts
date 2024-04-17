import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToolState {
  tool: CanvasRenderingContext2D | null
}

const initialState: ToolState = {
  tool: null,
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<any>) => {
      state.tool = action.payload
    },
    setFillColor: (state, action: PayloadAction<string>) => {
      state.tool!.fillStyle = action.payload
      console.log(state.tool?.fillStyle)
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.tool!.strokeStyle = action.payload
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.tool!.lineWidth = action.payload
    },
  },
})

export const { setTool, setFillColor, setStrokeColor, setLineWidth } =
  toolSlice.actions
export default toolSlice.reducer
