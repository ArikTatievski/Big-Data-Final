const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // Import the 'cors' module

const app = express();
app.use(cors());

const url = 'https://theskylive.com/sun-info'; // Replace with the URL you want to scrape

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Scrape the data from the website
        const mainParagraph = $('.object_headline_text').text().trim();
        // Scrape the rise details
        const riseAzimuth = $('div.rise azimuth').text().trim();
        const riseTime = $('div.rise time').text().trim();

        // Scrape the transit details
        const transitAltitude = $('div.transit altitude').text().trim();
        const transitTime = $('div.transit time').text().trim();

        // Scrape the set details
        const setAzimuth = $('div.set azimuth').text().trim();
        const setTime = $('div.set time').text().trim();

        // Scrape the sunspot_activity
        const sunspotActivityImage = $('img[src^="/objects/sun/sunspots/sunspots.jpg"]').attr('src');

        // Scrape the distance_from_earth
        const distanceKilometers = $('div.keyinfobox:has(label:contains("Distance Kilometers")) ar').text().trim();
        const distanceAU = $('div.keyinfobox:has(label:contains("Distance AU")) ar').text().trim();
        const lightTravelTime = $('div.keyinfobox:has(label:contains("Light Travel Time")) ar').text().trim();

        // Scrape the look_back_ephemeris
        const lookBackEphemeris = [];
        $('table.objectdata tr.data').each((index, element) => {
            if (index >= 6) {
                const date = $(element).find('td:first-child a').text().trim();
                const rightAscension = $(element).find('td:nth-child(2)').text().trim();
                const declination = $(element).find('td:nth-child(3)').text().trim();
                const magnitude = $(element).find('td:nth-child(4)').text().trim();
                const apparentDiameter = $(element).find('td:nth-child(5)').text().trim();
                const constellation = $(element).find('td:nth-child(6)').text().trim();
                lookBackEphemeris.push({ date, rightAscension, declination, magnitude, apparentDiameter, constellation });
            };
        });

        // Create the JSON message
        const jsonMessage = JSON.stringify({
            main_paragraph: mainParagraph,
            rise: { azimuth: riseAzimuth, time: riseTime },
            transit: { altitude: transitAltitude, time: transitTime },
            set: { azimuth: setAzimuth, time: setTime },
            sunspot_activity: "https://theskylive.com/" + sunspotActivityImage,
            distance_from_earth: { distance_kilometers: distanceKilometers, distance_au: distanceAU, light_travel_time: lightTravelTime },
            look_back_ephemeris: lookBackEphemeris
        });

        res.setHeader('Content-Type', 'application/json');
        console.log(jsonMessage)
        res.send(jsonMessage);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3332, () => {
    console.log('Server is running on port 3332');
});
