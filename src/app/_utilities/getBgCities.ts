const cache = new Map();

async function getAllCities(text) {
  if (cache.has(text)) return cache.get(text);

  const url = `https://n8n.ssgs.cloud/webhook/cc64c3f3-a830-489e-a94a-b27800ca3fd5?name=${text}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { sites } = await res.json();

    const fullData = sites.map((city) => ({
      name: `${city.name} (${city.region})`,
      cityId: city.id,
      regionName: city.region,
    })).sort((a, b) => a.name.localeCompare(b.name));

    cache.set(text, fullData);

    return fullData;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

export default getAllCities;
