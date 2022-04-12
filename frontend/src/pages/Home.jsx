import Header from '../components/Header'
import {FaUser, FaEllipsisH} from 'react-icons/fa'

const Home = () => {
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
          <div className="posts">
            <div className='posts__head'>
              <div className="posts__head_flex">
                <div className="user__avatar"></div>
                <div className="posts__head_flex_col">
                  <div className="user__name">Name</div>
                  <div className="posted__time"><small>Time</small></div>
                </div>
              </div>
              <div className='posts__head_ellipsis'>
                <FaEllipsisH />
              </div>
            </div>
            <div className="user__post">
              <p>user post sample</p>
            </div>
            <div class="posts__buttons btn-group">
              <div type="button" class="likes">Like</div>
              <div type="button" class="comments">Comment</div>
            </div>
          </div>
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