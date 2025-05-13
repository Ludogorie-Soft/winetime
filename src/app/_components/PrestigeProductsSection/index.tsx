'use client'

import React from 'react'

import { Product } from '../../../payload/payload-types'
import { motion } from 'framer-motion'

import classes from './index.module.scss'
import { Card } from '../Cards/Card'

const PrestigeProducts = ({ products }: { products: Product[] }) => {
  if (!products || products.length === 0) {
    return null
  }

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
    <div className={classes.container}>
      <div className="mb-6">
        <video
          width="420"
          height="300"
          controls
          preload="auto"
          autoPlay
          loop
          muted
          className="w-3/5 h-auto rounded-lg shadow-lg mx-auto"
        >
          <source src="/assets/video/prestige-products.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex justify-start gap-4 items-center">
        <h3 className="text-3xl leading-10 font-normal">Пресижни вина</h3>
      </div>

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
    </div>
  )
}

export default PrestigeProducts
