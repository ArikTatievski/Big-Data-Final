import React from 'react'
import {Typography,Box} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Graph = ({ counts }) => {
    return (
        <Box marginTop={'5%'}>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={counts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8A2BE2" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
     
    );
  };
export default Graph