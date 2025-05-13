'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Category, Spirt, OtherCategory } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { profileNavItems } from '../../../constants'
import { Button } from '../../Buttons/Button'
import { TbMenuDeep } from 'react-icons/tb'
import { motion } from 'framer-motion'

import classes from './index.module.scss'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet'
import { containerVariants, itemVariants } from '../HeaderNavBar'
import { HR } from '../../ui-components/HR'
import { useFilter } from '../../../_providers/Filter'
import { FaChevronRight } from 'react-icons/fa6'

export const MobileBurgerNav: React.FC<{
  categories: Category[]
  spirts?: Spirt[]
  otherCategories?: OtherCategory[]
}> = ({ categories, spirts, otherCategories }) => {
  const [isSheetOpen, setSheetOpen] = useState(false)
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
    setTagsFilters,
    setOtherCategoriesFilters,
  } = useFilter()

  const { user } = useAuth()

  const handleCloseSheet = () => setSheetOpen(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <div>
          <TbMenuDeep
            style={{
              width: '28px',
              height: '28px',
              transform: 'rotate(180deg) scale(1, -1)',
              cursor: 'pointer',
            }}
          />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="space-y-0">
          <Link href="/" className={classes.burgerLogo}>
            <Image src="wine-logo.svg" alt="logo" width={130} height={10} />
          </Link>
        </SheetHeader>

        <HR />

        <motion.ul variants={containerVariants} initial="closed" animate="open">
          <motion.div key={119} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Начало</p>
              <FaChevronRight />
            </Link>
          </motion.div>
          {categories
            ?.map(category => (
              <motion.div key={category.id} variants={itemVariants} onClick={handleCloseSheet}>
                <Link
                  href="/products"
                  onClick={() => {
                    setCategoryFilters([category.id])
                    setSpirtsFilters([])
                    setBrandFilters([])
                    setRegionFilters([])
                    setSortsFilters([])
                    setFoodsFilters([])
                    setTagsFilters([])
                    setOtherCategoriesFilters([])
                  }}
                  className={classes.sideMenuButton}
                >
                  <p className="font-bold text-lg">{category.title}</p>
                  <FaChevronRight />
                </Link>
              </motion.div>
            ))
            .reverse()}
          <motion.div key={123} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/prestige" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Престижни Вина</p>
              <FaChevronRight />
            </Link>
          </motion.div>

          {spirts?.map(category => (
            <motion.div key={category.id} variants={itemVariants} onClick={handleCloseSheet}>
              <Link
                href="/products"
                onClick={() => {
                  setCategoryFilters([])
                  setSpirtsFilters([category.id])
                  setBrandFilters([])
                  setRegionFilters([])
                  setSortsFilters([])
                  setFoodsFilters([])
                  setTagsFilters([])
                  setOtherCategoriesFilters([])
                }}
                className={classes.sideMenuButton}
              >
                <p className="font-bold text-lg">{category.title}</p>
                <FaChevronRight />
              </Link>
            </motion.div>
          ))}

          <motion.div key={125} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/promotion" className={classes.sideMenuButton}>
              <p className="font-bold text-lg text-red-500">Промоции</p>
              <FaChevronRight className=" text-red-500" />
            </Link>
          </motion.div>

          <motion.div key={125} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/regions" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Региони</p>
              <FaChevronRight />
            </Link>
          </motion.div>

          <motion.div key={125} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/foods" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Храни</p>
              <FaChevronRight />
            </Link>
          </motion.div>

          <motion.div key={125} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/brands" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Производители</p>
              <FaChevronRight />
            </Link>
          </motion.div>

          {otherCategories?.map(category => (
            <motion.div key={category.id} variants={itemVariants} onClick={handleCloseSheet}>
              <Link
                href="/products"
                onClick={() => {
                  setCategoryFilters([])
                  setSpirtsFilters([])
                  setBrandFilters([])
                  setRegionFilters([])
                  setSortsFilters([])
                  setFoodsFilters([])
                  setTagsFilters([])
                  setOtherCategoriesFilters([category.id])
                }}
                className={classes.sideMenuButton}
              >
                <p className="font-bold text-lg">{category.title}</p>
                <FaChevronRight />
              </Link>
            </motion.div>
          ))}
        </motion.ul>

        <motion.div key={125} variants={itemVariants} onClick={handleCloseSheet}>
            <Link href="/blog" className={classes.sideMenuButton}>
              <p className="font-bold text-lg">Блог</p>
              <FaChevronRight />
            </Link>
          </motion.div>

        <HR />

        <div className={classes.sideMenuAccount}>
          <div>
            {!user && (
              <div onClick={handleCloseSheet}>
                <Button
                  el="link"
                  href="/login"
                  label="Вход"
                  appearance="primary"
                  onClick={() => (window.location.href = '/login')}
                />
              </div>
            )}
          </div>
        </div>

        {user && (
          <div onClick={handleCloseSheet}>
            <div>
              <Link href={profileNavItems[0].url} className={classes.navItem}>
                <Image
                  src={profileNavItems[0].icon}
                  alt={profileNavItems[0].title}
                  width={24}
                  height={24}
                />
                <p>{user?.name}</p>
              </Link>
            </div>

            <div onClick={handleCloseSheet}>
              <Link href={profileNavItems[2].url} className={classes.navItem}>
                <Image
                  src={profileNavItems[2].icon}
                  alt={profileNavItems[2].title}
                  width={24}
                  height={24}
                />
                <p>{profileNavItems[2].title}</p>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
