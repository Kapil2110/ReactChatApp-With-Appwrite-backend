import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Messages from './pages/Messages.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import UserProfile from './pages/UserProfile.jsx'
import SearchUser from './pages/SearchUser.jsx'

 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
          path: "/messages",
          element: <Messages />,
      },
      {
        path: "/UserProfile",
        element: <UserProfile />,
      },
      {
        path: "/search",
        element: <SearchUser />,
      },
   ]
  }
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
