import React, {useState} from 'react'
import {Typography,Box, Grid, TextField, Checkbox} from '@mui/material'

const FilterBox = ({label, setValue, type, variant, value, index , setChecked,checkBoxFlags}) => {
    const [isDisabled, setIsDisabled] = useState(true);


    const handleChange = () =>{
        setChecked(index)
        setIsDisabled(!isDisabled);
    }

    const handleTextFieldChange = (event) =>{
        setValue(event.target.value);
    }

  return (
    <Grid>
      <Typography textAlign={"center"}  color={'#4B0082'}>{label}</Typography>
      <Box display={"flex"} justifyContent={"center"}>
        <TextField
          id="outlined-basic"
        //   label={label}
          value={value}
          variant={variant}
          type={type}
          disabled={isDisabled}
          onChange={handleTextFieldChange}
          style={{ width: '70%' }}
        />
        <Checkbox
          checked={checkBoxFlags[index]}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
    </Grid>
  );
}

export default FilterBox