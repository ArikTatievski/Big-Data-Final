import React from 'react'
import {Typography,Box, Grid, TextField, Checkbox, Button} from '@mui/material'
import FilterBox from '../../StyledComp/FilterBox'

const SearchNasa = ({checkBoxFlags, onCheckBoxChange,onClick,id,setId,name,setName}) => {
  return (
    <Box display={'flex'} margin={'1%'}>
        <Typography>Search:</Typography>
        <FilterBox index ={0} label={'ID'} type={'text'} variant={"outlined"} setValue={setId} value={id} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <FilterBox index ={1} label={'Name'} type={'text'} variant={"outlined"} setValue={setName} value={name} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <Box alignSelf={'center'}>
            <Button variant="contained" onClick={onClick}>Search</Button>
        </Box>
        
    </Box>
  )
}

export default SearchNasa