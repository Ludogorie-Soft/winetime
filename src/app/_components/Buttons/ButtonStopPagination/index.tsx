'use client'

import React, { ElementType } from 'react'
import Link from 'next/link'

import classes from './index.module.scss'

export type ButtonStopPaginationProps = {
  label?: string | React.ReactNode
  appearance?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: (event: React.MouseEvent<HTMLElement>) => void // Accepts event object
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
}

export const ButtonStopPagination: React.FC<ButtonStopPaginationProps> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    classes.button,
    classNameFromProps,
    classes[`appearance--${appearance}`],
    invert && classes[`${appearance}--invert`],
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={classes.content}>
      <span className={classes.label}>{label}</span>
      {children}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event)
    }
  }

  if (el === 'link') {
    return (
      <Link href={href || ''} {...newTabProps} className={className} onClick={handleClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el === 'a' ? 'a' : 'button'

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
