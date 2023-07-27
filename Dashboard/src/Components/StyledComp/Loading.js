import React from 'react'
import { css } from '@emotion/react';
import { BeatLoader
} from 'react-spinners';
import { Typography, Box } from '@mui/material'

const Loading = () => {

    // Define the CSS override for the spinner (optional, use only if you want to customize the style)
    const override = css`
    display: block;
    margin: 0 auto;
    `;

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} marginTop={'10%'}>
         <BeatLoader color="#8A2BE2" loading={true} css={override} size={20} />
    </Box>
  )
}

export default Loading