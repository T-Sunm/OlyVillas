import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/AuthSlice'
import CreateProcessReducer from '../store/slices/ProcessSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    CreateProcess:CreateProcessReducer
  },
})