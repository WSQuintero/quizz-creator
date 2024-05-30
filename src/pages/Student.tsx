import { useContext, useState } from 'react'
import GeneralButton from '../components/GeneralButton'
import { GeneralContext } from '../context/GeneralContext'
import { useForm } from 'react-hook-form'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css/pagination'
import 'swiper/css'

function Student() {
  const { forms, studentAnswers } = useContext(GeneralContext)
  const [actualForm, setActualForm] = useState<OutputObject[] | undefined>()
  const [openTest, setOpenTest] = useState(false)
  const { register, handleSubmit } = useForm()
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [numberOfForm, setNumberOfForm] = useState<number | undefined>()
  const [openName, setOpenName] = useState(false)
  const [name, setName] = useState('')
  const [openResults, setOpenResults] = useState(false)
  const [actualAnswers, setActualAnswers] = useState<{
    [key: string]: string[]
  }>({})

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    }
  }

  const handleCreateForm = (data: { [key: string]: string[] }) => {
    setActualAnswers(data)
    setOpenConfirmationModal(true)
  }

  return (
    <div className='w-full h-screen flex justify-center flex-col items-center'>
      <GeneralButton
        className='mb-5'
        onClick={() => {
          window.history.back()
        }}>
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
                  setNumberOfForm(index + 1)
                  setOpenName(true)
                }}>{`formulario ${String(index + 1)}`}</GeneralButton>
            </li>
          ))}
        </ul>
      </article>

      {openName && (
        <div className='fixed w-full h-full top-0 bg-black/50 flex justify-center items-center'>
          <article className='flex-col justify-center'>
            <input
              type='text'
              placeholder='Escribe tu nombre'
              onChange={(event) => setName(event?.target.value)}
              className='h-[50px]'
            />
            <GeneralButton
              onClick={() => {
                setOpenName(false)
                setOpenTest(true)
              }}>
              Ir a formulario
            </GeneralButton>
          </article>
        </div>
      )}

      {actualForm && openTest && name && (
        <div className='w-full h-full bg-black/50 top-0 left-0 z-50 flex justify-center fixed flex-col items-center'>
          <GeneralButton
            onClick={() => {
              setOpenTest(false)
              setActualForm([])
            }}>
            {'<-'}
          </GeneralButton>
          <div className='w-2/4'>
            <h3>Crea tus preguntas y respuestas</h3>

            <form
              onSubmit={handleSubmit(handleCreateForm)}
              className='flex flex-col w-full gap-3 h-[70vh] justify-center items-center'>
              <Swiper pagination={pagination} modules={[Pagination]}>
                {actualForm.map((question, index) => (
                  <SwiperSlide className='w-full h-full' key={index}>
                    <span className='absolute top-6 left-3 border border-gray-400 p-2 bg-white rounded-full h-[30px] w-[30px] flex justify-center items-center z-50'>
                      {index + 1}
                    </span>
                    <article
                      key={index}
                      className='flex-col w-[90%] relative h-[80%] overflow-auto'>
                      <ul>
                        <li>{question.question}</li>

                        {Object.entries(question.answers).map(
                          ([, answer], ind) => (
                            <ul key={ind} className='w-full flex gap-3 mt-5'>
                              <li className='flex'>
                                <span>{answer}</span>
                                <div className='p-2 flex flex-col justify-center items-center'>
                                  <input
                                    type='radio'
                                    id={`question-${index + 1}-answer-${
                                      ind + 1
                                    }`}
                                    value={answer}
                                    {...register(`answers[${index}]`, {
                                      required: true
                                    })}
                                  />
                                </div>
                              </li>
                            </ul>
                          )
                        )}
                      </ul>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* {error && <span className='text-red-600 text-xl'>{error}</span>} */}
              <GeneralButton type='submit'>Crear</GeneralButton>
            </form>
          </div>
        </div>
      )}

      {openConfirmationModal && (
        <div className='bg-black/80 w-full h-full z-50 fixed top-0 left-0 flex justify-center items-center'>
          <article className='flex justify-center items-center flex-col h-auto p-10'>
            <h3>¿Estás seguro de enviar tus respuestas?</h3>
            <div className='flex gap-5'>
              <GeneralButton
                onClick={() => {
                  setOpenConfirmationModal(false)
                  setActualAnswers({})
                }}>
                cancelar
              </GeneralButton>
              <GeneralButton
                onClick={() => {
                  localStorage.setItem(
                    'answers',
                    JSON.stringify([
                      ...studentAnswers,
                      { ...actualAnswers, student: name, numberOfForm }
                    ])
                  )
                  setOpenConfirmationModal(false)
                  setOpenResults(true)
                }}>
                Enviar
              </GeneralButton>
            </div>
          </article>
        </div>
      )}

      {openResults && actualAnswers && name && (
        <div className='z-50 fixed top-0 left-0 bg-black w-full h-full flex justify-center items-center flex-col gap-5 p-10'>
          <GeneralButton
            onClick={() => {
              setOpenResults(false)
              setActualAnswers({})
              setOpenTest(false)
              setActualForm([])
            }}>
            {'<-'}
          </GeneralButton>
          <p className='font-bold text-white'>
            {name} tuviste{' '}
            <span>
              {
                forms[Number(numberOfForm) - 1].filter(
                  (question, index) =>
                    Object.values(question.answers)[
                      Number(question.correctAnswer?.split('-')[2]) - 1
                    ] === actualAnswers.answers[index]
                ).length
              }
            </span>{' '}
            respuesta/s correcta/s:{' '}
          </p>

          {forms[Number(numberOfForm) - 1].map((question, ind) => (
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
                  <span>{actualAnswers.answers[ind]}</span>{' '}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Student
