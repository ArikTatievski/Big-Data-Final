import React, { useState } from 'react';
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


const EventsTable = ({events}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const headers = ["Date", "Right Ascension", "Declination", "Magnitude", "Apparent Diameter", "Constellation"];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };


  return (
    <TableContainer component={Paper} sx={{marginTop:'3%',backgroundColor:'rgba(255,255,255,0.3)'}}>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {events
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((event, index) => (
            <TableRow key={index}>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.rightAscension}</TableCell>
              <TableCell>{event.declination}</TableCell>
              <TableCell>{event.magnitude}</TableCell>
              <TableCell>{event.apparentDiameter}</TableCell>
              <TableCell>{event.constellation}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <TablePagination
      rowsPerPageOptions={20}
      component="div"
      count={events.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
    />
  </TableContainer>
  )
}

export default EventsTable