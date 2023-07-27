import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography, Box } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';
import SearchNasa from './SearchNasa';


const NasaTable = ({ events }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allEvents, setAllEvents] = useState([].concat(...Object.values(events)));
  const [eventsToShow, setEventsToShow] = useState([].concat(...Object.values(events)));
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [checkBoxFlags, setCheckBoxFlag] = useState([false, false]);
  const [selectedOption, setSelectedOption] = useState(1);
  const headers = ["Id", "Name", "Distance From Earth(astronomical)", "Distance From Earth(lunar)", "Distance From Earth(kilometers)", "Distance From Earth(miles)"];


  const handleBooleanChange = (index) => {
    const updatedList = [...checkBoxFlags];
    updatedList[index] = !checkBoxFlags[index];
    setCheckBoxFlag(updatedList);
  };

  const handleSearch = () => {

    const filteredList = allEvents.filter((item) => {
      // If all checkBoxFlags are false, include all items
      if (!checkBoxFlags.some((flag) => flag)) {
        return true;
      }

      // Check each flag and filter accordingly
      return (
        (!checkBoxFlags[0] || item.id.toLowerCase().includes(id.toLowerCase())) &&
        (!checkBoxFlags[1] || item.name.toLowerCase().includes(name.toLowerCase()))
      );
    });

    setEventsToShow(filteredList);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event) => {
    const order = event.target.value
    setSelectedOption(order);
    const temp = allEvents.sort((a, b) => {
      switch (order) {
        case 1:
          return a.id.localeCompare(b.id);
        case 2:
          return a.name.localeCompare(b.name);
        case 3:
          const distanceA = parseFloat(a.close_approach_data[0].miss_distance.kilometers);
          const distanceB = parseFloat(b.close_approach_data[0].miss_distance.kilometers);
          return distanceA - distanceB;
        default:
          return 0;
      }
    });
    setEventsToShow(temp)
  };


  return (
    <>
      <Box display={'flex'}>
        <Box alignSelf={'center'} marginRight={'1%'}>
          <Typography>Sort by: </Typography>
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
            <MenuItem value={1}>ID</MenuItem>
            <MenuItem value={2}>Name</MenuItem>
            <MenuItem value={3}>Distance From Earth</MenuItem>
          </Select>
        </Box>
      </Box>
      <SearchNasa checkBoxFlags={checkBoxFlags} onCheckBoxChange={handleBooleanChange} onClick={handleSearch} id={id} setId={setId} name={name} setName={setName} />
      <TableContainer component={Paper} sx={{ marginTop: '3%', backgroundColor: 'rgba(255,255,255,0.3)' }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {eventsToShow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event, index) => {
                const { miss_distance } = event.close_approach_data[0];
                const { astronomical, lunar, kilometers, miles } = miss_distance;

                return (
                  <TableRow key={event.id}>
                    <TableCell>{event.id}</TableCell>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{astronomical}</TableCell>
                    <TableCell>{lunar}</TableCell>
                    <TableCell>{kilometers}</TableCell>
                    <TableCell>{miles}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={allEvents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>


    </>
  )
}

export default NasaTable