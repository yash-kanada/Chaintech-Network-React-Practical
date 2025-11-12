import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ChangePW() {

    const [user, setUser] = useState({})
    const [pass, setPass] = useState("")
    const [conf_pass, setConf_Pass] = useState("")
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [btnDis, setBtnDis] = useState(false)
    const navigate = useNavigate()

    // for fetching stored user
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"))
        setUser(savedUser)
    }, [])

    // this function change password and navigate to login page
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!pass || !conf_pass) {
            toast.error("Please fill in both password fields.");
            return
        }

        if (pass !== conf_pass) {
            toast.error("Passwords do not match. Please try again.");
            return
        }

        try {
            setBtnDis(true)
            const updatedUser = { ...user, password: pass }
            setUser(updatedUser)
            localStorage.setItem("user", JSON.stringify(updatedUser))
            toast.success("Password updated successfully! Please log in again.", { autoClose: 1500 });
            navigate('/login')
        }catch(error){
            toast.error(error.message)
        }finally{
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

                            <h4 className="text-center fw-bold text-dark mb-4">Change Password</h4>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className='position-relative'>
                                    <input
                                        type={show ? 'text' : 'password'}
                                        className='form-control'
                                        id='password'
                                        onChange={(e) => setPass(e.target.value)} />
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
                                        onChange={(e) => setConf_Pass(e.target.value)} />
                                    <i
                                        className={`bi ${show1 ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y me-3 crsptr`}
                                        onClick={() => setShow1(!show1)}>
                                    </i>
                                </div>
                            </div>

                            <button className='btn btn-dark w-100' disabled={btnDis} onClick={handleSubmit}>
                                {btnDis ? (<>
                                Changing...
                                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
                                </>) : ("Change")}
                                </button>

                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ChangePW
