import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { BIO_PRODUCTS } from '../_graphql/products'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'

export const fetchBioProducts = async () => {
  let token: RequestCookie | undefined

  try {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  } catch (error) {
    console.error('Failed to retrieve cookies', error)
  }

  const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: BIO_PRODUCTS,
    }),
  })

  const jsonResponse = await response.json()

  if (jsonResponse.errors) {
    throw new Error(jsonResponse.errors[0].message)
  }

  return jsonResponse.data.Products.docs
}
