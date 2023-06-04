import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Select from 'react-select'

import {
  addCommentToArtickle,
  deleteArtickle,
  selectArtickle
} from '../../redux/features/artickleListSlice'
import { selectTopics } from '../../redux/features/topicListSlice'
import { selectUsers } from '../../redux/features/userListSlice'
import {
  selectFilterData,
  setFilterData
} from '../../redux/features/artickleFilterSlice'

import type {
  IArtickle,
  IComment
} from '../../redux/features/artickleListSlice'
import type { SingleValue } from 'react-select'
import type { ITopic } from '../../redux/features/topicListSlice'
import type { IUser } from '../../redux/features/userListSlice'
import type { ChangeEvent } from 'react'

import classes from './artickleList.module.css'

interface ArtickleCommentBlockProps {
  artickleId: number
  comments: IComment[] | undefined
};
const ArtickleCommentBlock = ({
  artickleId,
  comments
}: ArtickleCommentBlockProps): JSX.Element => {
  const dispatch = useDispatch()
  const [textToComment, setTextToComment] = useState('')

  const saveComment = (): void => {
    dispatch(addCommentToArtickle({ artickleId, text: textToComment }))
    setTextToComment('')
  }
  return (
    <div className={classes.artickleItem__commentBlock}>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className={classes.artickleItem__commentItem_title}>
            <span className={classes.artickleItem__commentItem_username}>{comment.author?.userName}</span>
            <span className={classes.artickleItem__commentItem_date}>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <div className={classes.artickleItem__commentItem_message}>{comment.message}</div>
        </div>
      ))}
      <div className={classes.artickleItem__commentBlock_newCommentBlock}>
        <textarea
          value={textToComment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
            setTextToComment(e.target.value)
          }}
          placeholder='Напишите текст комментария'
        />
        <button onClick={saveComment}>Отправить</button>
      </div>
    </div>
  )
}

const ArtickleComponent = ({ artickle }: { artickle: IArtickle }): JSX.Element => {
  const dispatch = useDispatch()

  const onDeleteArtickle = useCallback(() => {
    dispatch(deleteArtickle(artickle.id))
  }, [artickle, deleteArtickle])
  return (
    <div className={classes.artickleItem}>
      <div className={classes.artickleItem__header}>
        <div>
          <span>{artickle.author?.userName}</span>
          <span className={classes.artickleItem__header_date}>
            {artickle.updatedAt !== '' && artickle.updatedAt !== undefined
              ? `Обновлено ${new Date(artickle.updatedAt).toLocaleDateString()}`
              : `Создано ${new Date(artickle.createdAt).toLocaleDateString()}`}
          </span>
        </div>
        <div className={classes.artickleItem__header_actions}>
          <Link to={`artickle/${artickle.id}`}>Редактировать</Link>
          <button onClick={onDeleteArtickle}>Удалить</button>
        </div>
      </div>
      <div className={classes.artickleItem__title}>
        <h4>{artickle.header}</h4>
        <div className={classes.artickleItem__title_topic}>{artickle.topic?.topicName}</div>
      </div>
      <div className={classes.artickleItem__text}>{artickle.body}</div>
      <ArtickleCommentBlock
        artickleId={artickle.id}
        comments={artickle.comments}
      />
    </div>
  )
}

const ArtickeList = (): JSX.Element => {
  const dispatch = useDispatch()

  const artickleList = useSelector(selectArtickle)

  const topicList = useSelector(selectTopics)
  const userList = useSelector(selectUsers)

  const filterData = useSelector(selectFilterData)

  const [searchValue, setSearchValue] = useState('')

  const artickleFilterFunction = useCallback((artickle: IArtickle) => {
    let pass = true
    if (filterData.author !== null && artickle.author?.userId !== filterData.author.userId) {
      pass = false
    }
    if (filterData.topic !== null && artickle.topic?.topicId !== filterData.topic.topicId) {
      pass = false
    }
    if (filterData.createdAt !== '' && new Date(filterData.createdAt) > new Date(artickle.createdAt)) {
      pass = false
    }
    return pass
  }, [filterData])

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.filterControl}>
          <div className={classes.filterControl__item}>
            <label>Тема:</label>
            <Select
              options={topicList}
              value={filterData.topic}
              isClearable
              getOptionLabel={(option) => option.topicName}
              getOptionValue={(option) => option.topicId.toString()}
              placeholder="Выберете тему статьи"
              onChange={(option: SingleValue<ITopic>) =>
                dispatch(setFilterData({ ...filterData, topic: option }))
              }
            />
          </div>
          <div className={classes.filterControl__item}>
            <label>Автор:</label>
            <Select
              options={userList}
              value={filterData.author}
              isClearable
              getOptionLabel={(option) => option.userName}
              getOptionValue={(option) => option.userId.toString()}
              placeholder="Выберете автора статьи"
              onChange={(option: SingleValue<IUser>) =>
                dispatch(setFilterData({ ...filterData, author: option }))
              }
            />
          </div>
          <div className={classes.filterControl__item}>
            <label>Не позднее:</label>
            <input
              type="date"
              value={filterData.createdAt}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  setFilterData({ ...filterData, createdAt: e.target.value })
                )
              }
            />
          </div>
        </div>
        <input
          type="search"
          className={classes.header__search}
          placeholder="Поиск статей по заголовку или теме"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setSearchValue(e.target.value)
          }}
        />
        <Link to="artickle/new" className={classes.header__button}>
          Добавить статью
        </Link>
      </div>
      <div className={classes.artickleList}>
        {artickleList
          .filter(artickleFilterFunction)
          .filter(
            (artickle) =>
              artickle.header.includes(searchValue) ||
              artickle.topic?.topicName.includes(searchValue)
          )
          .map((artickle) => (
            <ArtickleComponent key={artickle.id} artickle={artickle} />
          ))}
      </div>
    </div>
  )
}

export default ArtickeList
