import { Dispatch, SetStateAction, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { generateAnswerFields } from '../utils';
import { surveyQuestionFormSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveyAnswer, SurveyQuestionFormFields } from '../types';

interface Args {
  onSaveQuestion: ({
    index,
    data,
  }: {
    index: number;
    data: SurveyQuestionFormFields;
  }) => void;
  onDeleteQuestion: (index: number) => void;
  onEditMode: Dispatch<SetStateAction<boolean>>;
}

export function useSurveyQuestionForm({
  onEditMode,
  onSaveQuestion,
  onDeleteQuestion,
}: Args) {
  const [expended, setExpended] = useState(false);

  const formMethods = useForm<SurveyQuestionFormFields>({
    resolver: zodResolver(surveyQuestionFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      text: '',
      withAnswers: true,
      answerOptions: [],
    },
  });

  const { control, handleSubmit, reset, setValue, watch } = formMethods;

  const clearOnCloseQuesion = () => {
    onEditMode(false);
    setExpended((prev) => !prev);
  };

  const handleSaveQuestion = (index: number) => {
    handleSubmit(async (data: SurveyQuestionFormFields) => {
      onSaveQuestion({ index, data });
      clearOnCloseQuesion();
    })();
  };

  const handleDeleteQuestion = (index: number) => {
    onDeleteQuestion(index);
  };

  const handleCancelQuestion = () => {
    reset();
    clearOnCloseQuesion();
  };

  const answersField = useFieldArray({
    control,
    name: 'answerOptions',
  });

  const handleCreateAnswer = () => {
    answersField.append(generateAnswerFields(answersField.fields.length));
  };

  const handleReorderAnswer = (answers: SurveyAnswer[]) => {
    const updatedAnswers = answers.map((item, index) => ({
      ...item,
      order: index,
    }));
    setValue('answerOptions', updatedAnswers);
  };

  const handleDeleteAnswer = (index: number) => {
    if (answersField.fields.length) {
      answersField.remove(index);
    }
  };

  const handleEdit = () => {
    onEditMode(true);
  };

  return {
    formMethods,
    answersField,
    expended,
    setExpended,
    handleEdit,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleCancelQuestion,
    handleCreateAnswer,
    handleDeleteAnswer,
    handleReorderAnswer,
  };
}
