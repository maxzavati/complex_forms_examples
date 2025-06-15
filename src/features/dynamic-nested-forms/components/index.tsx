import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { SurveyQuestion } from '../types';
import { SurveyQuestionForm } from './question';
import { useSurveyForm } from '../hooks/survey-form';
import { SortableDnd } from '@/components/ui/sortable-dnd';

export function SurveyForm() {
  const {
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
  } = useSurveyForm();

  const { control, formState } = formMethods;

  return (
    <Paper
      sx={{
        padding: { xs: 2, md: 3 },
      }}
      component='form'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mb: 2,
        }}
      >
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth={true}
              label='Survey name'
              variant='outlined'
              value={field.value}
              onChange={field.onChange}
              error={!!formState.errors.title}
              helperText={formState.errors.title?.message}
            />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth={true}
              label='Survey description'
              variant='outlined'
              value={field.value}
              onChange={field.onChange}
              error={!!formState.errors.description}
              helperText={formState.errors.description?.message}
            />
          )}
        />

        <Box
          sx={{
            display: 'flex',
            fillOpacity: { sm: 'column' },
            gap: 3,
          }}
        >
          <Controller
            name='startDate'
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Start date (optional)'
                  value={field.value}
                  onChange={field.onChange}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name='endDate'
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='End date (optional)'
                  value={field.value || null}
                  onChange={field.onChange}
                />
              </LocalizationProvider>
            )}
          />
        </Box>

        <Box>
          <Controller
            name='showSurvey'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch checked={field.value} onChange={field.onChange} />
                }
                label='Show survey'
              />
            )}
          />
        </Box>

        <Divider />

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <Typography>Questions</Typography>
            {formState.errors.questions ? (
              <Typography
                color='error'
                sx={{
                  fontSize: 12,
                }}
              >
                {formState.errors.questions.message}
              </Typography>
            ) : null}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <SortableDnd<SurveyQuestion>
              data={questionsField.fields}
              onReorder={handleReorderQuestion}
              renderItem={(_, index) => {
                return (
                  <SurveyQuestionForm
                    index={index}
                    editMode={editMode}
                    onEditMode={setEditMode}
                    onSaveQuestion={handleSaveQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                  />
                );
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 3,
            }}
          >
            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              onClick={handleCreateQuestion}
              disabled={editMode}
            >
              Add question
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
        <Button onClick={handleCancelSubmitForm} variant='text'>
          Cancel
        </Button>
        <Button
          variant='contained'
          disabled={editMode}
          onClick={handleSubmitForm}
        >
          Publish
        </Button>
      </Box>
    </Paper>
  );
}
