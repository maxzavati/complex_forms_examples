// ----- Requests -----
export interface SurveyRequest {
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  questions: SurveyQuestionRequest[];
}

type SurveyAnswerRequest = Omit<SurveyAnswerResponse, 'id'>;

type SurveyQuestionRequest = Omit<
  SurveyQuestionResponse,
  'id' | 'answerOptions'
> & {
  answerOptions: SurveyAnswerRequest[];
};

// ----- Responses -----
export interface SurveyResponse {
  id: string;
  title: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  questions: SurveyQuestionResponse[];
}

export interface SurveyAnswerResponse {
  id: string;
  order: number;
  text: string;
  points: number;
}

export interface SurveyQuestionResponse {
  id: string;
  text: string;
  order: number;
  answerOptions: SurveyAnswerResponse[];
}

export interface SurveyListItem {
  id: string;
  title: string;
  createdAt: string;
  questionCount: number;
}

export interface SurveysListResponse {
  list: SurveyListItem[];
  count: number;
  total: number;
}
