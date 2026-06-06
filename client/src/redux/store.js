import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'

export default configureStore({
  reducer: {
    user:userSlice.reducer
  },
})// use selector kei through data ko read and dispatcher kei through data ko update kr skte hai or set kr sakte hai