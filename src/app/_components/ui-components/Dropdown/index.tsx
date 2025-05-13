import React, { useState, useEffect } from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

import classes from './index.module.scss'

type SearchableDropdownProps = {
  name: string
  options: any[]
  label: string
  register: UseFormRegister<FieldValues & any>
  onSelectionChange: (selectedOption: any | null) => void
  required?: boolean
  error?: any
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  name,
  options,
  label,
  onSelectionChange,
  register,
  required,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  const [selectedOption, setSelectedOption] = useState<any | null>(null)

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOptions(options)
      if (selectedOption) {
        setSelectedOption(null)
        onSelectionChange(null)
      }
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(lowerCaseSearchTerm),
      )
      setFilteredOptions(filtered)
    }
  }, [searchTerm, options])

  useEffect(() => {
    if (!selectedOption) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(lowerCaseSearchTerm),
      )
      
      setFilteredOptions(filtered)
    }
  }, [selectedOption, options])

  const handleSelectionChange = (option: any) => {
    setSelectedOption(option)
    setSearchTerm(option.name)
    setIsOpen(false)
    onSelectionChange(option)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (selectedOption && value !== selectedOption.name) {
      setSelectedOption(null)
      onSelectionChange(null)
    }
  }

  return (
    <div className={classes.dropdown}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      <input
        className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
        {...register(name, {
          required,
        })}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 100)
        }}
      />
      {isOpen && (
        <ul className={classes.optionsList}>
          {filteredOptions.map(option => (
            <li
              key={option.id}
              className={classes.option}
              onMouseDown={() => handleSelectionChange(option)}
            >
              {`${option.name}`}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required' ? 'Задължително поле' : error?.message}
        </div>
      )}
    </div>
  )
}
