import { ChangeEvent, useContext } from 'react'
import { useNavigate } from 'react-router'
import { GeneralContext } from '../context/GeneralContext'

function Teacher() {
  const { questions, answers, setQuestions, setAnswers } =
    useContext(GeneralContext)
  const navigate = useNavigate()

  const handleSendQuestions = () => {
    if (questions && answers) {
      navigate('/teacher/creator')
    }
  }

  return (
    <div>
      <label htmlFor='questions'>
        Escribe cuantas preguntas quieres
        <input
          type='number'
          name='questions'
          id='questions'
          value={questions}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuestions(event.target.value)
          }
        />
      </label>
      <label htmlFor='answers'>
        Escribe cuantas respuestas por pregunta quieres
        <input
          type='number'
          name='answers'
          id='answers'
          value={answers}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setAnswers(event.target.value)
          }
        />
      </label>
      <button onClick={handleSendQuestions}>Enviar</button>
    </div>
  )
}

export default Teacher
