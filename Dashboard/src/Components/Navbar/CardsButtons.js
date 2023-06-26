import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)({
  // backgroundColor: 'red',
  backgroundColor: 'rgba(255,255,255,0.7)',
  color: 'black',
  borderRadius: '4px',
  padding: '8px 16px',
  width: '160px'
});


const CardsButtons = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link to="/recentEvents">
            <StyledButton variant="contained" color="primary">
              Recent Events
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/nasa">
            <StyledButton variant="contained" color="primary">
              NASA
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/sun">
            <StyledButton variant="contained" color="primary">
              Sun
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardsButtons;