export default async function fetchData(trip_id) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/trip_detail?trip_id=${trip_id}`, {
      method: 'GET'
    })
     return await response.json()
  } catch {
    console.error("Something went wrong...");
  }
};