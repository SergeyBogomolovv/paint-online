import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToolState {
  tool: CanvasRenderingContext2D | null
  toolWidth: number
  toolLineCap: 'square' | 'butt' | 'round'
  toolColor: string
}

const initialState: ToolState = {
  tool: null,
  toolWidth: 1,
  toolLineCap: 'square',
  toolColor: 'black',
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<any>) => {
      state.tool = action.payload
      state.toolWidth = state.tool!.lineWidth
      state.tool!.lineCap = 'round'
      state.toolLineCap = state.tool!.lineCap
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.tool!.fillStyle = action.payload
      state.tool!.strokeStyle = action.payload
      state.toolColor = action.payload
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.tool!.lineWidth = action.payload
      state.toolWidth = state.tool!.lineWidth
    },
    setLineCap: (state, action: PayloadAction<'square' | 'butt' | 'round'>) => {
      state.tool!.lineCap = action.payload
      state.toolLineCap = action.payload
    },
  },
})

export const { setTool, setColor, setLineWidth, setLineCap } = toolSlice.actions
export default toolSlice.reducer
