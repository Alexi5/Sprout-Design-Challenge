import React from 'react';
import {Link} from 'react-router'
let navLogo = require('../assets/01_Logo/03_Wordmark/02-sprout-social-logo-wordmark-DARK-BG-2x.png');

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        
        <div className="navbar-header">
          <a className="navbar-brand" href="http://sproutsocial.com/">
            <img src={navLogo}/>
          </a>
        </div>

        <div className="right-menu">
          <div>
            <ul className="nav navbar-right">
              <li><Link to={"/plans"}>Plans</Link></li>
              <li><a href="http://sproutsocial.com/pricing">Plan Details</a></li>
              <li><a href="http://sproutsocial.com/customers">About</a></li>
            </ul>
          </div>
        </div>

        <div>

        </div>
      </div>
    </nav>
  )
}
