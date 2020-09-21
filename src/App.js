import React from 'react';
import 'antd/dist/antd.css';
import "./App.css"
import Routes from './Routes/Routes'
import {UserProvider} from './Context/UserContext'

function App() {
  return (
    <>
      <UserProvider>
        <Routes/>
      </UserProvider>
      
    </>
  );
}

export default App;
