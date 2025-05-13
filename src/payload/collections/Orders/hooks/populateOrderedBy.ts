import type { FieldHook } from 'payload/types'

import type { Order } from '../../../payload-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  const guestUserId = '656dca9a118faadbec77a9ea';

  if (operation === 'create' || operation === 'update') {
    if (!value && req.user) {
      return req.user.id;
    } else if (!value) {
      return guestUserId;
    }
  }

  return value;
}

