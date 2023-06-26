import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material'
import LastEvent from './LastEvent';
import EventsTable from './EventsTable';
import { fetchEvents } from './EventsExample';
import PieChart from './PieChart';


const RecentEvents = () => {
  const [allEvents, setAllEvents] = useState();
  const [allEventsFlag, setAllEventsFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const message = await fetchEvents();
      console.log(message);
      setAllEvents(message);
      setAllEventsFlag(true);
    };
    fetchData();
  }, []);
  return (<>
    {allEventsFlag ? <Box width={'66%'} margin={'0 auto'} marginTop={'5%'} >
      <Card sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
        <CardContent>
          <Typography variant="h5" component="div" textAlign={'center'} color={'#4B0082'}>
            Recent Events
          </Typography>
          <LastEvent currentTime={'2023-05-16'} reporter={'MMT'} eventType={"GRB"} severity={'2'} />
          <Typography variant="body2">
            <EventsTable events={allEvents} />
            {/* <PieChart/> */}
          </Typography>
        </CardContent>
      </Card>
    </Box> : <div>Hello World!</div>}
  </>
  )
}

export default RecentEvents