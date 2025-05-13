import { Field } from 'payload/types';
import { getCities } from './getCities';

export const speedyGetCities: Field = {
  name: 'placeOfResident',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: getCities,
    },
    condition: (_, siblingData) => siblingData.deliveryMethod === 'econtOffice' || siblingData.deliveryMethod === 'econtAddress',
  },
};
