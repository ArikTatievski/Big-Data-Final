import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography, Box } from '@mui/material'
import TableComp from './TableComp';
import { fetchEvents } from './EventsExample';
import SearchRecentEvents from './SearchRecentEvents';


const EventsTable = ({ events }) => {
  console.log(events);
  // const [allEvents, setAllEvents] = useState('');
  const [eventsToShow, setEventsToShow] = useState('');
  const [eventDate, setEventDate] = useState("");
  const [eventsTime, setEventsTime] = useState("");
  const [reporter, setReporter] = useState("");
  const [eventType, setEventType] = useState("");
  const [severity, setSeverity] = useState("");
  const [checkBoxFlags, setCheckBoxFlag] = useState([false, false, false, false, false]);

  const [selectedOption, setSelectedOption] = useState(1);

  function extractDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function extractTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const handleBooleanChange = (index) => {
    const updatedList = [...checkBoxFlags];
    updatedList[index] = !checkBoxFlags[index];
    setCheckBoxFlag(updatedList);
  };
  useEffect(() => {
    const initialSearch = () => {
      handleSearch();
    };
    initialSearch();
  }, []);
  const handleSearch = () => {

    const filteredList = events.filter((item) => {
      // If all checkBoxFlags are false, include all items
      if (!checkBoxFlags.some((flag) => flag)) {
        return true;
      }
      // Check each flag and filter accordingly
      return (
        (!checkBoxFlags[0] || extractDate(item.currentTime) === eventDate) &&
        (!checkBoxFlags[1] || extractTime(item.currentTime) == eventsTime) &&
        (!checkBoxFlags[2] || item.reporter.toLowerCase().includes(reporter.toLowerCase())) &&
        (!checkBoxFlags[3] || item.eventType.toLowerCase().includes(eventType.toLowerCase())) &&
        (!checkBoxFlags[4] || item.severity === Number(severity))
      );
    });

    setEventsToShow(filteredList);
  }

  const handleChange = (event) => {
    const order = event.target.value
    setSelectedOption(order);
    events.sort((a, b) => {
      switch (order) {
        case 1:
          return a.currentTime.localeCompare(b.currentTime);
        case 2:
          return a.reporter.localeCompare(b.reporter);
        case 3:
          return a.eventType.localeCompare(b.eventType);
        case 4:
          return a.severity - b.severity;
        default:
          return 0;
      }
    });

  };


  return (
    <>
      <Box display={'flex'} >
        <Box alignSelf={'center'} marginRight={'1%'}>
          <Typography color={'#4B0082'}>Sort by: </Typography>
        </Box>
        <Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Sort"
            onChange={handleChange}
            sx={{ width: '100%' }}
          >
            <MenuItem value={1}>Time</MenuItem>
            <MenuItem value={2}>Reporter</MenuItem>
            <MenuItem value={3}>Event Type</MenuItem>
            <MenuItem value={4}>severity</MenuItem>
          </Select>
        </Box>
      </Box>
      <SearchRecentEvents checkBoxFlags={checkBoxFlags} onCheckBoxChange={handleBooleanChange} onClick={handleSearch} eventDate={eventDate} eventsTime={eventsTime} reporter={reporter} eventType={eventType} severity={severity} setEventDate={setEventDate} setEventsTime={setEventsTime} setReporter={setReporter} setEventType={setEventType} setSeverity={setSeverity} />
      <Box>
        <TableComp events={eventsToShow} />
      </Box>
    </>
  )
}

export default EventsTable