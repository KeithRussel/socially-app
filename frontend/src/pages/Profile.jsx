import Header from '../components/Header'
import {FaEllipsisH} from 'react-icons/fa'

function Profile() {
  return (
    <>
    <Header />
    <div className='profile'>
      <div className="profile__coverphoto">
        <img src="https://picsum.photos/1080/400" alt="" />
      </div>
      <div className="container">
        <div className="profile__info">
          <div className="profile__avatar">
            <img src="https://picsum.photos/150/150" alt="" />
            <div className="profile__name">
              <h3>Keith Russel</h3>
            </div>
          </div>
          <div className="profile__edit">
            <button type="button" class="edit-profile">Edit Profile</button>
          </div>
        </div>
        <div className="divider">
          <div className="divider__info">
            <div>
              <h3>Bio:</h3>
              <p>Sample info here</p>
            </div>
            <div>
              <h3>Joined:</h3>
              <p>March 18, 1995</p>
            </div>
          </div>
          <div className="divider__posts">
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
          </div>
          <div className='divider__settings'></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile