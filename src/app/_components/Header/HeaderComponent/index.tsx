'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Category, Spirt, OtherCategory } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Gutter } from '../../ui-components/Gutter'
import { MobileNavBar } from '../MobileNavBar'
import { HeaderNavBar } from '../HeaderNavBar'
import { fetchDocs } from '../../../_api/fetchDocs'

import classes from './index.module.scss'

const HeaderComponent = () => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [spirts, setSpirts] = useState<Spirt[] | null>(null)
  const [otherCategories, setOtherCategories] = useState<OtherCategory[] | null>(null)

  useEffect(() => {
    fetchDocs<Category>('categories').then(setCategories).catch(console.log)
    fetchDocs<Spirt>('spirts').then(setSpirts).catch(console.log)
    fetchDocs<OtherCategory>('otherCategories').then(setOtherCategories).catch(console.log)
  }, [])
  const pathname = usePathname()

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        <div className={classes.menuBurger}></div>

        <Link href="/">
          <Image src="/wine-logo.svg" alt="logo" width={130} height={10} />
        </Link>

        <MobileNavBar categories={categories} spirts={spirts} otherCategories={otherCategories} />
        <HeaderNavBar categories={categories} spirts={spirts} otherCategories={otherCategories} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
