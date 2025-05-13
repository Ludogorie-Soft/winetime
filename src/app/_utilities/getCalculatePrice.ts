const cache: Record<string, number> = {}

async function getCalculatedPrice(quantity: number, totalWeight: string | number, officeId?: string, cityID?: string) {
  
  if (!officeId && !cityID) {
    throw new Error('Either officeId or cityID must be provided.')
  }

  const cacheKey = `${quantity}-${officeId || cityID}`
  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  const newUrl = officeId
    ? `https://n8n.ssgs.cloud/webhook/e28787e6-bb6f-4eca-8a8b-9981a53d1379?quantity=1&total_weight=${totalWeight}&recipient_pickup_office_id=${officeId}`
    : `https://n8n.ssgs.cloud/webhook/16edeff4-0224-4d31-b2f2-2560983d0629?quantity=1&total_weight=${totalWeight}&recipient_address_site_id=${cityID}`

  try {
    const res = await fetch(newUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`Fetch error with status: ${res.status}`)
      return null
    }

    const data = await res.json()

    if (data.calculations?.length > 0) {
      const total = data.calculations[0].price.total

      cache[cacheKey] = total

      return total
    } else {
      throw new Error('No calculations found in the response.')
    }
  } catch (error) {
    console.error('Error calculating price:', error)
    throw error
  }
}

export default getCalculatedPrice
