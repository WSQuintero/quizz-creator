interface ContextTypes {
  questions: string
  setQuestions: Dispatch<SetStateAction<string>>
  answers: string
  setAnswers: Dispatch<SetStateAction<string>>
  actualFormCreation:OutputObject[],
  setActualFormCreation:Dispatch<SetStateAction<OutputObject[]>>
  forms:OutputObject[][],
  setForms:Dispatch<SetStateAction<OutputObject[]>>,
  studentAnswers:{[key:string]:string[]}[],
  setStudentAnswers:Dispatch<SetStateAction<{[key:string]:string[]}[]>>
}