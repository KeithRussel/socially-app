import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createPost} from '../features/posts/postSlice'

function PostForm() {
const [text, setText] = useState('')

const dispatch = useDispatch()

const onSubmit = e => {
    e.preventDefault()

    dispatch(createPost({text}))
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