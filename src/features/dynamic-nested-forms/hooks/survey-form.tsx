import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  SurveyQuestion,
  SurveyFormFields,
  SurveyQuestionFormFields,
} from '../types';
import { addSurvey } from '@/apis/endpoints';
import { surveyFormSchema } from '../schemas';
import { generateQuestionFields } from '../utils';
import { zodResolver } from '@hookform/resolvers/zod';

export function useSurveyForm() {
  const [editMode, setEditMode] = useState(false);

  const formMethods = useForm<SurveyFormFields>({
    resolver: zodResolver(surveyFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      showSurvey: true,
      questions: [],
    },
  });

  const { control, handleSubmit, setValue, reset } = formMethods;

  const questionsField = useFieldArray({
    control,
    name: 'questions',
  });

  const addSurveyMutation = useMutation({
    mutationFn: addSurvey,
  });

  const handleCreateQuestion = () => {
    questionsField.append(generateQuestionFields(questionsField.fields.length));
  };

  const handleReorderQuestion = (questions: SurveyQuestion[]) => {
    const updatedQuestions = questions.map((item, index) => ({
      ...item,
      order: index,
    }));
    setValue('questions', updatedQuestions);
  };

  const handleSaveQuestion = ({
    index,
    data,
  }: {
    index: number;
    data: SurveyQuestionFormFields;
  }) => {
    setValue(`questions.${index}`, data);
  };

  const handleDeleteQuestion = (index: number) => {
    questionsField.remove(index);
  };

  const handleSubmitForm = () => {
    handleSubmit((data: SurveyFormFields) => {
      const mappedQuestions = data.questions.map((question, index) => ({
        ...question,
        order: index,
        answerOptions: question.answerOptions?.length
          ? question.answerOptions.map((answer, index) => ({
              ...answer,
              order: index,
            }))
          : [],
      }));

      const payload = {
        title: data.title,
        description: data.description,
        questions: mappedQuestions,
      };

      if (data.startDate) {
        Object.assign(payload, {
          startDate: data.startDate.toISOString(),
        });
      }

      if (data.endDate) {
        Object.assign(payload, {
          endDate: data.endDate.toISOString(),
        });
      }

      addSurveyMutation.mutate({
        payload,
      });
    })();
  };

  const handleCancelSubmitForm = () => {
    reset();
  };

  return {
    formMethods,
    questionsField,
    editMode,
    setEditMode,
    handleCreateQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleReorderQuestion,
    handleSubmitForm,
    handleCancelSubmitForm,
  };
}
