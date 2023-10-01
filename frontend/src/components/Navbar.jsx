import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './Auth/LoginButton'
import LogoutButton from './Auth/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar() {
  const {isLoading, isAuthenticated, user} = useAuth0()
  const datafrom = useAuth0()
  console.log(datafrom,"seeinf data")
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic"to="/">Bitemate</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page"to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </div>

    {
      !isLoading? (<>
      
      
        <div>
        {isAuthenticated? (
        <> <Link to="/profile">My Profile</Link> <LogoutButton/>
        
        </>
        
        ):
        (<LoginButton/>)}
        </div>
      
      </>) : null
    }

</nav>
  </div>
  )
}
