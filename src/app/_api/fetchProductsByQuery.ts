import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { PRODUCTS_BY_QUERY } from '../_graphql/products'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'
import { Product } from '../../payload/payload-types';

export const fetchProductsByQuery = async (
  searchQuery: string,
  draft?: boolean,
): Promise<Product[]> => {
  let token: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: PRODUCTS_BY_QUERY,
      variables: { searchQuery },
    }),
  });

  const jsonResponse = await response.json();

  if (jsonResponse.errors) {
    throw new Error(jsonResponse?.errors?.[0]?.message ?? 'Error fetching products by query');
  }

  return jsonResponse?.data?.Products?.docs;
};
