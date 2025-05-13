import { GRAPHQL_API_URL } from './shared'
import { RANDOM_PRODUCTS, DISCOUNT_RANDOM_PRODUCTS } from '../_graphql/products'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { payloadToken } from './token'

export const fetchRandomProducts = async (categoryId) => {
  let token;

  try {
    const { cookies } = await import('next/headers');
    token = cookies().get(payloadToken);
  } catch (error) {
    console.error('Failed to retrieve cookies', error);
  }

  // Prepare the query and variables
  const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: RANDOM_PRODUCTS,
      variables: {
        categoryId,
      },
    }),
  });

  const jsonResponse = await response.json();

  if (jsonResponse.errors) {
    throw new Error(jsonResponse.errors[0].message);
  }

  // Shuffle the fetched products and select the first 4 random ones
  const shuffledProducts = jsonResponse.data.Products.docs.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, 4);
};


export const fetchRandomDiscountProducts = async () => {
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
      query: DISCOUNT_RANDOM_PRODUCTS,
    }),
  })

  const jsonResponse = await response.json()

  if (jsonResponse.errors) {
    throw new Error(jsonResponse.errors[0].message)
  }

  return jsonResponse.data.Products.docs
}
