import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import type { ITopic } from './topicListSlice'
import type { IUser } from './userListSlice'

export interface IFilterData {
  createdAt: string
  topic: ITopic | null
  author: IUser | null
};

interface IArtickleFormState {
  filterData: IFilterData
}

const initialState: IArtickleFormState = {
  filterData: {
    createdAt: '',
    topic: null,
    author: null
  }
}

export const artickleFilterSlice = createSlice({
  name: 'artickleFilter',
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<IFilterData>) => {
      state.filterData = action.payload
    }
  }
})

export const { setFilterData } = artickleFilterSlice.actions

export const selectFilterData = (state: RootState): IFilterData =>
  state.artickleFilter.filterData

export default artickleFilterSlice.reducer
