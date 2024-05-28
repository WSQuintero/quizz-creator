import { ButtonHTMLAttributes } from "react";

interface GeneralButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export interface QuestionsCreatedPreviewType{
  actualQuestions: OutputObject[]
  setActualFormCreation: (actualQuestions: OutputObject[]) => void
  resetcorrectOptions: () => void
}