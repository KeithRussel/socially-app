import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
})

const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

    if(isSuccess || user) {
        navigate('/')
    }

    dispatch(reset())

},[user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}

const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
        email,
        password
    }

    dispatch(login(userData))
}

if(isLoading) {
    return <Spinner />
}


  return (
    <div className="wrapper">
      <section className="left__form">
        <h1>Image here</h1>
      </section>

      <section className="right__form">
        <div className='right__form_title'>
          <h1><FaUser /> Login</h1>
          <p>Login your credentials</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
          </div>
          <div className="form-group">
              <button type="submit" className='btn btn-block'>Submit</button>
          </div>
        </form>
        <small>Don't have an account?<Link to='/register'> Register</Link></small>
      </section>
    </div>
    
  )
}

export default Login