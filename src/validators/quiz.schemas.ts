import { z } from 'zod';

export const answeredQuestionSchema = z.object({
  questionId: z.string().trim().min(1, 'Falta el identificador de la pregunta'),
  selected: z.array(z.string().trim().min(1)).max(10).default([])
});

export const submitAttemptSchema = z.object({
  answers: z.array(answeredQuestionSchema).min(1, 'Debes responder al menos una pregunta')
});
