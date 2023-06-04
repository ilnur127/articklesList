import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import type { ITopic } from './topicListSlice'
import type { IUser } from './userListSlice'

export interface IFormData {
  header: string
  body: string
  topic: ITopic | null
  author: IUser | null
};

interface IArtickleFormState {
  formData: IFormData
};

const initialState: IArtickleFormState = {
  formData: {
    header: '',
    body: '',
    topic: null,
    author: null
  }
}

export const artickleFormSlice = createSlice({
  name: 'artickleForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<IFormData>) => {
      state.formData = action.payload
    }
  }
})

export const { setFormData } = artickleFormSlice.actions

export const selectFormData = (state: RootState): IFormData => state.artickleForm.formData

export default artickleFormSlice.reducer
