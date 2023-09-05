import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Root from './routes/root';
import Error from './components/Error';
import Game from './components/Game';
import Login from './components/Login';
import Rank from './components/Rank';
import Teams from './components/Teams';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Game />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/rank",
        element: <Rank />
      },
      {
        path: "/teams",
        element: <Teams />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
