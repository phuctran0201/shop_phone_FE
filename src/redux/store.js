import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import userSlide from './slices/userSlide'
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user:userSlide,
  },
})