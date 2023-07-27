import React, { useState, useEffect } from 'react'
// import { sunInfo } from './SunInfo'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, Grid } from '@mui/material'
import SunTimes from './SunTimes';
import riseImg from '../../../img/Sunrise.jpg'
import setImg from '../../../img/Sunset.jpg'
import transitImg from '../../../img/Transit.jpg'
import EventsTable from './EventsTable';
import { fetchWebScrap } from './SunInfo'
import Loading from '../../StyledComp/Loading';

const Sun = () => {
  const [dataFlag, setDataFlag] = useState(false);
  const [data, setData] = useState('');
  // console.log(sunInfo);

  const { main_paragraph, rise, set, transit, sunspot_activity, distance_from_earth, look_back_ephemeris } = data;

  useEffect(() => {
    const fetchData = async () => {
      const message = await fetchWebScrap();
      // const jsonMsg = JSON.stringify(messege, null, 2);
      console.log(message);
      setData(message);
      setDataFlag(true);
    };
    fetchData();
  }, []);

  return (
    <>
      {dataFlag ?
        <Box width={"66%"} margin={"0 auto"} marginTop={"5%"}>
          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
            <CardContent>
              <Typography variant="h5" component="div" textAlign={"center"} color={'#4B0082'}>
                The Sun
              </Typography>
              <Box marginTop={'1%'}>
                <Typography textAlign={'center'}>
                  {main_paragraph}
                </Typography>
              </Box>
              <Typography variant="body2">
                <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <SunTimes header={"RISE"} time={rise.time} backgroundImage={riseImg} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2}>
                    <SunTimes header={"TRANSIT"} time={transit.time} backgroundImage={transitImg} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={2}>
                    <SunTimes header={"SET"} time={set.time} backgroundImage={setImg} />
                  </Grid>
                </Grid>

                <Box width={'100%'} textAlign={'center'} marginTop={'5%'}>
                  <img src={sunspot_activity} alt="Sunspot Activity" style={{ width: '100%', maxWidth: '600px' }} />
                </Box>

                <Typography variant="h5" component="div" textAlign={"center"} marginTop={'4%'}>
                  The Sun Distance from Earth
                </Typography>

                <Typography component="div" textAlign={"center"} marginTop={'1%'} color={"purple"}>
                  {distance_from_earth.distance_kilometers} KM
                </Typography>

                <EventsTable events={look_back_ephemeris} />



              </Typography>
            </CardContent>
          </Card>
        </Box>
        : 
        <Loading/>
        }

    </>
  );
}

export default Sun