import React from "react";
import {Nav,Footer} from './components/index'
import { Outlet } from "react-router-dom";


function App() {

  return (
    <div>
      <Nav />
        <Outlet />
      <Footer />
    </div>
  )
}

export default App
