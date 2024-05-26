import { useContext, useState } from 'react'
import { GeneralContext } from '../context/GeneralContext'
import { Navigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { QuestionsSchema } from '../schema/questionsSchema'
import QuestionsCreatedPreview from '../components/QuestionsCreatedPreview'

function TeacherCreator() {
  const { questions, answers, setActualFormCreation, actualFormCreation } =
    useContext(GeneralContext)
  const questionsToRender = Array(Number(questions)).fill('')
  const answersToRender = Array(Number(answers)).fill('')
  const [errorZod, setErrorZod] = useState('')

  const { register, handleSubmit, clearErrors } = useForm()

  if (!questions || !answers) {
    return <Navigate to={'/teacher'} />
  }

  const handleCreateForm = (data: CreateQuestions) => {
    const resultValidationSchema = QuestionsSchema.safeParse(data)
    if (!resultValidationSchema.success) {
      setErrorZod(resultValidationSchema.error.issues[0].message)
    } else {
      clearErrors()
      setErrorZod('')

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

      const finalData = intermediateData.reduce(
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

      setActualFormCreation(finalData)
    }
  }

  return (
    <div>
      <h3>Crea tus preguntas y respuestas</h3>
      <form onSubmit={handleSubmit(handleCreateForm)}>
        {questionsToRender.map((_, index) => (
          <article key={index}>
            <input
              type='text'
              placeholder='Crea tu pregunta'
              {...register(`question-${index + 1}`)}
            />
            {answersToRender.map((_, ind) => (
              <input
                type='text'
                placeholder='Crea tu respuesta'
                key={ind}
                {...register(`answer-${ind + 1}-question-${index + 1}`)}
              />
            ))}
          </article>
        ))}
        <button type='submit'>Crear</button>
      </form>
      {errorZod && <span>{errorZod}</span>}
      {actualFormCreation.length > 0 && (
        <QuestionsCreatedPreview
          actualQuestions={actualFormCreation}
          setActualFormCreation={setActualFormCreation}
        />
      )}
    </div>
  )
}

export default TeacherCreator
