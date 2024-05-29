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
  const [actualAnswers, setActualAnswers] = useState<{
    [key: string]: string[]
  }>({})
  const handleCreateForm = (data: { [key: string]: string[] }) => {
    setActualAnswers(data)
    setOpenConfirmationModal(true)
    console.log(data)
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    }
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
                  setOpenTest(true)
                  setNumberOfForm(index + 1)
                }}>{`formulario ${String(index + 1)}`}</GeneralButton>
            </li>
          ))}
        </ul>
      </article>

      {actualForm && openTest && (
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
                      { ...actualAnswers, student: 'pepe', numberOfForm }
                    ])
                  )
                }}>
                Enviar
              </GeneralButton>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default Student
