import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Teacher from '../pages/Teacher'
import Student from '../pages/Student'
import TeacherCreator from '../pages/TeacherCreator'

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
  },
  {
    path: '/teacher/creator',
    element: <TeacherCreator />
  }
]

export const router = createBrowserRouter(routes)
