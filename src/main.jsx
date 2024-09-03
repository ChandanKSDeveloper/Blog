import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Toaster} from 'react-hot-toast'


import { ThemeProvider } from '@material-tailwind/react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, AdminLogin , Dashboard, AllBlogs, Blog, BlogInfo, CreateBlog, EditPost} from './pages/index';
import {Protected} from './components/index.js'

const router = createBrowserRouter([
  {
    path : '',
    element : <App />,
    children:[
      {
        path : '/',
        element : <Home />
      },
      {
        path : '/blog',
        element : <Blog />
      },
      {
        path : '/allblogs',
        // element : <AllBlogs />
        // authentication={false} 
        element : (<Protected authentication={true}>
                      <AllBlogs />
                    </Protected> 
                  )
      },
      {
        // use slug
        // path : '/bloginfo/:id',
        path : '/bloginfo/:slug',
        element : <BlogInfo  />
      },
      {
        path : '/adminlogin',
        element : <AdminLogin  />
      },
      {
        path : '/dashboard',
        element : (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        )
      },
      {
        path : '/createblog',
        element :  (
          <Protected authentication={true}>
            <CreateBlog />
          </Protected>)
      },
      {
        path : '/editpost/:slug',
        element :  (
          <Protected authentication={true}>
            <EditPost />
          </Protected>)
      }
    ]
  }
])

//store and redux
import { Provider } from 'react-redux';
import store from './store/store.js';




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider> 
      </ThemeProvider>
  </StrictMode>,
)
