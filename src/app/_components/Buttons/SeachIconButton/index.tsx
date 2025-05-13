'use client'

import React from 'react'
import Link from 'next/link'

import { HiOutlineSearch } from 'react-icons/hi'

export const SearchTab: React.FC<{
  className?: string
}> = props => {
  const { className } = props

  return (
    <Link className="cursor-pointer flex items-center" href="/search">
      <HiOutlineSearch style={{ width: '26px', height: '26px' }} />
    </Link>
  )
}
