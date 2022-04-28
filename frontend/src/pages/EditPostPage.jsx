import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {updatePost, getPost, reset} from '../features/posts/postSlice'

function EditPostPage() {
let {id} = useParams();
let navigate = useNavigate()
const [text, setText] = useState('')

const dispatch = useDispatch()

const {singlepost, updateIsSuccess} = useSelector((state) => state.posts)

useEffect(() => {
    if(!singlepost) {
        dispatch(getPost((id)))
    } else {
        setText(singlepost.text);
    }

    if(updateIsSuccess) {
        navigate('/')
        dispatch(reset())
    }
    
  }, [dispatch, singlepost, id, navigate, updateIsSuccess]);

const onSubmit = e => {
    e.preventDefault()

    console.log(id)

    dispatch(updatePost({_id: id, text}))
}

const onChange = e => {
    setText(e.target.value)
}

  return (
    <section className='form'>
        <Link to={`/`} >Go back</Link>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <div>Params: {id}</div>
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