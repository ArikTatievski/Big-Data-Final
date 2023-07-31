const { EventHubProducerClient } = require("@azure/event-hubs");
const { v4: uuid } = require("uuid");
const Redis = require('ioredis');

const redisUrl = 'redis://default:7ac367c7038841a0b627bb6ff84d158d@eu1-clean-ram-39644.upstash.io:39644';
const client = new Redis(redisUrl);

const connectionString = "Endpoint=sb://nasasimulator.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=dODcMf8IkZFDIUFLc++sQWeM7eGO7KwGQ+AEhN8ioAk=";
const eventHubName = "simulator";
const producer = new EventHubProducerClient(connectionString, eventHubName);

async function fetchRedisData(limit) {
    try {
        const allKeys = [];
        let cursor = '0';

        do {
            const result = await client.scan(cursor, 'MATCH', '*', 'COUNT', limit);
            cursor = result[0];
            allKeys.push(...result[1]);
        } while (cursor !== '0');

        const data = [];

        for (let i = 0; i < allKeys.length; i += limit) {
            const keysBatch = allKeys.slice(i, i + limit);
            const valuesBatch = await client.mget(keysBatch);
            data.push(...valuesBatch);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data from Redis:', error);
        throw error;
    }
}

async function retrieveRedisData() {
    try {
        const limit = 100; // Specify the desired limit for the number of keys to fetch
        const redisData = await fetchRedisData(limit);
        function generateMessage(redisData) {
            const currentTime = new Date().toISOString();
            const reporters = ["MMT", "Gemini Observatory Telescopes", "Very Large Telescope", "Subaru Telescope", "Large Binocular Telescope", "Southern African Large Telescope", "Keck 1 and 2", "Hobby-Eberly Telescope", "Gran Telescopio Canarias", "Thirty Meter Telescope", "European Extremely Large Telescope"];
            const reporterIndex = Math.floor(Math.random() * reporters.length);
            const reporter = reporters[reporterIndex];
            const eventTypes = ["GRB", "Apparent Brightness Rise", "UV Rise", "X-Ray Rise", "Comet"];
            const eventTypeIndex = Math.floor(Math.random() * eventTypes.length);
            const eventType = eventTypes[eventTypeIndex];
            const sampleIndex = Math.floor(Math.random() * redisData.length);
            const sample = JSON.parse(redisData[sampleIndex]);
            const locationRA = sample.RA;
            const locationDEC = sample.DEC;
            const DisplayName = sample["Title HD"];
            const severity = Math.floor(Math.random() * 5) + 1;
            const messageId = uuid();

            return {
                messageId,
                body: JSON.stringify({
                    currentTime,
                    reporter,
                    locationRA,
                    locationDEC,
                    DisplayName,
                    eventType,
                    severity,
                }),
            };
        }

        function sendMessage(redisData) {
            const message = generateMessage(redisData);
            console.log(`Sending message: ${message.body}`);
            producer.sendBatch([{ body: message.body, messageId: message.messageId }])
                .then(() => console.log("Message sent"))
                .catch((error) => console.error("Error sending message:", error));
        }

        // Call sendMessage every 12 seconds
        setInterval(() => sendMessage(redisData), 12000);
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
    }
}

retrieveRedisData();