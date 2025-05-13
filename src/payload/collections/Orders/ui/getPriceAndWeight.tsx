import React, { useState, useEffect, useMemo } from 'react';
import { useAllFormFields, getSiblingData, useField, useFormFields } from 'payload/components/forms';
import { useDocumentInfo } from 'payload/components/utilities';
import { toast } from 'react-toastify';
import { Truck, Printer, DollarSign, Weight, Plus, Trash, Box, Container, UserPlus, Package } from 'lucide-react';
import { Button } from 'payload/components';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../app/_components/ui/table";

export const getPriceAndWeight: React.FC = () => {
  const [fields] = useAllFormFields();
  const siblingData = useMemo(() => getSiblingData(fields, 'items'), [fields]);
  const [totals, setTotals] = useState<{ price: number; weight: number }>({ price: 0, weight: 0 });
  const [shipmentCost, setShipmentCost] = useState<number>(0); // State for the shipment cost
  const [parcelDescription, setParcelDescription] = useState('Вино');
  const { id } = useDocumentInfo();
  const [status, setStatus]: [string, (value: string) => void] = useFormFields(([fields, dispatch]) => [
    fields.status.value as string,
    (value: string) => dispatch({ type: 'UPDATE', path: 'status', value: value }),
  ]);
  const [shipmentNumber, setShipmentNumber]: [string, (value: string) => void] = useFormFields(([fields, dispatch]) => [
    fields.shipmentNumber.value as string,
    (value: string) => dispatch({ type: 'UPDATE', path: 'shipmentNumber', value: value }),
  ]);
  const [trackingData, setTrackingData] = useState<any[]>([]);

  // Helper function to calculate the shipment cost
  const cache: Record<string, number> = {};
  async function getCalculatedPrice(quantity: number, totalWeight: string | number, officeId?: string, cityID?: string) {
    if (!officeId && !cityID) {
      throw new Error('Either officeId or cityID must be provided.');
    }

    const cacheKey = `${quantity}-${officeId || cityID}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const newUrl = officeId
      ? `https://n8n.ssgs.cloud/webhook/e28787e6-bb6f-4eca-8a8b-9981a53d1379?quantity=1&total_weight=${totalWeight}&recipient_pickup_office_id=${officeId}`
      : `https://n8n.ssgs.cloud/webhook/16edeff4-0224-4d31-b2f2-2560983d0629?quantity=1&total_weight=${totalWeight}&recipient_address_site_id=${cityID}`;

    try {
      const res = await fetch(newUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error(`Fetch error with status: ${res.status}`);
        return null;
      }

      const data = await res.json();

      if (data.calculations?.length > 0) {
        const total = data.calculations[0].price.total;
        cache[cacheKey] = total;
        return total;
      } else {
        throw new Error('No calculations found in the response.');
      }
    } catch (error) {
      console.error('Error calculating price:', error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchPricesAndWeights = async () => {
      if (siblingData?.items?.length > 0) {
        let totalPrice = 0;
        let totalWeight = 0;

        for (const row of siblingData.items) {
          try {
            const response = await fetch(`/api/products/${row.product}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
              const product = await response.json();
              const price = product?.price || 0;
              const weight = product?.weight || 0;

              totalPrice += price * (row?.quantity || 1);
              totalWeight += weight * (row?.quantity || 1);
            } else {
              console.error(`Failed to fetch product with ID ${row.product}:`, response.statusText);
            }
          } catch (error) {
            console.error(`Error fetching product with ID ${row.product}:`, error);
          }
        }

        setTotals({ price: totalPrice, weight: totalWeight });

        const deliveryMethod = siblingData.deliveryMethod;
        const cityID = siblingData.placeOfResident;
        const officeId = siblingData.ekontOffice;

        try {
          let calculatedPrice = 0.00;
          if (deliveryMethod == "econtOffice" && officeId.length > 0) {
            calculatedPrice = await getCalculatedPrice(siblingData.items.length, totalWeight.toFixed(2), officeId, undefined) 
          } else if(deliveryMethod == "econtAddress" && cityID.length > 0) {
            calculatedPrice = await getCalculatedPrice(siblingData.items.length, totalWeight.toFixed(2), undefined, cityID) 
          } else {
            calculatedPrice = 0.00;
          }

          setShipmentCost(calculatedPrice);
        } catch (error) {
          console.error('Error calculating shipment cost:', error);
        }
      }
    };

    fetchPricesAndWeights();
  }, [siblingData]);

  const formattedPrice = totals.price.toFixed(2);
  const formattedWeight = totals.weight.toFixed(2);
  const formattedShipmentCost = shipmentCost.toFixed(2); // Format shipment cost

  const handleParcelDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParcelDescription(e.target.value);
  };

  const handleCreateShipment = async () => {
    const { name, phone, email, deliveryMethod, ekontOffice, placeOfResident, addressStreet } = siblingData;
    const apiUrl =
      deliveryMethod === 'econtOffice'
        ? `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?deliverTo=office&amount=${formattedPrice}&totalWeight=${formattedWeight}&contents=${parcelDescription}&phone1=0${phone}&clientName=${name}&email=${email}&pickupOfficeId=${ekontOffice}&ref1=${id}`
        : `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?deliverTo=address&amount=${formattedPrice}&totalWeight=${formattedWeight}&contents=${parcelDescription}&phone1=0${phone}&clientName=${name}&email=${email}&siteId=${placeOfResident}&addressNote=${addressStreet}&ref1=${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        const shipmentID = result?.id;

        setShipmentNumber(shipmentID);
        setStatus('processing');

        toast.success('Shipment created successfully and order updated');
      } else {
        toast.error('Failed to create shipment');
      }
    } catch (error) {
      toast.error(`Error creating shipment: ${error.message}`);
    }
  };

  const handlePrintShipment = async () => {
    const apiUrl = `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?action=print&id=${shipmentNumber}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `shipment-${shipmentNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        toast.success('Shipment generated successfully and file downloaded.');
      } else {
        toast.error('Failed to generate shipment.');
      }
    } catch (error) {
      toast.error(`Error generating shipment: ${error.message}`);
    }
  };

  const handleCancelShipment = async () => {
    const apiUrl = `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?action=cancel&id=${shipmentNumber}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setShipmentNumber('');
        setStatus('new');

        toast.success('Shipment cancelled successfully and order updated');
      } else {
        toast.error('Failed to cancel shipment');
      }
    } catch (error) {
      toast.error(`Error cancelling shipment: ${error.message}`);
    }
  };

  const fetchTrackingData = async () => {
    if (shipmentNumber) {
      const trackingUrl = `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?action=track&id=${shipmentNumber}`;
      try {
        const response = await fetch(trackingUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();

          const operations = data.parcels?.flatMap((parcel) =>
            parcel.operations.map((operation) => ({
              date: operation.dateTime,
              operation: operation.description,
              place: operation.comment,
            }))
          );
          setTrackingData(operations || []);
        } else {
          toast.error('Failed to fetch tracking data.');
        }
      } catch (error) {
        toast.error(`Error fetching tracking data: ${error.message}`);
      }
    }
  };

  const fetchCourierRequest = async () => {
    const apiUrl = `https://n8n.ssgs.cloud/webhook/0af915e7-d397-46ff-a1c9-f59bdbfab534?action=handover&id=${shipmentNumber}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setShipmentNumber('');
        setStatus('sent');

        toast.success('Successfully requested courier and order updated');
      } else {
        toast.error('Failed to request courier');
      }
    } catch (error) {
      toast.error(`Error requesting courier: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTrackingData();
    const interval = setInterval(() => {
      fetchTrackingData();
    }, 30000);

    return () => clearInterval(interval);
  }, [shipmentNumber]);

  return (
    <div className="p-4 border-r overflow-y-auto border-gray-700 text-white">
      {siblingData.status === 'new' && (
        <>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Truck className="mr-2" />
            Create Shipment
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <input id="price" className="pl-10 w-full pt-8 pb-2" type="text" value={formattedPrice} readOnly />
              <label htmlFor="price" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Price
              </label>
              <div className="absolute left-3 top-6 transform -translate-y-1/4">
                <DollarSign size={18} />
              </div>
            </div>

            <div className="relative">
              <input id="shipping-cost" className="pl-12 w-full pt-8 pb-2" value={formattedShipmentCost} readOnly />
              <label htmlFor="shipping-cost" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Shipping Cost
                {parseFloat(formattedPrice) > 150 && !isNaN(parseFloat(formattedPrice)) ? (
                  <span className="rounded-md bg-green-500 text-white px-2 py-1 ml-2">
                    Free Shipping
                  </span>
                ) : ''}
              </label>
              <div className="absolute left-3 top-6 transform -translate-y-1/4">
                <Package size={18} />
                <DollarSign size={12} className="absolute -bottom-1 -right-1 bg-white rounded-full text-gray-500" />
              </div>
            </div>

            <div className="relative">
              <input 
              id="total-price" 
              className="pl-12 w-full pt-10 pb-4" 
              type="text" 
              value={((!isNaN(parseFloat(formattedPrice)) ? parseFloat(formattedPrice) : 0) + 
              (!isNaN(parseFloat(formattedShipmentCost)) ? parseFloat(formattedShipmentCost) : 0)).toFixed(2)}
              readOnly />
              <label htmlFor="total-price" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Total Price
              </label>
              <div className="absolute left-3 top-8 transform -translate-y-1/4">
                <DollarSign size={18} />
                <Plus size={12} className="absolute -top-1 -right-1" />
                <Package size={12} className="absolute -bottom-1 -right-1" />
              </div>
            </div>

            <div className="relative">
              <input id="totalWeight" className="pl-10 w-full pt-8 pb-2" type="text" value={formattedWeight} readOnly />
              <label htmlFor="totalWeight" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Total Weight
              </label>
              <div className="absolute left-3 top-6 transform -translate-y-1/4">
                <Weight size={18} />
              </div>
            </div>

            <div className="relative">
              <input id="parcelDescription" className="pl-10 w-full pt-8 pb-2" type="text" value={parcelDescription} onChange={handleParcelDescriptionChange} />
              <label htmlFor="parcelDescription" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Parcel Description
              </label>
              <div className="absolute left-3 top-6 transform -translate-y-1/4">
                <Box size={18} />
              </div>
            </div>

            <Button
              className="w-full flex items-center justify-center"
              buttonStyle="primary"
              iconPosition="left"
              iconStyle="with-border"
              size="small"
              onClick={handleCreateShipment}
            >
              <Plus className="w-6 h-6 mr-2 mt-1" />
              Create Shipment Request
            </Button>
          </div>
        </>
      )}

      {siblingData.status === 'processing' && (
        <>
          <div className="mt-6 space-y-2">
            <div className="relative">
              <input id="shipmentNumber" className="pl-10 w-full pt-8 pb-2" type="text" value={shipmentNumber} readOnly />
              <label htmlFor="shipmentNumber" className="absolute top-2 left-2 px-1 text-xs font-medium text-white transform -translate-y-1/2">
                Shipment Number
              </label>
              <div className="absolute left-3 top-6 transform -translate-y-1/4">
                <Container size={18} />
              </div>
            </div>

            <Button className="w-full flex items-center justify-center" buttonStyle="primary" iconPosition="left" onClick={handlePrintShipment}>
              <Printer className="w-6 h-6 mr-2 mt-1" />
              Print Request
            </Button>
            <Button className="w-full flex items-center justify-center" buttonStyle="primary" iconPosition="left" onClick={fetchCourierRequest}>
              <UserPlus className="w-6 h-6 mr-2 mt-1" />
              Courier Request
            </Button>
            <Button className="w-full flex items-center justify-center" buttonStyle="secondary" iconPosition="left" onClick={handleCancelShipment}>
              <Trash className="w-6 h-6 mr-2 mt-1" />
              Cancel Request
            </Button>
          </div>
        </>
      )}

      {(siblingData.status === 'sent' || siblingData.status === 'finished') && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Operation</TableHead>
                <TableHead>Place</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trackingData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                  <TableCell>{entry.operation}</TableCell>
                  <TableCell>{entry.place}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
