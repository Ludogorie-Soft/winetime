import React from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

import classes from './index.module.scss'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  validate?: (value: string) => boolean | string
  disabled?: boolean
  rows?: number
  cols?: number
}

export const TextArea: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  validate,
  disabled,
  rows = 3,
  cols,
}) => {
  return (
    <div className={classes.inputWrap}>
      <label htmlFor={name} className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      <textarea
        className={[classes.input, error && classes.error].filter(Boolean).join(' ')}
        {...register(name, {
          required,
          validate,
        })}
        disabled={disabled}
        rows={rows}
        cols={cols}
        id={name}
      />
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required' ? 'Задължително поле' : error?.message}
        </div>
      )}
    </div>
  )
}
