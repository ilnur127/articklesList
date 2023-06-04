import { configureStore } from '@reduxjs/toolkit'

import artickleListReducer from '../features/artickleListSlice'
import topicListReducer from '../features/topicListSlice'
import userListReducer from '../features/userListSlice'
import artickleFormReducer from '../features/artickleFormSlice'
import artickleFilterReducer from '../features/artickleFilterSlice'

export const store = configureStore({
  reducer: {
    artickleList: artickleListReducer,
    topicList: topicListReducer,
    userList: userListReducer,
    artickleForm: artickleFormReducer,
    artickleFilter: artickleFilterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
