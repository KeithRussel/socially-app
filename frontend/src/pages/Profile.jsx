import {useEffect} from 'react'
import Header from '../components/Header'
import {FaEllipsisH} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getProfile, reset } from '../features/profile/profileSlice'
import { getUserPosts } from '../features/posts/postSlice'
import PostItem from '../components/PostItem'

function Profile() {
  const dispatch = useDispatch()
  const {profile, isLoading, isError, message} = useSelector((state) => state.profile)
  const {user} = useSelector((state)=>state.auth)
  const {posts} = useSelector((state)=>state.posts)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    dispatch(getProfile())

    dispatch(getUserPosts(user._id))

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, user._id])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
    <Header />
    <div className='profile'>
      <div className="profile__coverphoto">
        <img src="https://picsum.photos/1080/400" alt="" />
      </div>
      <div className="container">
        {!profile ? <div>This user have no profile</div> : <><div className="profile__info">
          <div className="profile__avatar">
            <img src="https://picsum.photos/150/150" alt="" />
            <div className="profile__name">
              <h3>{profile.user.name}</h3>
            </div>
          </div>
          <div className="profile__edit">
            <button type="button" className="edit-profile">Edit Profile</button>
          </div>
        </div>
        <div className="divider">
          <div className="divider__info">
            <div>
              <h3>Bio:</h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3>Address:</h3>
              <p>{profile.address}</p>
            </div>
            <div>
              <h3>Joined:</h3>
              <p>{profile.createdAt}</p>
            </div>
          </div>
          <div className="divider__posts">
          {posts ? posts.map((post) => (
            <PostItem key={post._id} post={post} />
          )) : null}
          </div>
          <div className='divider__settings'></div>
        </div></>}
        
      </div>
    </div>
    </>
  )
}

export default Profile