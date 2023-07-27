# פרוייקט גמר מסדי ענק

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Installation](#installation)
- [Contributing](#contributing)

## Overview

This project is a React App using microservices,databases,APIs and more that are representing an entire enviroment.
The app is showing 3 main cards:

- Latest Events (Are being generated randomly every 12 seconds based on real stars and locations)
- NASA Information taken by NASA API
- Sun Information taken by Web Scrapping from https://theskylive.com/sun-info

## Architecture

Our React App is consuming data from 3 different 'sources'

1. NASA API - using a side server running on port 3331 waiting for a request from the app

2. Web Scrapping - using a side server running on port 3332 waiting for a request from the app

3. Latest Messeges - generated from a side server simulator that consumes real stars data from Redis DB, stores it in Azure Event Hub (kafka service), another side server takes the data from the Event Hub and stores it in an Elastic Search DB and finally the App pulls the data from the Elastic Search DB

### Main Components

- **Simulator.js**: A JavaScript module that connects to Redis and consumes data from a bright star catalog. It generates messages and sends them to Azure Event Hub.
- **esClient.js**: A JavaScript module that pulls messages from Azure Event Hub and stores them in an Elasticsearch database (Bonsai.io).
- **React App**: A frontend application that displays three cards:
  - **Latest Events**: Retrieves data from the Elasticsearch database using esClient.js and displays the latest events.
  - **NASA Information**: A server-side component that fetches data from the NASA API and processes it to display relevant information.
  - **Sun Information**: A server-side component that scrapes data from a website to provide information about the sun.

### Technologies Used

- Redis (upstash.com)
- Azure Event Hub (kafka)
- Elasticsearch (Bonsai.io)
- React
- Express
- Axios (HTML Requets)
- Cheerio (Web Scrapping)

## Installation

For every folder you can see a file called 'package.json' run 'npm i --force'.

Run the WebScrapping client 'node SunConsumer.js'

Run the NASA client 'node NasaConsumer.js'

Run the React App by running 'npm start'

To start generating data from the simulator run the following:

To start the Elastic Search connector - 'node esClient.js'

To start the Simulator - 'node Simulator.js'

## Contributing

Arik Tatievski

Roi Meshulam

Sabrina Khazanov