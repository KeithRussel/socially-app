import Header from '../components/Header'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getPosts, reset, nullPost } from '../features/posts/postSlice'
import PostItem from '../components/PostItem'
// import PostForm from '../components/PostForm'
import ModalSet from '../components/ModalSet'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {posts, isLoading, isError, message} = useSelector((state) => state.posts)
  const {user} = useSelector((state)=>state.auth)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getPosts())
    dispatch(nullPost())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch, user])

  const [isModalOpen, setModalIsOpen] = useState(false);
	
	const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    {isModalOpen && <ModalSet onRequestClose={toggleModal} />}
    <Header />
    <div className='container'>
      <div className="home__wrapper">
      <section className="home__left_sidebar">
          <h1>COMING SOON</h1>
        </section>
        <section className="home__posts">
        <div className="form-group">
            <label htmlFor="text">Share your thoughts..</label>
            <input onClick={toggleModal} />
        </div>
          {/* <PostForm /> */}
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </section>
        <section className="home__profiles">
          <h1>COMING SOON</h1>
        </section>
      </div>
    </div>
    </>
  )
}

export default Home