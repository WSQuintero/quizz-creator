import { z } from "zod";

export const QuestionsSchema =z.record(z.string({message:"El valor ingresado debe ser un string"}))