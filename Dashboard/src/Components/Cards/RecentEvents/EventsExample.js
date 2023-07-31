export const fetchEvents = async () => {
  const bonsaiUrl = 'https://siuu-search-4384917204.eu-central-1.bonsaisearch.net/acme-production/_search';
  try {
    const response = await fetch(`${bonsaiUrl}?size=10000`, {
      headers: {
        Authorization: 'Basic ' + btoa('i9JQv5Wpza:28zdBs5YPXcxeqwnUQ')
      }
    });
    const jsonData = await response.json();
    const parsedData = jsonData.hits.hits.map((hit) => JSON.parse(hit._source.message));
    console.log("check")
    return parsedData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}   