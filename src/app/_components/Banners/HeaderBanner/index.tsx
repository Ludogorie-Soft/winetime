'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Header } from '../../../../payload/payload-types'
import { fetchHeader } from '../../../_api/fetchGlobals'
import { Gutter } from '../../ui-components/Gutter'

import classes from './index.module.scss'

export const HeaderBanner = () => {
  const [header, setHeader] = useState<Header | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    fetchHeader().then(setHeader).catch(console.log)
  }, [])

  if (!header?.promotionBanner || !isVisible) {
    return null
  }

  return (
    <nav className={classes.headerBanner}>
      <Gutter>
        <div className="flex items-center justify-center mr-10">
          <span className="text-center">{header.promotionBanner}</span>
        </div>
        <button onClick={() => setIsVisible(false)} className={classes.closeButton}>
          <Image src="/assets/icons/close-banner.svg" alt="close" width={24} height={24} />
        </button>
      </Gutter>
    </nav>
  )
}
