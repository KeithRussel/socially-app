import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {getProfile, setProfile} from '../features/profile/profileSlice'

function EditPostPage() {
    const [address, setAddress] = useState('')
    const [bio, setBio] = useState('')

    let {id} = useParams();
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const {profile} = useSelector((state) => state.profile)

    useEffect(() => {
        if(!profile) {
            dispatch(getProfile())
        } else {
            setAddress(profile.address)
            setBio(profile.bio)
        }
    }, [dispatch, profile]);

    const onSubmit = e => {
        e.preventDefault()

        dispatch(setProfile({_id: id, bio, address}))
        navigate('/profile/user/me')
    }

  return (
    <section className='form'>
        <Link to={`/`} >Go back</Link>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Address:</label>
                <input type="text" name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='' />
            </div>
            <div className="form-group">
                <label htmlFor="text">Bio:</label>
                <input type="text" name='bio' id='bio' value={bio} onChange={(e) => setBio(e.target.value)} placeholder='' />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                {profile ? 'Update' : 'Add'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default EditPostPage