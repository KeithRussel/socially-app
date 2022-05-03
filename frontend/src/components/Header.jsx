import {FaSignInAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {createProfile} from '../features/profile/profileSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {profile} = useSelector((state) => state.profile)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const onClick = () => {
        if(profile === null) {
            console.log('No Profile')
            dispatch(createProfile())
        } else {
            console.log('Have Profile')
        }
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Socially</Link>
        </div>
        <ul>
            {user ? (<><li>
                <button className='btn' onClick={onLogout}>
                    <FaSignInAlt /> Logout
                </button>
            </li><li>
                <Link to={`/profile/user/me`} onClick={onClick}>
                    <FaUser /> Profile
                </Link>
            </li></>) : (<><li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Register
                </Link>
            </li></>)}
            
        </ul>
    </header>
  )
}

export default Header