import React from 'react'
import {Typography,Box} from '@mui/material'

const LastEvent = ({ currentTime, reporter, eventType, severity }) => {
  return (
    <Box>
        <Typography  textAlign={'center'} >
            The most recent event occurred on {currentTime}. <br/>
            It was reported by {reporter} and categorized as a {eventType} event with a severity level of {severity}.
        </Typography>
    </Box>
  )
}

export default LastEvent