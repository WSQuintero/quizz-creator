import { ReactNode, createContext, useState } from 'react'

const GeneralContext = createContext<ContextTypes>({
  questions: '',
  setQuestions: () => null,
  answers: '',
  setAnswers: () => null,
  actualFormCreation: [],
  setActualFormCreation: () => null,
  forms: [],
  setForms: () => null,
  studentAnswers: [],
  setStudentAnswers: () => null
})

function ContextProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState('')
  const [answers, setAnswers] = useState('')
  const [studentAnswers, setStudentAnswers] = useState(
    JSON.parse(String(localStorage.getItem('answers'))) || []
  )
  const [forms, setForms] = useState<OutputObject[][] | []>(
    JSON.parse(String(localStorage.getItem('forms'))) || []
  )
  const [actualFormCreation, setActualFormCreation] = useState<OutputObject[]>(
    []
  )

  return (
    <GeneralContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        actualFormCreation,
        setActualFormCreation,
        forms,
        setForms,
        studentAnswers,
        setStudentAnswers
      }}>
      {children}
    </GeneralContext.Provider>
  )
}

export { ContextProvider, GeneralContext }
