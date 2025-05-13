import React, { useState, useEffect, useCallback, useMemo } from 'react'
import classes from './index.module.scss'
import getAllCities from '../../../_utilities/getBgCities'
import useDebounce from '../../../_utilities/useDebounce'
import Image from 'next/image'

type OfficeDropdownProps = {
  name: string
  label: string
  register: any
  cities: any
  setCities: any
  onSelectionChange: (selectedOption: any | null) => void
  required?: boolean
  error?: any
  isFetchingOffices?: boolean
}

export const OfficeDropdown: React.FC<OfficeDropdownProps> = ({
  name,
  label,
  onSelectionChange,
  register,
  cities,
  setCities,
  required,
  error,
  isFetchingOffices,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState<any | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isFetchingCities, setIsFetchingCities] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [cache, setCache] = useState<Record<string, any[]>>({})

  const fetchCities = useCallback(async () => {
    if (debouncedSearchTerm.length < 3) return

    setIsFetchingCities(true)

    if (cache[debouncedSearchTerm]) {
      setCities(cache[debouncedSearchTerm])
      setIsFetchingCities(false)
    } else {
      try {
        const citiesData = await getAllCities(debouncedSearchTerm)
        setCities(citiesData)

        setCache(prevCache => ({
          ...prevCache,
          [debouncedSearchTerm]: citiesData,
        }))
      } catch (error) {
        console.error('Failed to fetch cities:', error)
      } finally {
        setIsFetchingCities(false)
      }
    }
  }, [debouncedSearchTerm, cache, setCities])
  
  useEffect(() => {
    fetchCities()
  }, [debouncedSearchTerm, fetchCities])

  const handleSelectionChange = useCallback(
    (option: any) => {
      setSelectedOption(option)
      setSearchTerm(option.name)
      setIsOpen(false)
      onSelectionChange(option)
    },
    [onSelectionChange]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchTerm(value)

      if (selectedOption && value !== selectedOption.name) {
        setSelectedOption(null)
        onSelectionChange(null)
      }
    },
    [selectedOption, onSelectionChange]
  )

  const handleFocus = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 100)
  }, [])

  const isValidInput = useMemo(() => searchTerm.length >= 3, [searchTerm])

  return (
    <>
    <div className={classes.dropdown}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>

      <input
        className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
        {...register(name, { required })}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur} />

      {isOpen && cities.length > 0 && isValidInput && (
        <ul className={classes.optionsList}>
          {cities.map(option => (
            <li
              key={option.cityId}
              className={classes.option}
              onMouseDown={() => handleSelectionChange(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
      {isFetchingCities && !isFetchingOffices && (
        <div style={{ display: 'flex', padding: '10px' }}>
          <Image src="/speedy_truck.svg" alt="Truck Icon" width={40} height={40} className="w-10 h-10 mr-2"/> 
          <p>Търсене на градове...</p>
        </div>
      )}

      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required' ? 'Задължително поле' : error?.message}
        </div>
      )}
    </div>
    </>
  )
}
