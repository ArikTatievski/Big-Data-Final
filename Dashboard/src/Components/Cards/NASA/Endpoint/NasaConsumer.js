const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const apiKey = 'lHyigsRmojS06hXoncKBeEKroSrnJnsj2gvfLFrB';

app.get('/', async (req, res) => {
    try {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];
        const endDate = currentDate.toISOString().split('T')[0];

        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
            params: {
                start_date: startDate,
                end_date: endDate,
                api_key: apiKey,
            },
        });

        const asteroidData = response.data.near_earth_objects;
        Object.values(asteroidData).forEach((asteroidList) => {
            asteroidList.forEach((asteroid) => {
                // Process each asteroid here
            });
        });

        res.setHeader('Content-Type', 'application/json');
        res.json(asteroidData);
    } catch (error) {
        console.error('Error fetching asteroid data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3331, () => {
    console.log('Server is running on port 3331');
});
