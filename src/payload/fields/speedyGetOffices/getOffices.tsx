import React from 'react';
import { SelectInput, useField, useFormFields, useWatchForm } from 'payload/components/forms';

export const getOffices: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { getDataByPath } = useWatchForm();
  const cityId = getDataByPath('placeOfResident') as string;

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`https://n8n.ssgs.cloud/webhook/2c45f852-691a-4a93-b17d-f59203c3531e?siteId=${cityId}`);
        const data = await response.json();

        const officeOptions = data.offices.map((office) => ({
          label: `${office.name} (${office.address.fullAddressString})`,
          value: `${office.id}`,
        }));

        setOptions(officeOptions.sort((a, b) => a.label.localeCompare(b.label)));

        if (value) {
          const officeExists = officeOptions.find((option) => option.label === value);
          officeExists ? setValue(officeExists.value) : setValue(value);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [cityId, setValue]);

  return (
    <div>
      <label className='field-label'>Speedy Office</label>
      {loading ? (
        <>
          <div style={{ display: 'flex', padding: '10px' }}>
            <img src="/speedy_truck.svg" alt="Loading" width={40} height={40}  className="w-10 h-10 mr-2"/>
            <p>Loading cities...</p>
          </div>
        </>
      ) : (
        <SelectInput
          path={path}
          name={path}
          options={options}
          value={value}
          onChange={(e) => setValue(e.value)}
        />
      )}
    </div>
  );
};
