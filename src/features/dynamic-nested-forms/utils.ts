import { generateId } from '@/utils/global';

export function generateAnswerFields(index: number) {
  return {
    id: generateId(),
    order: index,
    text: '',
    points: 0,
  };
}

export function generateQuestionFields(index: number) {
  return {
    id: generateId(),
    order: index,
    text: '',
    withAnswers: true,
    answerOptions: [],
  };
}
