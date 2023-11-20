import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddJob from './pages/AddJob.jsx'
import Home from './pages/Home.jsx'
import Job from './pages/Job.jsx'

import App from './App.jsx'
import './index.css'
import "leaflet/dist/leaflet.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }
      , 
      {
        path: '/signup',
        element: <Signup/>
      }, 
      {
        path: '/addJob',
        element: <AddJob />
      }, 
      {
        path: '/jobs/:jobId',
        element: <Job />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
