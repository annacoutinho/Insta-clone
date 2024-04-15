import axios from 'axios'
import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

export const addPost = post => {
  /*   return {
    type: ADD_POST,
    payload: post
  } */
  return dispatch => {
    axios
      .post('/posts.json', { ...post })
      .catch(err => console.log(err))
      .then(res => console.log(res.data))
  }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload
  }
}
