import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from 'react'

interface ContextTypes {
  questions: string
  setQuestions: Dispatch<SetStateAction<string>>
  answers: string
  setAnswers: Dispatch<SetStateAction<string>>
}

const GeneralContext = createContext<ContextTypes>({
  questions: '',
  setQuestions: () => null,
  answers: '',
  setAnswers: () => null
})

function ContextProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState('')
  const [answers, setAnswers] = useState('')

  return (
    <GeneralContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers
      }}>
      {children}
    </GeneralContext.Provider>
  )
}

export { ContextProvider, GeneralContext }
