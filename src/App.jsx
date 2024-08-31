import React from "react";
import {Nav,Footer} from './components/index'
import { Outlet } from "react-router-dom";
import {Layout} from "./components/index";

function App() {

  return (
    <div>
      <Nav />
        <Layout>

          <Outlet />
        </Layout>
      <Footer />
    </div>
  )
}

export default App
