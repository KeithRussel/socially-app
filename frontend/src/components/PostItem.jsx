import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {FaEllipsisH, FaEdit, FaTrash} from 'react-icons/fa'

function PostItem({post}) {
    const [showButton, setShowButton] = useState(false)
    const onClick = () => {setShowButton(!showButton)}
    // const dispatch = useDispatch()

    return (
    <div className="posts">
        <div className='posts__head'>
            <div className="posts__head_flex">
            <div className="user__avatar"></div>
            <div className="posts__head_flex_col">
                <div className="user__name">{post.user.name}</div>
                <div className="posted__time"><small>{post.createdAt}</small></div>
            </div>
            </div>
            <div className='posts__head_ellipsis'>
                <div onClick={onClick}><FaEllipsisH /></div>
                {showButton ?<div>
                    <h4><FaEdit /> Edit</h4>
                    <h4><FaTrash /> Delete</h4>
                </div> : null }
                
            </div>
        </div>
        <div className="user__post">
            <p>{post.text}</p>
        </div>
        <div className="posts__buttons btn-group">
            <div type="button" className="likes">{post.likes.length < 1 ? <span>Like</span> : <span>{post.likes.length} Likes</span>  }</div>
            <div type="button" className="comments">Comment</div>
        </div>
    </div>
    )
}

export default PostItem