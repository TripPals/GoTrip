import axios from 'axios';

export default async function fetchData(trip_id) {
  try {
    const response = await axios.get('/api/v1/trip_detail', {
      headers: { 'Content-Type': 'application/json' },
      params: { trip_id: trip_id },
    });
    return await response.data;
  } catch {
    console.error("Something went wrong...");
    location.href="/404";
  }
};