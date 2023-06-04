import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import type { ITopic } from './topicListSlice'
import type { IUser } from './userListSlice'
import type { IFormData } from './artickleFormSlice'

export interface IComment {
  id: number
  author: IUser | null
  message: string
  createdAt: string
};
export interface IArtickle {
  id: number
  header: string
  body: string
  topic: ITopic | null
  author: IUser | null
  createdAt: string
  updatedAt?: string
  comments?: IComment[]
};

interface IArtickleState {
  artickles: IArtickle[]
}

const initialState: IArtickleState = {
  artickles: [
    {
      id: Math.random(),
      header: 'header1',
      body: 'body1',
      topic: {
        topicId: 1,
        topicName: 'topic1'
      },
      author: {
        userId: 100,
        userName: 'user1'
      },
      createdAt: new Date('2023-01-26').toDateString(),
      comments: [
        {
          id: Math.random(),
          author: {
            userId: 101,
            userName: 'user2'
          },
          message: '123',
          createdAt: new Date().toDateString()
        }
      ]
    },
    {
      id: Math.random(),
      header: 'header2',
      body: 'body2',
      topic: {
        topicId: 2,
        topicName: 'topic2'
      },
      author: {
        userId: 101,
        userName: 'user2'
      },
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }
  ]
}

export const artickleListSlice = createSlice({
  name: 'artickleList',
  initialState,
  reducers: {
    addArtickle: (state, action: PayloadAction<IFormData>) => {
      state.artickles.push({
        ...action.payload,
        id: Math.random(),
        createdAt: new Date().toDateString()
      })
    },
    editArtickle: (
      state,
      action: PayloadAction<{ artickleId: number } & IFormData>
    ) => {
      state.artickles = state.artickles.map((artickle) =>
        artickle.id === action.payload.artickleId
          ? {
              ...artickle,
              ...action.payload,
              updatedAt: new Date().toDateString()
            }
          : artickle
      )
    },
    deleteArtickle: (state, action: PayloadAction<number>) => {
      state.artickles = state.artickles.filter(
        (artickle) => artickle.id !== action.payload
      )
    },
    addCommentToArtickle: (
      state,
      action: PayloadAction<{ artickleId: number, text: string }>
    ) => {
      state.artickles = state.artickles.map((artickle) =>
        artickle.id === action.payload.artickleId
          ? {
              ...artickle,
              comments: artickle.comments !== undefined
                ? [
                    ...artickle.comments,
                    {
                      id: Math.random(),
                      author: {
                        userId: 103,
                        userName: 'user4'
                      },
                      message: action.payload.text,
                      createdAt: new Date().toDateString()
                    }
                  ]
                : [
                    {
                      id: Math.random(),
                      author: {
                        userId: 103,
                        userName: 'user4'
                      },
                      message: action.payload.text,
                      createdAt: new Date().toDateString()
                    }
                  ]
            }
          : artickle
      )
    }
  }
})

export const {
  addArtickle,
  editArtickle,
  deleteArtickle,
  addCommentToArtickle
} = artickleListSlice.actions

export const selectArtickle = (state: RootState): IArtickle[] =>
  state.artickleList.artickles

export default artickleListSlice.reducer
