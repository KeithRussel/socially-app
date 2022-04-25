import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {setPost, updatePost, getPost} from '../features/posts/postSlice'

function EditPostPage() {
let {postId} = useParams;
const [text, setText] = useState('')

const dispatch = useDispatch()

const {singlepost} = useSelector((state) => state.posts)

useEffect(() => {
    if(!singlepost) {
        dispatch(getPost(JSON.stringify(postId)))
    }
    
  }, [dispatch, singlepost, postId]);

const onSubmit = e => {
    e.preventDefault()

    console.log(postId)

    dispatch(updatePost({text}))
}

const onChange = e => {
    setText(e.target.value)
}

  return (
    <section className='form'>
        <Link to={`/`} >Go back</Link>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <div>Params: {postId}</div>
                <label htmlFor="text">{singlepost ? 'Edit your post' : 'Share your thoughts..'}</label>
                <textarea type="text" name='text' id='text' value={text} onChange={onChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                {singlepost ? 'Update' : 'Post'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default EditPostPage