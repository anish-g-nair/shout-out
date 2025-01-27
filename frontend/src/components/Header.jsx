import React from 'react';

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <h1 className="text-2xl">{process.env.REACT_APP_APP_NAME}</h1>
  </header>
);

export default Header;
