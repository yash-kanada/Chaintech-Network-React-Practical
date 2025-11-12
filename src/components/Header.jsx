import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar sticky-top text-bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand text-light">ChainTechTest</div>

                    {/* if not user not logged in show log in button */}
                    {!user && <button className="btn btn-outline-light" onClick={() => navigate('/login')}>Login</button>}

                    <div className='dropdown'>
                        <a
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <span>{user.name}</span>
                        </a>
                        <ul className='dropdown-menu dropdown-menu-end '>
                            <li className='crsptr li-custom'>
                                <span className="dropdown-item " onClick={() => navigate('/profile')}>
                                    <i className="bi bi-person me-2 "></i> Edit Profile
                                </span>
                            </li>
                            <li className='crsptr li-custom'>
                                <span className="dropdown-item " onClick={() => navigate('/change-pw')}>
                                    <i className="bi bi-shield-lock me-2"></i> Change Password
                                </span>
                            </li>
                             <li><hr className="dropdown-divider" /></li>
                            <li className='crsptr li1-custom '>
                                <span className="dropdown-item" onClick={() => navigate('/login')}>
                                    <i className="bi bi-box-arrow-right me-2 ms-1"></i> Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
