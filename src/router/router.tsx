import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Teacher from '../pages/Teacher'
import Student from '../pages/Student'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />
  },
  {
    path: '/teacher',
    element: <Teacher />
  },
  {
    path: '/student',
    element: <Student />
  }
]

export const router = createBrowserRouter(routes)
