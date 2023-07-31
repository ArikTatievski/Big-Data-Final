import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material';
import LastEvent from './LastEvent';
import EventsTable from './EventsTable';
import { fetchEvents } from './EventsExample';
import PieChart from './PieChart';
import Loading from '../../StyledComp/Loading';

const RecentEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [allEventsFlag, setAllEventsFlag] = useState(false);
  const [lastCurrentTime, setLastCurrentTime] = useState();
  const [lastReporter, setLastReporter] = useState();
  const [lastEventType, setLastEventType] = useState();
  const [lastSeverity, setLastSeverity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await fetchEvents();
        setAllEvents(message);
        setAllEventsFlag(true);

        const lastEvent = message.reduce((latest, currentEvent) => {
          const latestTime = new Date(latest.currentTime).getTime();
          const currentTime = new Date(currentEvent.currentTime).getTime();

          return currentTime > latestTime ? currentEvent : latest;
        }, message[0]);
        const { currentTime, reporter, eventType, severity } = lastEvent;
        setLastCurrentTime(currentTime);
        setLastEventType(reporter);
        setLastReporter(eventType);
        setLastSeverity(severity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 12 seconds (12000 milliseconds)
    const intervalId = setInterval(fetchData, 12000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {allEventsFlag ? (
        <Box width={'66%'} margin={'0 auto'} marginTop={'5%'}>
          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
            <CardContent>
              <Typography variant="h5" component="div" textAlign={'center'} color={'#4B0082'}>
                Recent Events
              </Typography>
              <LastEvent currentTime={lastCurrentTime} reporter={lastReporter} eventType={lastEventType} severity={lastSeverity} />
              <EventsTable events={allEvents} />
              <PieChart allEvents={allEvents} />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RecentEvents;