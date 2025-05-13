'use client'

import React from 'react'
import Link from 'next/link'

import { Category, Spirt, OtherCategory } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLinkMobile } from '../../Buttons/CartLinkMobileButton'
import { FavouritesLinkMobile } from '../../Buttons/FavouritesMobileButton'
import { AiOutlineSetting } from 'react-icons/ai'
import { motion } from 'framer-motion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../../ui/navigation-menu'
import { useFilter } from '../../../_providers/Filter'
import { CircleUserRound } from 'lucide-react'
import { SearchTab } from '../../Buttons/SeachIconButton'

import classes from './index.module.scss'

export const containerVariants = {
  open: {
    transition: { staggerChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.1 },
  },
}

export const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}

export const HeaderNavBar: React.FC<{
  categories: Category[]
  spirts?: Spirt[]
  otherCategories?: OtherCategory[]
}> = ({ categories, spirts, otherCategories }) => {
  const { user } = useAuth()
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

  const isAdmin = user?.roles?.includes('admin')

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      <div className={classes.navMenu}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Вина</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                >
                  {categories?.map(category => (
                    <motion.div
                      key={category.id}
                      className={classes.buttonHeader}
                      variants={itemVariants}
                    >
                      <span className={classes.navLinkText}>
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
                        >
                          <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                            {category.title}
                          </p>
                        </Link>
                      </span>
                    </motion.div>
                  ))}

                  <motion.div key={10000} className={classes.buttonHeader} variants={itemVariants}>
                    <span className={classes.navLinkText}>
                      <Link href="/prestige">
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Престижни Вина
                        </p>
                      </Link>
                    </span>
                  </motion.div>
                  <motion.div key={10002} className={classes.buttonHeader} variants={itemVariants}>
                    <span className={classes.navLinkText}>
                      <Link href="/promotion">
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight text-red-500">
                          Промоции
                        </p>
                      </Link>
                    </span>
                  </motion.div>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Категории</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                >
                  <motion.div key={10000} className={classes.buttonHeader} variants={itemVariants}>
                    <span className={classes.navLinkText}>
                      <Link href="/regions">
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight">Региони</p>
                      </Link>
                    </span>
                  </motion.div>
                  <motion.div key={10001} className={classes.buttonHeader} variants={itemVariants}>
                    <span className={classes.navLinkText}>
                      <Link href="/foods">
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight">Храни</p>
                      </Link>
                    </span>
                  </motion.div>
                  <motion.div key={10001} className={classes.buttonHeader} variants={itemVariants}>
                    <span className={classes.navLinkText}>
                      <Link href="/brands">
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Производители
                        </p>
                      </Link>
                    </span>
                  </motion.div>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Спиртни</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                >
                  {spirts?.map(category => (
                    <motion.div
                      key={category.id}
                      className={classes.buttonHeader}
                      variants={itemVariants}
                    >
                      <span className={classes.navLinkText}>
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
                        >
                          <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                            {category.title}
                          </p>
                        </Link>
                      </span>
                    </motion.div>
                  ))}
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Блог</h3>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Други</h3>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                >
                  {otherCategories?.map(category => (
                    <motion.div
                      key={category.id}
                      className={classes.buttonHeader}
                      variants={itemVariants}
                    >
                      <span className={classes.navLinkText}>
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
                        >
                          <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                            {category.title}
                          </p>
                        </Link>
                      </span>
                    </motion.div>
                  ))}
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className={classes.removeMobile}>
        <SearchTab />
      </div>
      <div className={classes.removeMobile}>
        <FavouritesLinkMobile />
      </div>
      <CartLinkMobile />
      {user && (
        <Link href="/account" className={classes.linkIcon}>
          <CircleUserRound style={{ width: '25px', height: '25px' }} />
        </Link>
      )}
      {!user && (
        <Link href="/login" className={classes.linkIcon}>
          <CircleUserRound style={{ width: '25px', height: '25px' }} />
        </Link>
      )}
      {isAdmin && (
        <Link href="/admin" className={classes.hideOnMobile}>
          <AiOutlineSetting style={{ width: '25px', height: '25px' }} />
        </Link>
      )}
    </nav>
  )
}
