import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import chinaFlag from '../../img/china.svg'
import unitedStatesFlag from '../../img/UnitedStatesFlag.svg'
import russiaFlag from '../../img/Russia.svg'
import spainFlag from '../../img/Spain.svg'
import CountryTime from './CountryTime';

const Time = () => {

    const currentDate = new Date().toLocaleDateString();



  return (
    // <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} sx={{  width: '100%', height:'100%' }}>
    //     {/* <Grid container spacing={1}>
    //         <Grid item xs={6}>

    //         </Grid>
    //         <Grid item xs={2} display={'flex'} justifyContent={'center'}>
    //            <Typography variant='h4' color={'white'} >{currentDate}</Typography>
    //         </Grid>
    //         <Grid item xs={4}>
    //         </Grid>

    //     </Grid> */}
    //     <Box display={'flex'} justifyContent={'center'} marginLeft={'8%'}>
    //         <Typography variant='h4' color={'white'} >{currentDate}</Typography>
    //     </Box>
        
    //     <CountryTime img={unitedStatesFlag} timeZone1={'America/New_York'}/>
    //     <CountryTime img={spainFlag} timeZone1={'Europe/Madrid'}/>
    //     <CountryTime img={russiaFlag} timeZone1={'Europe/Moscow'}/>
    //     <CountryTime img={chinaFlag} timeZone1={'Asia/Shanghai'}/>
    // </Box>
    <Grid container marginTop={'1.5%'}>
      <Grid item xs={5}>
        <Box display={'flex'} justifyContent={'center'} marginRight={'14%'} >
              <Typography variant='h4' color={'white'} >{currentDate}</Typography>
        </Box>
          
        <CountryTime img={unitedStatesFlag} timeZone1={'America/New_York'}/>
        <CountryTime img={spainFlag} timeZone1={'Europe/Madrid'}/>
        <CountryTime img={russiaFlag} timeZone1={'Europe/Moscow'}/>
        <CountryTime img={chinaFlag} timeZone1={'Asia/Shanghai'}/>

      </Grid>


    </Grid>


  )
}

export default Time