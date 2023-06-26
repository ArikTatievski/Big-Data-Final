import React from 'react'
import {Typography,Box, Grid, TextField, Checkbox, Button} from '@mui/material'
import FilterBox from '../../StyledComp/FilterBox'

const SearchRecentEvents = ({checkBoxFlags,onCheckBoxChange,onClick,eventDate,eventsTime,reporter,eventType,severity,setEventDate,setEventsTime,setReporter,setEventType,setSeverity}) => {
  return (
    <Box display={'flex'} margin={'1%'}>
        <Typography  color={'#4B0082'}>Search:</Typography>
        <FilterBox index ={0} label={'Events Date'} type={'date'} variant={"standard"} setValue={setEventDate} value={eventDate} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <FilterBox index ={1} label={'Events Time'} type={'time'} variant={"standard"} setValue={setEventsTime} value={eventsTime} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <FilterBox index ={2} label={'Reporter'} variant={"outlined"} setValue={setReporter} value={reporter} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <FilterBox index ={3} label={'Events Type'} variant={"outlined"} setValue={setEventType} value={eventType} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <FilterBox index ={4} label={'severity'} type={"number"} variant={"outlined"} setValue={setSeverity} value={severity} setChecked={onCheckBoxChange} checkBoxFlags={checkBoxFlags}/>
        <Box alignSelf={'center'}>
            <Button variant="contained" onClick={onClick}>Search</Button>
        </Box>
        
    </Box>
  )
}

export default SearchRecentEvents