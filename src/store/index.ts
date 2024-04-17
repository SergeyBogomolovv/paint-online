import { configureStore } from '@reduxjs/toolkit'
import toolSlice from './slices/tool-slice'
import canvasSlice from './slices/canvas-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      tools: toolSlice,
      canvas: canvasSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
