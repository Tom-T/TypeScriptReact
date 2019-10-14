import React from 'react';
import { Link } from "react-router-dom"


export const Header: React.FC = () => {
  return (
  <nav className="nav">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/test">Test</Link></li>
      <li><Link to="/test/page1/">Test Page 1</Link></li>
      <li><Link to="/test/page2/2/thisissomething">Test Page 2.2</Link></li>
    </ul>
  </nav>
  )
}

export const PageNotFound: React.FC = () => {
  return (<h1> Page not found!</h1>)
}
