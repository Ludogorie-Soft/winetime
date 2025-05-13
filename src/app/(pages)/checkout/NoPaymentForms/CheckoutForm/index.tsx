'use client'

import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '../../../../../payload/payload-types'
import { Button } from '../../../../_components/Buttons/Button'
import { useCart } from '../../../../_providers/Cart'
import { RadioGroup, RadioGroupItem } from '../../../../_components/ui/radio-group'
import { Label } from '../../../../_components/ui/label'
import { Input } from '../../../../_components/ui-components/Input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAuth } from '../../../../_providers/Auth'
import getOffices from '../../../../_utilities/getOffices'
import getAllCities from '../../../../_utilities/getBgCities'
import Image from 'next/image'

import classes from './index.module.scss'
import { SearchableDropdown } from '../../../../_components/ui-components/Dropdown'
import { OfficeDropdown } from '../../../../_components/ui-components/OfficeDropdown'
import getCalculatedPrice from '../../../../_utilities/getCalculatePrice'

interface ProductDetail {
  id: string | number
}

type ConfirmationEmailData = {
  name: string
  email: string
  total: number
  orderId: string
  products: ProductDetail[]
}

type FormData = {
  name: string
  phone: string
  placeOfResident: string
  ekontOffice: string
  addressNeighborhood: string
  addressStreet: string
}

export const CheckoutForm: React.FC<{
  setIsFetchingOffices: (value: boolean) => void
  setIsCalculating: (value: boolean) => void
  isFetchingOffices: boolean
  isCalculating: boolean
}> = ({ setIsFetchingOffices, setIsCalculating, isFetchingOffices, isCalculating }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('econtOffice')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedOffice, setSelectedOffice] = useState('')
  const [offices, setOffices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isFetchingCities, setIsFetchingCities] = useState(false)

  const router = useRouter()
  const { cart, cartTotal, setCalculatedData, calculatedData, cartTotalFinal } = useCart()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const fetchCities = useCallback(async () => {
    if (searchTerm.length >= 3) {
      setIsFetchingCities(true)
      try {
        const citiesData = await getAllCities(searchTerm)
        setCities(citiesData)
      } finally {
        setIsFetchingCities(false)
      }
    }
  }, [searchTerm])

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  const fetchOffices = useCallback(async () => {
    if (selectedCity && deliveryMethod === 'econtOffice') {
      setIsFetchingOffices(true)
      try {
        const officesData = await getOffices(selectedCity)
  
        if (officesData.length === 0) {
          setDeliveryMethod('econtAddress')
          setSelectedOffice('')
          toast.error('Няма офиси на Спииди за избрания град. Автоматично превключване към доставка до адрес.', {
            duration: 5000,
            position: 'top-center',
          })
        } else {
          setOffices(officesData)
        }
      } finally {
        setIsFetchingOffices(false)
      }
    }
  }, [selectedCity, deliveryMethod, setIsFetchingOffices])

  useEffect(() => {
    fetchOffices()
  }, [fetchOffices])

  const fetchCalculatedPrice = useCallback(async () => {
    setIsCalculating(true)
    const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 1
    const totalWeight = cart?.items?.reduce((sum, item) => {
      const product = item.product;
      if (typeof product !== 'string' && product?.weight) {
        return sum + (product.weight * item.quantity);
      }
      return sum;
    }, 0);

    const formattedWeight = Number.isInteger(totalWeight) ? totalWeight.toFixed(1) : totalWeight;

    try {
      let calculatedData
      if (selectedCity) {
        calculatedData = await getCalculatedPrice(totalQuantity, formattedWeight, undefined, selectedCity)
        if (selectedOffice) {
          calculatedData = await getCalculatedPrice(totalQuantity, formattedWeight, selectedOffice, undefined)
        }
        await setCalculatedData(calculatedData)
      }
    } finally {
      setIsCalculating(false)
    }
  }, [cart, selectedCity, selectedOffice, setCalculatedData, setIsCalculating])

  useEffect(() => {
    fetchCalculatedPrice()
  }, [fetchCalculatedPrice])

  useEffect(() => {
    if (user?.phone) {
      setValue('phone', user.phone)
    }
  }, [user, setValue])

  async function sendConfirmationEmail(emailData: ConfirmationEmailData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()

    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const OnSubmit = useCallback(
    async (data: FormData) => {
      try {
        const totalWeight = cart?.items?.reduce((sum, item) => {
          const product = item.product;
          if (typeof product !== 'string' && product?.weight) {
            return sum + (product.weight * item.quantity);
          }
          return sum;
        }, 0);
    
        const formattedWeight = Number.isInteger(totalWeight) ? totalWeight.toFixed(1) : totalWeight;
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            deliveryPrice: calculatedData,
            total: cartTotalFinal.raw,
            phone: data.phone,
            email: user.email,
            deliveryMethod,
            placeOfResident: data.placeOfResident,
            ekontOffice: data.ekontOffice,
            addressNeighborhood: data.addressNeighborhood,
            addressStreet: data.addressStreet,
            items: cart?.items.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              price: typeof product === 'string' ? product : (product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price),
              quantity,
            })),
            totalWeight : formattedWeight
          }),
        })
        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Нещо се обърка.')

        const { error: errorFromRes, doc } = await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        const productDetails: ProductDetail[] =
          cart?.items.map(item => ({
            id: typeof item.product === 'string' ? item.product : item.product.id,
            quantity: item.quantity,
          })) || []

          await sendConfirmationEmail({
            name: user.name,
            email: user.email,
            total: cartTotalFinal.raw,
            orderId: doc.id,
            products: productDetails,
          })

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Нещо се обърка.'
        toast.error(`Грешка при поръчка: ${msg}`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })
      }
    },
    [router, cart, cartTotalFinal, deliveryMethod, user],
  )

  const handleRadioChange = useCallback((value: string) => {
    setDeliveryMethod(value)
    if (value === 'econtAddress' && selectedCity) {
      setValue('placeOfResident', selectedCity)
    }
    setSelectedOffice('')
  }, [selectedCity, setValue])
  

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/
    if (value && !phoneRegex.test(value)) {
      return 'Невалиден формат на телефонния номер'
    }
    return true
  }

  const isSubmitDisabled = useMemo(() => {
    if (isLoading || isCalculating || isFetchingOffices || isFetchingCities) return true
    if (deliveryMethod === 'econtAddress' && !selectedCity) return true
    if (deliveryMethod === 'econtOffice' && (!selectedCity || !selectedOffice)) return true
    return false
  }, [isLoading, isCalculating, isFetchingOffices, isFetchingCities, deliveryMethod, selectedCity, selectedOffice])

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className={classes.form}>
      <Input
        name="phone"
        label="Телефонен Номер:"
        required
        register={register}
        error={errors.phone}
        validate={validatePhoneNumber}
      />

      <RadioGroup defaultValue="econtOffice" onValueChange={handleRadioChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="econtOffice" id="r1" />
          <Label htmlFor="r1">До Офис на Спиди</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="econtAddress" id="r2" />
          <Label htmlFor="r2">До Адрес</Label>
        </div>
      </RadioGroup>

      {deliveryMethod === 'econtOffice' && (
        <div className={classes.loaderWrapper}>
          <OfficeDropdown
            name="placeOfResident"
            label="Населено Място"
            onSelectionChange={option => {
              if (option) {
                setValue('placeOfResident', option.name)
                setSelectedCity(option.cityId)
              }
            }}
            register={register}
            cities={cities}
            setCities={setCities}
            required
            error={errors.placeOfResident}
            isFetchingOffices={isFetchingOffices}
          />
          {isFetchingOffices && (
            <div style={{ display: 'flex', padding: '10px' }}>
              <Image src="/speedy_truck.svg" alt="Truck Icon" width={40} height={40} className="w-10 h-10 mr-2"/> 
              <p>Търсене на офиси...</p>
            </div>
          )}
        </div>
      )}

      {deliveryMethod === 'econtOffice' && offices.length > 0 && (
        <div className={classes.loaderWrapper}>
          <SearchableDropdown
            name="ekontOffice"
            options={offices.map(office => ({ 
              name: `${office.name} (${office.address})`, 
              officeId: office.officeId, 
              address: office.address 
            }))}
            label="Офис на Спиди"
            onSelectionChange={option => {
              if (option) {
                setValue('ekontOffice', `${option.officeId}`);
                setSelectedOffice(option.officeId)
              }
            }}
            register={register}
            required
            error={errors.ekontOffice}
          />
          {isFetchingOffices && <div className={classes.loader}>Търсене на офиси...</div>}
        </div>
      )}

      {deliveryMethod === 'econtAddress' && (
        <>
          <OfficeDropdown
            name="placeOfResident"
            label="Населено Място"
            onSelectionChange={option => {
              if (option) {
                setValue('placeOfResident', option.name)
                setSelectedCity(option.cityId)
              }
            }}
            register={register}
            cities={cities}
            setCities={setCities}
            required
            error={errors.placeOfResident}
          />
          <Input
            name="addressNeighborhood"
            label="Квартал"
            register={register}
            error={errors.addressNeighborhood}
          />
          <Input
            name="addressStreet"
            label="Улица"
            required
            register={register}
            error={errors.addressStreet}
          />
        </>
      )}

      <div className={classes.actions}>
        <Button label="Към Количка" href="/cart" appearance="secondary" />
        <Button
          label={
            <span className={classes.buttonContent}>
              {isLoading || isCalculating ? 'Обработка...' : 'Поръчай'}
            </span>
          }
          type="submit"
          appearance="primary"
          disabled={isSubmitDisabled}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
