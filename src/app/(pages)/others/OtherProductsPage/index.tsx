'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Product } from '../../../../payload/payload-types'
import { motion } from 'framer-motion'
import { Card } from '../../../_components/Cards/Card'
import { fetchOtherProducts } from '../../../_api/fetchOtherProducts'

import classes from './index.module.scss'

export const OtherProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetchOtherProducts()
      setProducts(fetchedProducts)
    }

    fetchProducts()
  }, [])

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <Fragment>
      <div className={classes.grid}>
        {products.map(product => (
          <motion.div
            key={product.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Card doc={product} />
          </motion.div>
        ))}
      </div>
    </Fragment>
  )
}
