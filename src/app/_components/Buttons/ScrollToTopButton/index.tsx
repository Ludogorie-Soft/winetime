'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import classes from './index.module.scss'

export const ScrollToTop: React.FC<{}> = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isBorderVisible, setIsBorderVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolledMoreThan80 = window.scrollY > 80
      const scrolledMoreThan2000 = window.scrollY > 1500
      setIsVisible(scrolledMoreThan80)
      setIsBorderVisible(scrolledMoreThan2000)
    }
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    if (isVisible) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <button
      className={[classes.scrollTop, !isVisible && classes.hide, isBorderVisible && classes.border]
        .filter(Boolean)
        .join(' ')}
      onClick={scrollToTop}
    >
      <Image src="/assets/icons/arrow-up.svg" alt="arrow-up" width={16} height={16} />
    </button>
  )
}
