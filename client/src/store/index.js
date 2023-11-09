import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/AuthSlice'
import CreateProcessReducer from '../store/slices/ProcessSlice'
import StepReducer from'../store/slices/StepSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    CreateProcess:CreateProcessReducer,
    StepSlice:StepReducer
  },
})