import { useState } from 'react'
import {FaEllipsisH, FaEdit, FaTrash} from 'react-icons/fa'
import { useDispatch, useSelector} from 'react-redux'
import {deletePost, getPost, nullPost, likePost} from '../features/posts/postSlice'
import ModalSet from '../components/ModalSet'
import {Link, useParams} from 'react-router-dom'

function PostItem({post}) {
    const [showButton, setShowButton] = useState(false)
    const [postId, setPostId] = useState(
        post._id
    )
    const {user} = useSelector((state)=>state.auth)

    let {id} = useParams()

    const onClick = () => {
        setShowButton(!showButton)
        console.log(id)
    }

    const dispatch = useDispatch()

    const [isModalOpen, setModalIsOpen] = useState(false);
	
	const toggleModal = (e) => {
        e.preventDefault()
		setModalIsOpen(!isModalOpen);
        if(!isModalOpen) {
            // dispatch(getPost(post._id))
        } else {
            // dispatch(nullPost(post._id))
        }
	};

    const onLikePost = (e) => {
        e.preventDefault()
        dispatch(likePost(postId))
        console.log(typeof (postId))
    }

    return (
        <>
        {isModalOpen && <ModalSet post={post} onRequestClose={toggleModal} />}
            <div className="posts">
                <div className='posts__head'>
                    <div className="posts__head_flex">
                    <div className="user__avatar"></div>
                    <div className="posts__head_flex_col">
                        <div className="user__name">{post.user.name}</div>
                        <div className="posted__time"><small>{new Date(post.createdAt).toLocaleString('en-US')}</small></div>
                    </div>
                    </div>
                    {!user ? null : post.user._id === user._id ? <div className='posts__head_ellipsis'>
                        <div onClick={onClick}><FaEllipsisH /></div>
                        {showButton ?<div>
                            <button type="button"><Link key={post._id} to={`/edit/${post._id}`}><FaEdit /> Edit</Link></button>
                            <button onClick={() => dispatch(deletePost(post._id))}><FaTrash /> Delete</button>
                        </div> : null }
                    </div> : null }                    
                </div>
                <div className="user__post">
                    <p>{post.text}</p>
                </div>
                <div className="posts__buttons btn-group">
                    <div type="button" onClick={onLikePost} className="likes">{post.likes.length < 1 ? <span>Like</span> : <span>{post.likes.length} Likes</span>  }</div>
                    <div type="button" className="comments">Comment</div>
                </div>
            </div>
        </>
    )
}

export default PostItem