import { ReactNode, createContext, useState } from 'react'

const GeneralContext = createContext<ContextTypes>({
  questions: '',
  setQuestions: () => null,
  answers: '',
  setAnswers: () => null,
  actualFormCreation: [],
  setActualFormCreation: () => null,
  forms: [],
  setForms: () => null
})

function ContextProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState('')
  const [answers, setAnswers] = useState('')
  const [forms, setForms] = useState<OutputObject[]>(
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
        setForms
      }}>
      {children}
    </GeneralContext.Provider>
  )
}

export { ContextProvider, GeneralContext }
