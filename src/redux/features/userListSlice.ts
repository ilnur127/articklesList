import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../app/store'

export interface IUser {
  userId: number
  userName: string
};

interface IArtickleState {
  userList: IUser[]
}

const initialState: IArtickleState = {
  userList: [
    {
      userId: 100,
      userName: 'user1'
    },
    {
      userId: 101,
      userName: 'user2'
    },
    {
      userId: 102,
      userName: 'user3'
    },
    {
      userId: 103,
      userName: 'user4'
    }
  ]
}

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {}
})

export const selectUsers = (state: RootState): IUser[] => state.userList.userList

export default userListSlice.reducer
