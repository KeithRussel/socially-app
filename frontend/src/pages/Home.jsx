import Header from '../components/Header'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import { getPosts, reset } from '../features/posts/postSlice'
import PostItem from '../components/PostItem'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {posts, isLoading, isError, message} = useSelector((state) => state.posts)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    <Header />
    <div className='container'>
      <div className="home__wrapper">
      <section className="home__left_sidebar">
          <h1>COMING SOON</h1>
        </section>
        <section className="home__posts">
          <h1>GET ALL POSTS</h1>
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