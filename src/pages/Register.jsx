import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Register() {

  const [user, setUser] = useState({ name: '', email: '', password: '', conf_password: '' })
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [btnDis, setBtnDis] = useState(false)
  const navigate = useNavigate()

  // this function handle form submitting
  const handleSubmit = async (e) => {
    e.preventDefault()

    // this condition check if any field is empty
    if (!user.name || !user.email || !user.password) {
      console.log("All fields are required. Please fill out every field.")
      toast.error("Please fill in all required fields before continuing.")
      return
    }

    // this condition check password match
    if (user.password !== user.conf_password) {
      toast.error("Passwords do not match. Please try again.")
      return
    }

    try {
      setBtnDis(true)
      // if all ok then save and user redirect
      localStorage.setItem("user", JSON.stringify(user))
      toast.success("Registration successful! You can now log in.", { autoClose: 1500 })
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBtnDis(false)
    }

  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-10 col-sm-8 col-md-7 col-lg-4">
          <form className="p-4 border rounded shadow" >

            <h4 className="text-center fw-bold text-dark mb-4">Register</h4>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className='position-relative'>
                <input
                  type={show ? 'text' : 'password'}
                  className='form-control'
                  id='password'
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required />
                {/* this code for eye toggle */}
                <i
                  className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                  onClick={() => setShow(!show)}>
                </i>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className='position-relative'>
                <input
                  type={show1 ? 'text' : 'password'}
                  className='form-control'
                  id='conf_password'
                  onChange={(e) => setUser({ ...user, conf_password: e.target.value })}
                  required />
                <i
                  className={`bi ${show1 ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                  onClick={() => setShow1(!show1)}>
                </i>
              </div>
            </div>

            {/* Register button that becomes disabled and displays a spinner while the registration data is being submitted */}
            <button className='btn btn-dark w-100 mb-4' disabled={btnDis} onClick={handleSubmit}>
              {btnDis ? (<>
                Register...
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
              </>) : ("Register")}
            </button>

            <div className="text-center">
              Already have an account?
              <span className="text-dark crsptr fw-bold" onClick={() => navigate('/login')}> Login</span>
            </div>

          </form>
        </div>
      </div>

    </>
  )
}

export default Register
