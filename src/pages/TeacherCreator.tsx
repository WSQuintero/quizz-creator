import { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { Navigate } from 'react-router'

function TeacherCreator() {
  const { questions, answers } = useContext(GeneralContext)

  if (!questions || !answers) {
    return <Navigate to={'/'} />
  }

  return <div>TeacherCreator</div>
}

export default TeacherCreator
