interface CreateQuestions {
  [key: string]: string;
}

interface InputObject {
  numberQuestion: number
  question?: string
  numberAnswer?: string
  answer?: string
}

interface OutputAnswer {
  [key: string]: string
}

interface OutputObject {
  question: string
  numberQuestion: number
  answers: OutputAnswer
  correctAnswer:string
}