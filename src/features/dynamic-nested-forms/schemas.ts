import { z } from 'zod';
import { Dayjs } from 'dayjs';

export const surveyAnswerFormSchema = z.object({
  text: z.string().min(1, 'Answer is required'),
  points: z.number(),
});

export const surveyQuestionFormSchema = z.object({
  text: z.string().min(1, 'Name is required'),
  withAnswers: z.boolean(),
  answerOptions: z.array(surveyAnswerFormSchema).optional(),
});

export const surveyFormSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.custom<Dayjs>().nullable().optional(),
  endDate: z.custom<Dayjs>().nullable().optional(),
  showSurvey: z.boolean(),
  questions: z
    .array(surveyQuestionFormSchema)
    .min(1, 'At least 1 question is required'),
});
