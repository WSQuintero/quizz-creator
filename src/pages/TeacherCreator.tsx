import { useContext, useState } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { Navigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { QuestionsSchema } from '../schema/questionsSchema'
import QuestionsCreatedPreview from '../components/QuestionsCreatedPreview'
import GeneralButton from '../components/GeneralButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css/pagination'
import 'swiper/css'

function TeacherCreator() {
  const { questions, answers, setActualFormCreation, actualFormCreation } =
    useContext(GeneralContext)
  const questionsToRender = Array(Number(questions)).fill('')
  const answersToRender = Array(Number(answers)).fill('')
  const [error, setError] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const { register, handleSubmit, clearErrors } = useForm()
  const [disabledInputs, setDisabledInputs] = useState<Set<string>>(new Set())
  const [openModal, setOpenModal] = useState<boolean>(false)

  if (!questions || !answers) {
    return <Navigate to={'/teacher'} />
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    }
  }

  const handleInputChange = (index: number, ind: number) => {
    const questionKey = `question_${index + 1}`
    const inputKey = `${questionKey}-correct-${ind + 1}`

    setCorrectAnswers((prev) => [...prev, inputKey])
    setDisabledInputs((prev) => new Set(prev).add(questionKey))
  }

  const validations = (data: CreateQuestions) => {
    const resultValidationSchema = QuestionsSchema.safeParse(data)

    const validateInputs = (toValidate: string, condition: number) => {
      return (
        Number(
          Object.entries(data).filter(
            (dat) => dat[0].startsWith(toValidate) && dat[1]
          ).length
        ) !== Number(condition)
      )
    }

    if (!resultValidationSchema.success) {
      setError(resultValidationSchema.error.issues[0].message)
      return false
    }

    if (Number(correctAnswers.length) !== Number(questions)) {
      setError('Debes seleccionar la respuesta correcta de cada pregunta ')
      return false
    }

    if (validateInputs('question', Number(questions))) {
      setError('Debes rellenar todas las preguntas ')
      return false
    }

    if (validateInputs('answer', Number(answers) * Number(questions))) {
      setError('Debes rellenar todas las respuestas ')
      return false
    }
    clearErrors()
    setError('')
    return true
  }

  const handleCreateForm = (data: CreateQuestions) => {
    setOpenModal(false)
    if (!validations(data)) return
    setOpenModal(true)

    const intermediateData = Object.entries(data).map((question) => {
      const correctQuestion = question[0].split('-')
      const correctData = question[1]

      if (correctQuestion.includes('answer')) {
        return {
          numberQuestion: Number(correctQuestion[3]),
          numberAnswer: correctQuestion[1],
          answer: correctData
        }
      } else {
        return {
          numberQuestion: Number(correctQuestion[correctQuestion.length - 1]),
          question: correctData
        }
      }
    })

    const questionsWithoutCorrectAnswer = intermediateData.reduce(
      (acc: OutputObject[], item: InputObject) => {
        const existingQuestion = acc.find(
          (q) => q.numberQuestion === item.numberQuestion
        )

        if (item.question) {
          if (!existingQuestion) {
            acc.push({
              question: item.question,
              numberQuestion: Number(item.numberQuestion),
              answers: {}
            })
          }
        }

        if (item.answer && item.numberAnswer) {
          if (existingQuestion) {
            existingQuestion.answers[`answer-${item.numberAnswer}`] =
              item.answer
          }
        }

        return acc
      },
      []
    )
    const finalData = questionsWithoutCorrectAnswer
      .sort((a, b) => a.numberQuestion - b.numberQuestion)
      .map((question, index) => {
        const sortedCorrectAnswers = correctAnswers.sort((a, b) => {
          const aNumber = Number(a.split('-')[0].split('_')[1])
          const bNumber = Number(b.split('-')[0].split('_')[1])
          return aNumber - bNumber
        })

        return {
          ...question,
          correctAnswer: sortedCorrectAnswers[index]
        }
      })
    setActualFormCreation(finalData)
  }

  const disableAllRadioInputs = () => {
    const radioInputs = document.querySelectorAll('input[type="radio"]')
    radioInputs.forEach((input) => {
      (input as HTMLInputElement).checked = false
    })
  }

  const resetcorrectOptions = () => {
    setDisabledInputs(new Set())
    setCorrectAnswers([])
    disableAllRadioInputs()
  }

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <h3>Crea tus preguntas y respuestas</h3>
      <form
        onSubmit={handleSubmit(handleCreateForm)}
        className='flex flex-col w-3/4 gap-3 h-[80vh] justify-center items-center'>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          >
          {questionsToRender.map((_, index) => (
            <SwiperSlide className='w-full '>
              <article key={index} className='flex-col w-[90%] relative h-auto'>
                <span className='absolute top-6 -left-3 border border-gray-400 p-2 bg-white rounded-full'>
                  {index + 1}
                </span>
                <input
                  type='text'
                  placeholder='Crea tu pregunta'
                  {...register(`question-${index + 1}`)}
                  className='text-center'
                />
                {answersToRender.map((_, ind) => (
                  <div key={ind} className='w-full flex gap-3 mt-5'>
                    <input
                      type='text'
                      placeholder='Crea tu respuesta'
                      {...register(`answer-${ind + 1}-question-${index + 1}`)}
                    />
                    <div className='border border-gray-400 p-2 flex flex-col justify-center items-center '>
                      <label htmlFor={`question-${index + 1}`}>
                        ¿Correcta?
                      </label>
                      <input
                        type='radio'
                        key={ind}
                        id={`question-${index + 1}`}
                        name={`question-${index + 1}`}
                        disabled={disabledInputs?.has(`question_${index + 1}`)}
                        onChange={() => handleInputChange(index, ind)}
                      />
                    </div>
                  </div>
                ))}
              </article>

            </SwiperSlide>
          ))}
        </Swiper>
      {error && <span className='text-red-600 text-xl'>{error}</span>}
        <GeneralButton type='submit'>Crear</GeneralButton>
      </form>

      {Number(actualFormCreation.length) === Number(questions) && openModal && (
        <QuestionsCreatedPreview
          actualQuestions={actualFormCreation}
          setActualFormCreation={setActualFormCreation}
          resetcorrectOptions={resetcorrectOptions}
        />
      )}
    </div>
  )
}

export default TeacherCreator
