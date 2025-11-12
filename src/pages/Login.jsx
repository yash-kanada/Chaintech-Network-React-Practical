import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [show, setShow] = useState(false)
  const [btnDis, setBtnDis] = useState(false)
  const navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault()

    // for fetch stored user
    const savedUser = JSON.parse(localStorage.getItem("user"))

    try {
      setBtnDis(true)
      // Authenticate user by matching email & password
      if (savedUser && savedUser.email === email && savedUser.password === pass) {
        toast.success("Login successful! Redirecting to your profile...", { autoClose: 1500 });
        navigate('/profile')
      } else {
        toast.error("Invalid credentials. Please check your email or password.")
      }
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

            <h4 className="text-center fw-bold text-dark mb-4">Login</h4>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className='position-relative'>
                <input
                  type={show ? 'text' : 'password'}
                  className='form-control'
                  id='password'
                  onChange={(e) => setPass(e.target.value)} />
                <i
                  className={`bi ${show ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                  onClick={() => setShow(!show)}>
                </i>
              </div>
            </div>

            {/* Login button that becomes disabled and displays a spinner while the login request is being processed */}
            <button className='btn btn-dark w-100 fw-bold' disabled={btnDis} onClick={handleSubmit}>
              {btnDis ? (<>
                Log in...
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
              </>) : ("Login")}
            </button>

            <div className="text-center mt-3">
              <span className="text-dark d-block mb-2 crsptr fw-bold">
                Forgot Password?
              </span>
              <span className="text-muted">
                Don’t have an account?{' '}
                <span className="text-dark crsptr fw-bold" onClick={() => navigate('/')}>
                  Register
                </span>
              </span>
            </div>

          </form>
        </div>
      </div>

    </>
  )
}

export default Login
