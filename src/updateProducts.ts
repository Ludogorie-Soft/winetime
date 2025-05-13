import { fetchEyanakData } from './fetchYanak'
import fetch from 'node-fetch'
import { Product } from './payload/payload-types'
import { fetchYanakProducts } from './app/_api/fetchYanakProducts'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const loginUserAndGetToken = async (email, password) => {
  const GRAPHQL_API_URL = process.env.NEXT_BUILD
    ? `http://127.0.0.1:${process.env.PORT || 3000}`
    : process.env.NEXT_PUBLIC_SERVER_URL

  const response = await fetch(`${GRAPHQL_API_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (response.ok) {
    const data = await response.json()
    return data.token
  } else {
    throw new Error('Failed to log in')
  }
}

export const updateProducts = async () => {
  const GRAPHQL_API_URL = process.env.NEXT_BUILD
    ? `http://127.0.0.1:${process.env.PORT || 3000}`
    : process.env.NEXT_PUBLIC_SERVER_URL

  const userEmail = process.env.UPDATE_EMAIL
  const userPassword = process.env.UPDATE_PASSWORD

  console.log('Starting product update process...')
  console.log(`Using API URL: ${GRAPHQL_API_URL}`)
  console.log(`Update user: ${userEmail}`)

  try {
    const token = await loginUserAndGetToken(userEmail, userPassword)
    const yanakStocks = await fetchEyanakData()
    console.log('Fetched Eyanak data:', yanakStocks)

    const products = await fetchYanakProducts()
    console.log('Fetched products from database:', products)

    const productsMap = new Map<number, Product>()
    products.forEach((product: Product) => {
      productsMap.set(product.barcode, product)
    })

    console.log('Product map created with size:', productsMap.size)

    const batchSize = 50
    const delayTime = 900000

    for (let i = 0; i < yanakStocks.length; i += batchSize) {
      const batch = yanakStocks.slice(i, i + batchSize)

      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}`)

      for (const stock of batch) {
        const { barcode, quantity, price } = stock
        const barcodeInt = parseInt(barcode, 10)

        if (!barcode || quantity === undefined || isNaN(barcodeInt)) {
          console.warn(`Invalid stock data: ${JSON.stringify(stock)}`)
          continue
        }

        const product = productsMap.get(barcodeInt)
        if (product) {
          const updatedQuantity = quantity < 0 ? 0 : Math.floor(quantity)
          console.log(`Updating product with barcode ${barcodeInt}`)
          console.log(`Old Quantity: ${product.quantity}, New Quantity: ${updatedQuantity}`)

          const updatedPrice = price < 0 ? 0 : price;
          console.log(`Updating product with barcode ${barcodeInt}`)
          console.log(`Old Price: ${product.price}, New Price: ${updatedPrice}`)

          const response = await fetch(`${GRAPHQL_API_URL}/api/products/${product.id}`, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({ quantity: updatedQuantity, price: updatedPrice }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${token}`,
            },
          })

          if (response.ok) {
            const json = await response.json()
            console.log(`Successfully updated product with ID ${product.id}`)
          } else {
            const error = await response.json()
            console.error(`Failed to update product with ID ${product.id}:`, error)
            if (response.status === 403) {
              console.error('Authorization issue. Please check user permissions.')
              continue
            }
          }
        } else {
          console.warn(`No matching product found for barcode ${barcodeInt}`)
        }
      }

      console.log(`Waiting for ${delayTime / 60000} minutes before processing the next batch...`)
      await delay(delayTime)
    }

    console.log('Products updated successfully')
  } catch (error) {
    console.error('Failed to update products:', error)
  }
}
