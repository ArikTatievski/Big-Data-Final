import axios from 'axios';

export const fetchNasaAPI = async () => {
  try {
    const response = await axios.get('http://localhost:3331/');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}   