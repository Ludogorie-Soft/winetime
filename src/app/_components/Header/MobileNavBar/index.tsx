'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Category, Spirt, OtherCategory } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLinkMobile } from '../../Buttons/CartLinkMobileButton'
import { FavouritesLinkMobile } from '../../Buttons/FavouritesMobileButton'
import { SearchTab } from '../../Buttons/SeachIconButton'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa6'

import classes from './index.module.scss'
import { MobileBurgerNav } from '../MobileSideBarBurger'

export const MobileNavBar: React.FC<{
  categories: Category[]
  spirts?: Spirt[]
  otherCategories?: OtherCategory[]
}> = ({ categories, spirts, otherCategories }) => {
  const { user } = useAuth()
  const pathname = usePathname()

  const isAdmin = user?.roles?.includes('admin')

  const isActive = navItem => {
    return pathname.includes(navItem)
  }

  return (
    <nav className={classes.nav}>
      <MobileBurgerNav categories={categories} spirts={spirts} otherCategories={otherCategories} />
      <div className={`${isActive('favourites') ? classes.clickedItem : ''}`}>
        <FavouritesLinkMobile />
      </div>
      <div className={`${isActive('cart') ? classes.clickedItem : ''}`}>
        <CartLinkMobile />
      </div>
      <div className={`${isActive('search') ? classes.clickedItem : ''}`}>
        <SearchTab />
      </div>
      {user && (
        <Link href="/account" className={`${isActive('account') ? classes.clickedItem : ''}`}>
          <FaRegUser style={{ width: '22px', height: '22px' }} />
        </Link>
      )}
      {!user && (
        <Link href="/login" className={`${isActive('login') ? classes.clickedItem : ''}`}>
          <FaRegUser style={{ width: '22px', height: '22px' }} />
        </Link>
      )}
      {isAdmin && (
        <Link href="/admin" className={`${isActive('admin') ? classes.clickedItem : ''}`}>
          <AiOutlineSetting style={{ width: '25px', height: '25px' }} />
        </Link>
      )}
    </nav>
  )
}
