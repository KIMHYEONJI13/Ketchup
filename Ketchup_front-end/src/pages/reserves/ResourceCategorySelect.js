import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ResourceCategorySelect({ value, onChange }) {
  const handleCategoryChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '30vw', background: "white" }} xs={6} >
        <Select
          displayEmpty
          value={value}
          onChange={handleCategoryChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          
        >
          <MenuItem disabled value="">
            <em><FilterListIcon/>자원 카테고리</em>
          </MenuItem> 
          <MenuItem value="회의실">회의실</MenuItem>
          <MenuItem value="차량">법인 차량</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

