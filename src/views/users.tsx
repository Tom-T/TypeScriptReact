import React from 'react';
import logo from './logo.svg';


const User: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <p>
          This is the User page!
        </p>
      </body>
    </div>
  );
}

export default User;
