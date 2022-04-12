import {Link} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'

function Register() {
  return (
    <div className="wrapper">
      <section className="left__form">
        <h1>Image here</h1>
      </section>

      <section className="right__form">
        <div className='right__form_title'>
          <h1><FaUser /> Register</h1>
          <p>Please create an account</p>
        </div>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id='name' name='name' value='' placeholder='Enter your name' />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id='email' name='email' value='' placeholder='Enter your email' />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' name='password' value='' placeholder='Enter your password' />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password2' name='password2' value='' placeholder='Confirm password' />
          </div>
          <div className="form-group">
              <button type="submit" className='btn btn-block'>Submit</button>
          </div>
        </form>
        <small>Have an account already?<Link to='/login'> Login</Link></small>
      </section>
    </div>
    
  )
}

export default Register