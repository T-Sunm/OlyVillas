import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/slices/AuthSlice'
import CreateProcessReducer from '../store/slices/ProcessSlice'
import StepReducer from'../store/slices/StepSlice'
import reservationReducer from '../store/slices/Reservation'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    CreateProcess:CreateProcessReducer,
    StepSlice:StepReducer,
    reservation:reservationReducer
  },
})