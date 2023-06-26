import React, { useEffect, useState } from 'react';
import {Typography,Box} from '@mui/material'
import navbarBg from '../../img/navBg1.jpg'
import Time from './Time'
import IsraelClock from './IsraelClock'
import CardsButtons from './CardsButtons'
// import GoogleFontLoader from 'react-google-font-loader';


const Navbar = () => {


  return (
    <Box
    sx={{
        height:'400px',
        width:'100%',
        // backgroundImage:`url(${navbarBg})`,
        // backgroundSize:'cover',


    }}
    >
        {/* header */}
        <Box sx={{height:'30%',display:'flex', justifyContent:'center'}}>
            <Typography variant='h2' align="center" alignSelf={'center'} color={'white'} sx={{ fontFamily: 'Caveat', color: 'white' }}>Real Time Space Research</Typography>
        </Box>
        {/* timers */}
        <Box sx={{height:'50%', display:'flex', marginTop:'2%'}}>
            <Box sx={{width:'50%'}}>
                <Box display={'flex'} justifyContent={'right'} marginRight={'2%'}>
                    <IsraelClock/>
                </Box> 
            </Box>
            <Box sx={{width:'50%',height:'100%' ,marginRight:'2%' }}>
                <Time/>
            </Box>
        </Box>
        {/* Buttons */}
        <Box display={'flex'} justifyContent={'center'} sx={{height:'20%', marginTop:'1%'}}>
            <CardsButtons/>
            
        </Box>

    </Box>
  )
}

export default Navbar