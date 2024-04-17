import axios from 'axios'
import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

export const addPost = post => {

  return dispatch => {
    //https://us-central1-insta-clone-6ae05.cloudfunctions.net/uploadImage
    axios({
      url: 'uploadImage',
      baseURL:'https://us-central1-insta-clone-6ae05.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64
      }
    })
       .catch(err => console.log(err))
       .then (res => {

        post.image = resp.data.imageUrl
        axios.post('/posts.json', { ...post })
        .catch(err => console.log(err))
        .then(res => console.log(res.data))
        
       })
      
  }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload
  }
}
