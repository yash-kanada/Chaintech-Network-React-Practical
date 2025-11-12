import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {

  const [user, setUser] = useState({})
  const [btnDis, setBtnDis] = useState(false)
  const navigate = useNavigate()

  // get user data when page reload
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))
    setUser(savedUser)
  }, [])

  // this function update user means update local storage
  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      setBtnDis(true)
      localStorage.setItem("user", JSON.stringify(user))
      toast.success("Profile updated successfully!", { autoClose: 1500 });
      navigate('/profile')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBtnDis(false)
    }
  }


  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        {/* for center our profile content */}
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="col-10 col-sm-8 col-md-7 col-lg-4">
            <form className='p-4 border rounded shadow'>

              <h4 className="text-center fw-bold text-dark mb-4">Edit Profile</h4>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </div>

              {/* Update button that becomes disabled and displays a spinner while local storage updating */}
              <button className='btn btn-dark w-100' disabled={btnDis} onClick={handleSubmit}>
                {btnDis ? (<>
                  Updating...
                  <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                </>) : ("Update")}
              </button>

            </form>
          </div>
        </div>
        <Footer />
      </div>

    </>
  )
}

export default Profile
