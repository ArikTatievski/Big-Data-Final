const { EventHubConsumerClient } = require("@azure/event-hubs");
const elasticsearch = require('elasticsearch')

// Azure configuration
const connectionString = "Endpoint=sb://nasasimulator.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=dODcMf8IkZFDIUFLc++sQWeM7eGO7KwGQ+AEhN8ioAk=";
const eventHubName = "simulator";
const consumerClient = new EventHubConsumerClient("$Default", connectionString, eventHubName);

// Bonsai Elasticsearch configuration

const bonsaiUrl = 'https://i9JQv5Wpza:28zdBs5YPXcxeqwnUQ@siuu-search-4384917204.eu-central-1.bonsaisearch.net:443';

const client = new elasticsearch.Client({
    host: bonsaiUrl,
});
const messageHandler = async (eventData) => {
    // Log the received message
    console.log(`Received message: ${eventData.body}`);

    // Send the message to Bonsai Elasticsearch
    try {
        const message = {
            message: eventData.body,
            timestamp: eventData.enqueuedTimeUtc
        };
        await client.index({
            index: 'acme-production',
            type: "Informational",
            body: message
        });
        console.log(`Message sent to Bonsai Elasticsearch: ${JSON.stringify(message)}`);
    } catch (err) {
        console.error(`Error sending message to Bonsai Elasticsearch: ${err}`);
    }
};

const errorHandler = async (error) => {
    // Handle errors
    console.log(`Error occurred: ${error}`);
};

async function startConsumer() {
    const partitionIds = await consumerClient.getPartitionIds();

    for (const partitionId of partitionIds) {
        const subscription = consumerClient.subscribe(partitionId, {
            processEvents: async (events, context) => {
                for (const event of events) {
                    await messageHandler(event);
                }
            },
            processError: errorHandler
        });

        console.log(`Consumer started for partition ${partitionId}.`);
    }
}

startConsumer().catch((err) => {
    console.log("Error starting the consumer: ", err);
});