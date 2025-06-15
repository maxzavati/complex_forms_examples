import { z } from 'zod';
import {
  surveyAnswerFormSchema,
  surveyFormSchema,
  surveyQuestionFormSchema,
} from './schemas';

export type SurveyFormFields = z.infer<typeof surveyFormSchema>;
export type SurveyQuestionFormFields = z.infer<typeof surveyQuestionFormSchema>;
export type SurveyAnswerFormFields = z.infer<typeof surveyAnswerFormSchema>;

export type SurveyQuestion = SurveyQuestionFormFields & { id: string };
export type SurveyAnswer = SurveyAnswerFormFields & { id: string };
