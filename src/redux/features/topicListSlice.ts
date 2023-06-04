import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../app/store'

export interface ITopic {
  topicId: number
  topicName: string
};

interface IArtickleState {
  topicList: ITopic[]
};

const initialState: IArtickleState = {
  topicList: [
    {
      topicId: 1,
      topicName: 'topic1'
    },
    {
      topicId: 2,
      topicName: 'topic2'
    },
    {
      topicId: 3,
      topicName: 'topic3'
    },
    {
      topicId: 4,
      topicName: 'topic4'
    }
  ]
}

export const topicListSlice = createSlice({
  name: 'topicList',
  initialState,
  reducers: {}
})

export const selectTopics = (state: RootState): ITopic[] => state.topicList.topicList

export default topicListSlice.reducer
