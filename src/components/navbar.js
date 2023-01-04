import React from 'react'
import { Link } from 'gatsby'

const NavBar = () => (
  <div
    style={{
      height: '4rem',
      top: '0px',
      left: '0px',
      right: '0px',
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div className="nav-bar-content">
      <Link to="/#talks" className="nav-item" itemProp="url">
        Talks
      </Link>{' '}
      <Link className="nav-item" to="/#interviews" itemProp="url">
        Interviews
      </Link>{' '}
      <Link className="nav-item" to="/#posts" itemProp="url">
        Blog
      </Link>{' '}
      <Link className="nav-item" to="/notes" itemProp="url">
        Notes
      </Link>{' '}
      <Link className="nav-item" to="/about" itemProp="url">
        About
      </Link>
    </div>
  </div>
)

export default NavBar
