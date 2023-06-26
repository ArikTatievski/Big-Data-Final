import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';




const CountryTime = ({img, timeZone1}) => {
    const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimeZone = (timeZone) => {
    return time.toLocaleTimeString('en-US', { timeZone: timeZone });
  };



  return (
    <Grid container spacing={1}>
        <Grid item xs={1}>
           
        </Grid>
        <Grid item xs={3}>
        <Box display={'flex'} justifyContent={'right'}>
            <img src={img} alt="Flag" width={'30px'} height={'30px'}/>
        </Box>
        </Grid>
        {/* <Grid item xs={3}>
           
        </Grid> */}
        <Grid item xs={6}>
            <Typography variant="h6" color="white">
                {getTimeInTimeZone(timeZone1)}
            </Typography>
        </Grid>
    </Grid>

  )
}

export default CountryTime