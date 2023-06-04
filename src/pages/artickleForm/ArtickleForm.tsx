import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Select from 'react-select'

import { selectTopics } from '../../redux/features/topicListSlice'
import { selectUsers } from '../../redux/features/userListSlice'
import {
  editArtickle,
  addArtickle,
  selectArtickle
} from '../../redux/features/artickleListSlice'

import type { SingleValue } from 'react-select'
import type { ChangeEvent } from 'react'
import type { ITopic } from '../../redux/features/topicListSlice'
import type { IUser } from '../../redux/features/userListSlice'
import type { IArtickle } from '../../redux/features/artickleListSlice'

import classes from './artickleForm.module.css'
import {
  selectFormData,
  setFormData
} from '../../redux/features/artickleFormSlice'

const HeaderComponent = ({ text }: { text: string }): JSX.Element => (
  <div className={classes.header}>
    <Link to="/">Назад</Link>
    <h2>{text}</h2>
  </div>
)

interface FieldsComponentProps {
  initialArtickleData?: IArtickle
}
const FieldsComponent = ({ initialArtickleData }: FieldsComponentProps): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formData = useSelector(selectFormData)
  const topicList = useSelector(selectTopics)
  const userList = useSelector(selectUsers)

  const saveData = (): void => {
    if (initialArtickleData !== null && initialArtickleData !== undefined) {
      dispatch(
        editArtickle({ artickleId: initialArtickleData.id, ...formData })
      )
    } else {
      dispatch(addArtickle(formData))
    }
    navigate('/')
  }

  useEffect(() => {
    if (initialArtickleData !== null && initialArtickleData !== undefined) {
      dispatch(
        setFormData({
          header: initialArtickleData.header,
          body: initialArtickleData.body,
          topic: initialArtickleData.topic,
          author: initialArtickleData.author
        })
      )
    }
    return () => {
      dispatch(
        setFormData({
          header: '',
          body: '',
          topic: null,
          author: null
        })
      )
    }
  }, [initialArtickleData])

  return (
    <div className={classes.formControl}>
      <div className={classes.formControl__item}>
        <label>Тема</label>
        <Select
          options={topicList}
          value={formData.topic}
          getOptionLabel={(option) => option.topicName}
          getOptionValue={(option) => option.topicId.toString()}
          placeholder="Выберете тему статьи"
          onChange={(option: SingleValue<ITopic>) =>
            dispatch(setFormData({ ...formData, topic: option }))
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Заголовок</label>
        <input
          value={formData.header}
          className={classes.formControl__item_input}
          placeholder="Введите заголовок статьи"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(setFormData({ ...formData, header: e.target.value }))
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Текст</label>
        <textarea
          value={formData.body}
          className={classes.formControl__item_input}
          placeholder="Введите текст статьи"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(setFormData({ ...formData, body: e.target.value }))
          }
        />
      </div>
      <div className={classes.formControl__item}>
        <label>Автор</label>
        <Select
          options={userList}
          value={formData.author}
          getOptionLabel={(option) => option.userName}
          getOptionValue={(option) => option.userId.toString()}
          placeholder="Выберете автора статьи"
          onChange={(option: SingleValue<IUser>) =>
            dispatch(setFormData({ ...formData, author: option }))
          }
        />
      </div>
      <button className={classes.formControl__item_button} onClick={saveData}>
        Сохранить
      </button>
    </div>
  )
}

const NewArtickle = (): JSX.Element => <FieldsComponent />

const EditArtickle = ({ artickleId }: { artickleId: string | undefined }): JSX.Element => {
  const artickles = useSelector(selectArtickle)
  const artickle = useMemo(
    () => artickles.find((a) => a.id === Number(artickleId)),
    [artickles, artickleId]
  )
  return <FieldsComponent initialArtickleData={artickle} />
}

const ArtickleForm = (): JSX.Element => {
  const { artickleId } = useParams()

  return artickleId === 'new'
    ? (
    <>
      <HeaderComponent text="Добавление новой статьи" />
      <NewArtickle />
    </>)
    : (
    <>
      <HeaderComponent text="Изменение статьи" />
      <EditArtickle artickleId={artickleId} />
    </>)
}

export default ArtickleForm
