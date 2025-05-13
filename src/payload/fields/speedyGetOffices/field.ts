import { Field } from 'payload/types';
import { getOffices } from './getOffices';

export const speedyGetOffices: Field = {
  name: 'ekontOffice',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: getOffices,
    },
    condition: (_, siblingData) => siblingData.deliveryMethod === 'econtOffice', 
  }
}