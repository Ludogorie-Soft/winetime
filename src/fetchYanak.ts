import fetch from 'node-fetch'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function safeJson(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Invalid JSON from ${res.url} – body:\n${text}`)
  }
}

async function fetchWithLogging(body, auth) {
  const url = 'https://api.eyanak.com:5555/e-shop/api/getstockslite'
  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify(body)
    })
  } catch (networkErr) {
    throw new Error(`Network error fetching ${url}: ${networkErr.message}`)
  }

  const text = await res.text()
  if (!res.ok) {
    
    console.error(`Eyanak API ${res.status} response:\n`, text)
  
    throw new Error(`Stocks fetch failed: ${res.status}`)
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Invalid JSON from ${url}: ${text}`)
  }
}

export async function fetchEyanakData() {
  const loginRes = await fetch('https://api.eyanak.com:5555/e-shop/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: process.env.YANAK_EMAIL, username: process.env.YANAK_USERNAME })
  })
  if (!loginRes.ok) {
    const errText = await loginRes.text()
    throw new Error(`Login failed (${loginRes.status}): ${errText}`)
  }
  const { token } = await safeJson(loginRes)
  const auth = `Bearer ${token}`

  const warehouses = [ { warehouse_id: 2 }, { warehouse_id: 5 } ]
  const allStocks = []
  for (const body of warehouses) {
    try {
      const data = await fetchWithLogging(body, auth)
      const arr = Array.isArray(data) ? data : Object.values(data).flat()
      allStocks.push(...arr)
    } catch (err) {
      console.warn(`Skipping warehouse ${body.warehouse_id}:`, err.message)
    }
  }

  return allStocks.reduce((acc, { code, quantity, price }) => {
    const existing = acc.find(x => x.barcode === code)
    if (existing) existing.quantity += quantity
    else acc.push({ barcode: code, quantity, price })
    return acc
  }, [])
}
