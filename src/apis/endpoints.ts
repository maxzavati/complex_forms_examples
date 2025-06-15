import api from '@/utils/api';
import { SurveyRequest, SurveyResponse, SurveysListResponse } from './types';

const SEGMENT_PATH = '/path-example';

export async function addSurvey({
  payload,
}: {
  payload: SurveyRequest;
}): Promise<SurveyResponse> {
  const res = await api.post<SurveyResponse>(SEGMENT_PATH, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function getSurvey({
  id,
}: {
  id: string;
}): Promise<SurveyResponse> {
  const res = await api.get<SurveyResponse>(`${SEGMENT_PATH}/${id}`);
  return res.data;
}

export async function updateSurvey({
  id,
  payload,
}: {
  id: string;
  payload: SurveyRequest;
}): Promise<SurveyResponse> {
  const res = await api.put<SurveyResponse>(`${SEGMENT_PATH}/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function getSurveys({
  page,
  limit = 100,
  search,
}: {
  page: number;
  search: string;
  limit?: number;
}): Promise<SurveysListResponse> {
  const searchQuery = search ? `&search=${search}` : '';
  const res = await api.get<SurveysListResponse>(
    `${SEGMENT_PATH}?page=${page}&limit=${limit}${searchQuery}`
  );
  return res.data;
}
