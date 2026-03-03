
const url = 'https://api.qase.io/v1/attachment?limit=10&offset=0';

function QASEHeader(){  
  const token = process.env.QASE_API_TOKEN; // Ensure you have your QASE API token set in environment variables
  const header = {
    'Content-Type': 'application/json',
    'Token': token || ''
  };
  return header
}

export async function fetchQASEData() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: QASEHeader()
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Example usage
// (async () => {
//   const data = await fetchQASEData();
//   console.log(data);
// })();