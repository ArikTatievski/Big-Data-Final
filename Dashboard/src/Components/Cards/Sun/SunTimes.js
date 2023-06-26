import React from 'react'
import {Typography,Box} from '@mui/material'

const SunTimes = (props) => {
    const { header, time, backgroundImage } = props;

    const boxStyles = {
        marginTop: '20%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        color: '#fff', // Optionally set the text color to make it visible against the background image
      };

  return (
    <Box style={boxStyles} marginTop={'4%'}>
        <Typography variant='h5' display={'flex'} justifyContent={'center'} color={'black'}>
            {header}
        </Typography>
        <Typography variant='h6' display={'flex'} justifyContent={'center'} color={'black'}>
            {time}
        </Typography>
       



    </Box>
  )
}

export default SunTimes