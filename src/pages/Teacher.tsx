import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { GeneralContext } from '../context/GeneralContext'
import GeneralButton from '../components/GeneralButton'

function Teacher() {
  const {
    questions,
    answers,
    setQuestions,
    setAnswers,
    forms,
    studentAnswers
  } = useContext(GeneralContext)
  const navigate = useNavigate()
  const [createQuizz, setCreateQuizz] = useState(false)
  const [seeForms, setSeeForms] = useState(false)
  const [actualForm, setActualForm] = useState<OutputObject[] | undefined>()
  const [openStudentResults, setOpenStudentResults] = useState(false)
  const [openStudentForm, setOpenStudentForm] = useState(false)
  const [actualStudentForm, setActualStudentForm] =
    useState<StudentAnswersType>()
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
          <GeneralButton
            className='h-[150px]'
            onClick={() => setOpenStudentResults(true)}>
            Ver resultados estudiantes
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

      {openStudentResults && (
        <div className='w-full fixed h-full top-0 left-0 z-50 bg-black/50 flex justify-center items-center'>
          <article>
            {studentAnswers.map((student, index) => (
              <GeneralButton
                className='h-[50px] w-full'
                key={index}
                onClick={() => {
                  setOpenStudentForm(true)
                  setActualStudentForm(student)
                }}>
                {student.student}
              </GeneralButton>
            ))}
          </article>
        </div>
      )}
      {openStudentForm && actualStudentForm && (
        <div className='z-50 fixed top-0 left-0 bg-black w-full h-full flex justify-center items-center flex-col gap-5 p-10 overflow-auto'>
          <GeneralButton
            onClick={() => {
              setActualStudentForm(undefined)
              setOpenStudentForm(false)
            }}>
            {'<-'}
          </GeneralButton>
          <h3 className='text-white'>
            Formulario número: {actualStudentForm.numberOfForm}
          </h3>
          <p className='font-bold text-white'>
            {actualStudentForm.student} tuvo{' '}
            <span>
              {
                forms[Number(actualStudentForm.numberOfForm) - 1].filter(
                  (question, index) =>
                    Object.values(question.answers)[
                      Number(question.correctAnswer?.split('-')[2]) - 1
                    ] === actualStudentForm.answers[index]
                ).length
              }
            </span>{' '}
            respuestas correctas de{' '}
            {forms[Number(actualStudentForm.numberOfForm) - 1].length} posibles
          </p>

          {forms[Number(actualStudentForm.numberOfForm) - 1].map(
            (question, ind) => (
              <article
                key={ind}
                className='flex-col h-[250px] p-5 justify-center '>
                <span className='p-3 w-[30px] h-[30px] bg-white flex justify-center items-center rounded-full border border-gray-400'>
                  {question.numberQuestion}
                </span>
                <p className='font-bold border border-gray-400 pl-5 mt-3'>
                  Pregunta:{' '}
                  <span className='font-normal'>{question.question}</span>
                </p>
                <div className='flex  border border-gray-400  flex-col '>
                  <p className='font-bold border border-gray-400 pl-5'>
                    Respuesta correcta:{' '}
                    <span>
                      {
                        Object.values(question.answers)[
                          Number(question?.correctAnswer?.split('-')[2]) - 1
                        ]
                      }
                    </span>
                  </p>

                  <p className='font-bold border border-gray-400 pl-5'>
                    Respuesta seleccionada:{' '}
                    <span>{actualStudentForm.answers[ind]}</span>{' '}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </main>
  )
}

export default Teacher
