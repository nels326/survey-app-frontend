import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const path = window.location.pathname;

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <h1 className=""><span>Survey App</span></h1>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/surveys" className={"nav-link " + (path === '/surveys' ? 'active' : '')}>Surveys</Link></li>
            <li><Link to="/questions" className={"nav-link " + (path === '/questions' ? 'active' : '')}>Questions</Link></li>

          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  )
}

