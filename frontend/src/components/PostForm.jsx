import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setPost, updatePost} from '../features/posts/postSlice'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {
const [text, setText] = useState('')

const dispatch = useDispatch()
const navigate = useNavigate()

const {singlepost} = useSelector((state) => state.posts)

useEffect(() => {
    if (singlepost) {
        setText(singlepost.text);
    } else {
        setText('')
    }
  }, [singlepost]);

const onSubmit = e => {
    e.preventDefault()

    if(singlepost === null) {
        dispatch(setPost({text}))
    } else {
        dispatch(updatePost(post._id, {text}))
        console.log('update text')
    }

    navigate('/')

    // dispatch(setPost({text}))
    setText('')
}

const onChange = e => {
    // if(!singlepost) {
    //     setText(e.target.value)
    // } else {
    //     setText(singlepost.text);
    // }
    // let {name, value} = e.target
    setText(e.target.value)
}

  return (
    <div className='modal-form'>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">{singlepost ? 'Edit your post' : 'Share your thoughts..'}</label>
                    <textarea type="text" name='text' id='text' value={text} onChange={onChange} />
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