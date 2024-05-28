import { useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { useNavigate } from 'react-router'

function QuestionsCreatedPreview({
  actualQuestions,
  setActualFormCreation,
  correctAnswers,
  resetcorrectOptions
}: {
  actualQuestions: OutputObject[]
  setActualFormCreation: (actualQuestions: OutputObject[]) => void
  correctAnswers: string[]
  resetcorrectOptions: () => void
}) {
  const { forms, setForms } = useContext(GeneralContext)
  const navigate = useNavigate()

  const handleCancelSendQuestions = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setActualFormCreation([])
    resetcorrectOptions()
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

  const getCorrectAnswer = (ind: number) => {
    return Number(
      correctAnswers[ind]?.split('-')[
        correctAnswers[ind]?.split('-').length - 1
      ]
    )
  }
  return (
    <div>
      {actualQuestions.map((question, ind) => (
        <div key={ind}>
          <p>{question.numberQuestion}</p>
          <p>{question.question}</p>
          <p>Respuesta correcta {getCorrectAnswer(ind)}</p>
          {Object.entries(question.answers).map((answer, index) => (
            <div key={index}>
              {getCorrectAnswer(ind) - 1 === index && <p>{answer[1]}</p>}
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
