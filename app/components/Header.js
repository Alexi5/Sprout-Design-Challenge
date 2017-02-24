import React from 'react';
import {Link} from 'react-router'

export default function Header() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Pushbot</a>
        </div>

        <div>
          <ul className="nav navbar-nav">
            <li><a href='#'>Tasks</a></li>
            <li><a href="#">Routines</a></li>
            <li><a href="#">Processes</a></li>
          </ul>
          <ul className="nav navbar-right">
            <li><a href="#">Team</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

