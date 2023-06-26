import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material'
import NasaTable from './NasaTable';
import { fetchNasaAPI } from './NasaEvents'
import Graph from './Graph';


const Nasa = () => {
    const [allEvents, setAllEvents] = useState();
    const [allEventsFlag, setAllEventsFlag] = useState(false);
    const [hourlyCounts, setHourlyCounts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const message = await fetchNasaAPI();
            // const jsonMsg = JSON.stringify(messege, null, 2);
            console.log(message);
            setAllEvents(message);
            setAllEventsFlag(true);
            const eventsCombined = [].concat(...Object.values(message))
            // Filter the list based on events that occurred in the last 24 hours
            const filteredData = eventsCombined.filter((event) => {
                const close_approach_data = event.close_approach_data[0].close_approach_date_full;
                const currentTime = new Date();
                const eventTime = new Date(close_approach_data);
                const timeDifference = Math.abs(eventTime - currentTime);
                const hoursDiff = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
                return hoursDiff <= 24;
            });
            setHourlyCounts(countEventsByHour(filteredData));
        };
        fetchData();
    }, []);

    const countEventsByHour = (data) => {
        const counts = Array(24).fill(0);
        data.forEach((event) => {
            const close_approach_data = event.close_approach_data[0].close_approach_date_full;
            const eventDate = new Date(close_approach_data);
            const hour = eventDate.getHours();
            counts[hour]++;
        });

        // Transform counts array into an array of objects
        const dataPoints = counts.map((count, index) => ({ hour: index, count }));
        return dataPoints;
    };


    return (
        <>
            {allEventsFlag ? <Box width={'66%'} margin={'0 auto'} marginTop={'5%'} >
                <Card sx={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                    <CardContent>
                        <Typography variant="h5" component="div" textAlign={'center'} color={'#4B0082'}>
                            NASA
                        </Typography>
                        <Typography variant="body2" color={'#4B0082'}>
                            <NasaTable events={allEvents} />
                            <Graph counts={hourlyCounts} />
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
                : <div>Hello World!</div>}

        </>
    )
}

export default Nasa