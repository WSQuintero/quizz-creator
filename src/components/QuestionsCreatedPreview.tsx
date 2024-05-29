import React, { useContext, useMemo, useState } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { useNavigate } from 'react-router'
import { QuestionsCreatedPreviewType } from '../types/GeneralComponentsTypes'
import GeneralButton from './GeneralButton'
import ConfirmationAlert from './ConfirmationAlert'

function QuestionsCreatedPreview({
  actualQuestions,
  setActualFormCreation,
  resetcorrectOptions
}: QuestionsCreatedPreviewType) {
  const { forms, setForms } = useContext(GeneralContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

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
    setForms((prev: OutputObject[][]) => [...prev, actualQuestions])
    setTitle('Crear')
    setMessage('Cuestionario creado correctamente')
    setTimeout(() => {
      setActualFormCreation([])
      navigate('/teacher')
    }, 2000)
  }

  const getCorrectAnswer = (
    actualQuestions: OutputObject[],
    ind: number
  ): number => {
    if (
      actualQuestions &&
      actualQuestions[ind] &&
      actualQuestions[ind].correctAnswer
    ) {
      const correctAnswer = actualQuestions[ind]?.correctAnswer
      if (correctAnswer) {
        const correctAnswerParts = correctAnswer.split('-')
        return Number(correctAnswerParts[correctAnswerParts.length - 1])
      }
    }
    return 0
  }

  const correctAnswers = useMemo(() => {
    return actualQuestions.map((_, ind: number) =>
      getCorrectAnswer(actualQuestions, ind)
    )
  }, [actualQuestions])

  return (
    <div className='bg-black/50 w-full h-screen gap-5 fixed top-0 left-0 z-50 flex justify-start items-center flex-col p-10 '>
      <button
        className='bg-white absolute top-10 right-5 p-5 rounded-full w-[30px] h-[30px] flex justify-center items-center'
        onClick={handleCancelSendQuestions}>
        X
      </button>

      <div className='h-[90vh]  overflow-auto w-full flex flex-col justify-center items-center gap-5'>
        {actualQuestions.map((question, ind) => (
          <article key={ind} className='flex-col h-[200px] p-5'>
            <span className='p-3 w-[30px] h-[30px] bg-white flex justify-center items-center rounded-full border border-gray-400'>
              {question.numberQuestion}
            </span>
            <p className='font-bold border border-gray-400 pl-5 mt-3'>
              Pregunta: <span className='font-normal'>{question.question}</span>
            </p>
            <div className='flex gap-3 border border-gray-400 pl-5'>
              <p className='font-bold '>Respuesta correcta: </p>
              {Object.entries(question.answers).map((answer, index) => (
                <div key={index}>
                  {correctAnswers[ind] - 1 === index && (
                    <p className='text-green-500'>{answer[1]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className='flex gap-3 border border-gray-400 pl-5'>
              <p className='font-bold '>Respuestas incorrectas: </p>
              <ol className='flex flex-col list-disc ml-5'>
                {Object.entries(question.answers).map((answer, index) => (
                  <React.Fragment key={index}>
                    {correctAnswers[ind] - 1 !== index && (
                      <li>
                        <p className='text-red-500'>{answer[1]}</p>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
      <div>
        <GeneralButton onClick={handleCreateQuestions}>Enviar</GeneralButton>
      </div>
      {title && message && (
        <ConfirmationAlert title={title} message={message} />
      )}
    </div>
  )
}

export default QuestionsCreatedPreview
