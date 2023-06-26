import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchEvents } from './EventsExample';

const PieChart = () => {
  const [allEvents, setAllEvents] = useState(fetchEvents());
  const [series, setSeries] = useState([44, 55, 13, 43, 22]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  useEffect(() => {
    // Filter events within the last 24 hours
    const filteredEvents = allEvents.filter(event => {
      const currentTime = new Date();
      const eventTime = new Date(event.currentTime);
      const timeDiff = currentTime - eventTime;
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      return hoursDiff <= 24;
    });

    // Update the series and labels based on the filtered events
    const severityCounts = {};
    filteredEvents.forEach(event => {
      if (severityCounts[event.severity]) {
        severityCounts[event.severity]++;
      } else {
        severityCounts[event.severity] = 1;
      }
    });
    const filteredSeries = Object.values(severityCounts);
    const filteredLabels = Object.keys(severityCounts).map(severity => `severity (${severity})`);

    setSeries(filteredSeries);
    setOptions(prevOptions => ({
      ...prevOptions,
      labels: filteredLabels,
    }));
  }, [allEvents]);



  return (
    <div id="chart" style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
      <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div>
  );
};

export default PieChart;