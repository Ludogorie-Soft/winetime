const officeCache: Record<string, any[]> = {}

async function getOffices(cityID: string) {
  if (officeCache[cityID]) {
    return officeCache[cityID]
  }

  if (!cityID) {
    throw new Error('Invalid city ID')
  }

  try {
    const res = await fetch(
      `https://n8n.ssgs.cloud/webhook/2c45f852-691a-4a93-b17d-f59203c3531e?siteId=${cityID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch offices, status code: ${res.status}`)
    }

    const data = await res.json()

    const filteredData = data.offices.map((office: any) => ({
      officeId: office.id,
      name: office.name,
      address: office.address.fullAddressString,
    }))

    officeCache[cityID] = filteredData

    return filteredData
  } catch (error) {
    console.error('Error fetching offices:', error)
    throw error
  }
}

export default getOffices
