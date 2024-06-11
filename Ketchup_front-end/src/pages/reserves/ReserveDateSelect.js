import * as React from 'react';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ReserveDateSelect({ value, onChange }) {
  return (
    <FormControl sx={{ m: 1, width: "30vw", background: "white" }} xs={6} >
      <TextField
        variant="outlined"
        name="rsvDate"
        type="date"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
