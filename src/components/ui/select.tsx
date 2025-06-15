import { useId } from 'react';

import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface Props {
  value: string | null;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
}

export function Select({
  value,
  label,
  onChange,
  options,
  disabled,
  error,
  helperText,
}: Props) {
  const inputLabelId = useId();
  const selectId = useId();

  return (
    <FormControl fullWidth error={error}>
      {label ? <InputLabel id={inputLabelId}>{label}</InputLabel> : null}
      <MuiSelect
        value={value}
        label={label}
        id={selectId}
        disabled={disabled}
        labelId={inputLabelId}
        onChange={(event) =>
          event.target.value ? onChange(event.target.value) : null
        }
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}
