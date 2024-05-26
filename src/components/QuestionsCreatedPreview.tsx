import { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { useNavigate } from 'react-router'

function QuestionsCreatedPreview({
  actualQuestions,
  setActualFormCreation
}: {
  actualQuestions: OutputObject[]
  setActualFormCreation: (actualQuestions: OutputObject[]) => void
}) {
  const { forms, setForms } = useContext(GeneralContext)
  const navigate = useNavigate()

  const handleCancelSendQuestions = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setActualFormCreation([])
  }

  const handleCreateQuestions = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    localStorage.setItem('forms', JSON.stringify([...forms, actualQuestions]))
    setForms((prev: OutputObject[]) => [...prev, actualQuestions])
    setActualFormCreation([])
    navigate('/teacher')
  }
  return (
    <div>
      {actualQuestions.map((question, index) => (
        <div key={index}>
          <p>{question.numberQuestion}</p>
          <p>{question.question}</p>
          {Object.entries(question.answers).map((answer, index) => (
            <div key={index}>
              <p>{answer[1]}</p>
            </div>
          ))}
        </div>
      ))}
      <div>
        <button onClick={handleCancelSendQuestions}>Cancelar</button>
        <button onClick={handleCreateQuestions}>Enviar</button>
      </div>
    </div>
  )
}

export default QuestionsCreatedPreview
