import React from "react";
import {Nav,Footer} from './components/index'
import { Outlet } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function App() {

  return (
    <div>
      <Nav />
        <Outlet />
           <Button>click</Button>
      <Footer />
    </div>
  )
}

export default App
