import React, {  useContext, useState } from 'react'
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
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const { register, handleSubmit, clearErrors } = useForm()
  const [disabledInputs, setDisabledInputs] = useState<Set<string>>(new Set())

  if (!questions || !answers) {
    return <Navigate to={'/teacher'} />
  }

  const handleInputChange = (
    index: number,
    ind: number
  ) => {
    const questionKey = `question_${index + 1}`
    const inputKey = `${questionKey}-correct-${ind + 1}`

    setCorrectAnswers((prev) => [...prev, inputKey])
    setDisabledInputs((prev) => new Set(prev).add(questionKey))
  }

  const handleCreateForm = (data: CreateQuestions) => {
    const resultValidationSchema = QuestionsSchema.safeParse(data)
    if (!resultValidationSchema.success) {
      setErrorZod(resultValidationSchema.error.issues[0].message)
      return
    } else {
      clearErrors()
      setErrorZod('')

      if(Number(correctAnswers.length)!==Number(questions)){
      setErrorZod("Debes seleccionar la respuesta correcta de cada pregunta ")
        return
      }
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

  function disableAllRadioInputs() {
    const radioInputs = document.querySelectorAll('input[type="radio"]')
    radioInputs.forEach((input) => {
      (input as HTMLInputElement).checked = false;
    })
  }
  const resetcorrectOptions = () => {
    setDisabledInputs(new Set())
    setCorrectAnswers([])
    disableAllRadioInputs()
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
              <React.Fragment key={ind}>
                <input
                  type='text'
                  placeholder='Crea tu respuesta'
                  {...register(`answer-${ind + 1}-question-${index + 1}`)}
                />
                <label htmlFor={`question-${index + 1}`}>¿Correcta?</label>
                <input
                  type='radio'
                  key={ind}
                  id={`question-${index + 1}`}
                  name={`question-${index + 1}`}
                  disabled={disabledInputs?.has(`question_${index + 1}`)}
                  onChange={() => handleInputChange( index, ind)}
                />
              </React.Fragment>
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
          correctAnswers={correctAnswers}
          resetcorrectOptions={resetcorrectOptions}
        />
      )}
    </div>
  )
}

export default TeacherCreator
