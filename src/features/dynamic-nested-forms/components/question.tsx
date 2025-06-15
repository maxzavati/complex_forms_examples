import { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Accordion } from '@/components/ui/accordion';
import { SortableDnd } from '@/components/ui/sortable-dnd';
import { SurveyAnswer, SurveyQuestionFormFields } from '../types';
import { useSurveyQuestionForm } from '../hooks/survey-question-form';

interface Props {
  index: number;
  editMode: boolean;
  onEditMode: Dispatch<SetStateAction<boolean>>;
  onSaveQuestion: ({
    index,
    data,
  }: {
    index: number;
    data: SurveyQuestionFormFields;
  }) => void;
  onDeleteQuestion: (index: number) => void;
}

export function SurveyQuestionForm({
  index,
  editMode,
  onEditMode,
  onSaveQuestion,
  onDeleteQuestion,
}: Props) {
  const {
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
  } = useSurveyQuestionForm({
    onSaveQuestion,
    onDeleteQuestion,
    onEditMode,
  });

  const { control, formState, watch } = formMethods;
  const [questionText, withAnswers] = watch(['text', 'withAnswers']);

  const handleToggle = () => {
    setExpended((prev) => !prev);
    if (!questionText) {
      onEditMode(true);
    }
  };

  const questionErrors = formState.errors;
  const answerErrors = formState.errors.answerOptions;
  const displayEditMode = editMode || !questionText;

  const renderEditView = () => {
    return (
      <>
        <Controller
          name='text'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label='Question'
              variant='outlined'
              value={field.value}
              onChange={field.onChange}
              error={!!questionErrors?.text}
              helperText={questionErrors?.text?.message}
            />
          )}
        />
        <Box>
          <Controller
            name='withAnswers'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch checked={field.value} onChange={field.onChange} />
                }
                label='With answers'
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <SortableDnd<SurveyAnswer>
            data={answersField.fields}
            onReorder={handleReorderAnswer}
            renderItem={(_, answerIndex) => (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Controller
                  name={`answerOptions.${answerIndex}.text`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={`Answer ${answerIndex + 1}`}
                      variant='outlined'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!answerErrors?.[answerIndex]?.text}
                      helperText={answerErrors?.[answerIndex]?.text?.message}
                    />
                  )}
                />
                <Controller
                  name={`answerOptions.${answerIndex}.points`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type='number'
                      placeholder='Points'
                      variant='outlined'
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        field.onChange(value === '' ? null : Number(value));
                      }}
                      error={!!answerErrors?.[answerIndex]?.points}
                      helperText={answerErrors?.[answerIndex]?.points?.message}
                    />
                  )}
                />
                <Box>
                  <IconButton onClick={() => handleDeleteAnswer(answerIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          />
        </Box>
        <Box>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={handleCreateAnswer}
            disabled={!withAnswers}
          >
            Add Answer
          </Button>
        </Box>
        <Divider />
      </>
    );
  };

  const renderReadView = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography>Answers:</Typography>
          {answersField.fields.map((item) => (
            <Typography key={item.id}>
              <Box component='span'>{item.text}</Box> - {item.points} points
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  const renderDeleteQuestionButton = () => {
    return (
      <Button
        color='error'
        variant='outlined'
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteQuestion(index)}
      >
        Delete
      </Button>
    );
  };

  return (
    <Accordion
      title={questionText || `Question ${index + 1}`}
      expanded={expended}
      onToggle={handleToggle}
      childrenActions={
        <>
          {displayEditMode ? (
            <>
              {renderDeleteQuestionButton()}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant='text' onClick={handleCancelQuestion}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  onClick={() => handleSaveQuestion(index)}
                >
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box></Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Button
                  variant='outlined'
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                {renderDeleteQuestionButton()}
              </Box>
            </>
          )}
        </>
      }
    >
      {displayEditMode ? renderEditView() : renderReadView()}
    </Accordion>
  );
}
