import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setPost, getPosts} from '../features/posts/postSlice'

function PostForm() {
const [text, setText] = useState('')

const dispatch = useDispatch()

// const {posts, isLoading, isError, message, post} = useSelector((state) => state.posts)

const onSubmit = e => {
    e.preventDefault()

    dispatch(setPost({text}))
    setText('')
}

  return (
    <div className='modal-form'>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Share your thoughts..</label>
                    <textarea type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>
                        Add Post
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default PostForm