import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { ThemeProvider } from '@material-tailwind/react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, AdminLogin , Dashboard, AllBlogs, Blog, BlogInfo,} from './pages/index';

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
        element : <AllBlogs />
      },
      {
        path : '/bloginfo/:id',
        element : <BlogInfo  />
      },
      {
        path : '/adminlogin',
        element : <AdminLogin  />
      },
      {
        path : '/dashboard',
        element : <Dashboard  />
      },
    ]
  }
])

//store and redux
import { Provider } from 'react-redux';
import store from './store/store.js';




createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider> 
      </ThemeProvider>
  </StrictMode>,
)
