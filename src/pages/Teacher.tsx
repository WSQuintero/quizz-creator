import { ChangeEvent, useContext } from 'react'
import { useNavigate } from 'react-router'
import { GeneralContext } from '../context/GeneralContext'
import GeneralButton from '../components/GeneralButton'

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
    <div className='w-full h-screen flex justify-center items-center'>
    <article className='flex-col justify-around'>

      <label htmlFor='questions' className='text-center font-bold'>
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
      <label htmlFor='answers'  className='text-center font-bold'>
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
      <GeneralButton onClick={handleSendQuestions}>Enviar</GeneralButton>
    </article>
    </div>
  )
}

export default Teacher
