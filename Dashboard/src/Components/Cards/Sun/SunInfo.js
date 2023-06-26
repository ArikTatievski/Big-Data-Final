import axios from 'axios';

export const fetchWebScrap = async () => {
  try {
    const response = await axios.get('http://localhost:3332/');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

} 