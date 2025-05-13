import * as React from 'react'
import { SelectInput, useField } from 'payload/components/forms'

export const getCities: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://n8n.ssgs.cloud/webhook/3a98215a-d8bc-425d-825f-03f51eade637');
        const data = await response.json();

        const countryOptions = data.map((city) => ({
          label: `${city.name} (${city.region})`,
          value: city.id.toString(),
        }));

        setOptions(countryOptions.sort((a, b) => a.label.localeCompare(b.label)));
        
        if (value) {
          const cityExists = countryOptions.find((option) => option.label === value);
          cityExists ? setValue(cityExists.value) : setValue(value)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [value, setValue]);

  return (
    <div>
      <label className="field-label">Speedy Cities</label>
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
