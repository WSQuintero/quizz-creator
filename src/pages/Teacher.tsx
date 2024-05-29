import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { GeneralContext } from '../context/GeneralContext'
import GeneralButton from '../components/GeneralButton'

function Teacher() {
  const { questions, answers, setQuestions, setAnswers, forms } =
    useContext(GeneralContext)
  const navigate = useNavigate()
  const [createQuizz, setCreateQuizz] = useState(false)
  const [seeForms, setSeeForms] = useState(false)
  const [actualForm, setActualForm] = useState<OutputObject[] | undefined>()

  const handleSendQuestions = () => {
    if (questions && answers) {
      navigate('/teacher/creator')
    }
  }

  return (
    <main className='w-full h-screen flex justify-center items-center flex-col '>
      {!createQuizz && !seeForms && (
        <article className='justify-around items-center'>
          <GeneralButton
            className='h-[150px]'
            onClick={() => setSeeForms(true)}>
            Ver cuestionarios
          </GeneralButton>
          <GeneralButton
            className='h-[150px]'
            onClick={() => setCreateQuizz(true)}>
            Crear cuestionario
          </GeneralButton>
        </article>
      )}
      {createQuizz && (
        <>
          <GeneralButton className='mb-5' onClick={() => setCreateQuizz(false)}>
            {'<-'}
          </GeneralButton>
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
            <label htmlFor='answers' className='text-center font-bold'>
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
        </>
      )}
      {seeForms && (
        <>
          <GeneralButton className='mb-5' onClick={() => setSeeForms(false)}>
            {'<-'}
          </GeneralButton>
          <article>
            <ul className='flex flex-wrap justify-around items-center'>
              {forms.map((form, index) => (
                <li key={index}>
                  <GeneralButton
                    onClick={() => {
                      setActualForm(undefined)
                      setActualForm(form)
                    }}>{`formulario ${String(index + 1)}`}</GeneralButton>
                </li>
              ))}
            </ul>
          </article>
        </>
      )}

      {actualForm && (
        <div className='fixed w-full h-screen top-0 left-0 z-50 flex justify-center items-center bg-black/50 flex-col'>
          <GeneralButton
            className='mb-5 absolute top-5 right-5'
            onClick={() => setActualForm(undefined)}>
            X
          </GeneralButton>
          <section className='w-2/4 h-[80vh]'>
            <article className='h-full w-full flex-col justify-around'>
              <ul className='flex flex-col w-full gap-3'>
                {actualForm.map((question, index) => (
                  <li
                    key={`${question.question}-${index}`}
                    className='w-full h-auto border border-gray-400 shrink-0 text-center flex flex-col'>
                    <span className='w-full border border-gray-400 font-bold'>
                      Pregunta {question.numberQuestion}
                    </span>
                    <span>{question.question}</span>
                    <div className='w-full flex flex-wrap'>
                      {Object.values(question.answers).map((answer, index) => (
                        <div className='w-2/4  flex flex-col justify-center'>
                          <span className='w-full border border-gray-400 font-bold'>
                            Respuesta {String(index + 1)}
                          </span>
                          <span className='border border-gray-400'>
                            {answer}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className='w-full border border-gray-400 font-bold mt-2 text-green-500'>
                      Respuesta correcta
                    </span>
                    <span>
                      {
                        Object.values(question.answers)[
                          Number(question.correctAnswer?.split('-')[2]) - 1
                        ]
                      }
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      )}
    </main>
  )
}

export default Teacher
