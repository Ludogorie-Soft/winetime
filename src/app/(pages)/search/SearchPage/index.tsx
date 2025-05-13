'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'

import { Product } from '../../../../payload/payload-types'
import useDebounce from '../../../_utilities/useDebounce'
import { InputSh } from '../../../_components/ui/input'
import { motion } from 'framer-motion'
import { Card } from '../../../_components/Cards/Card'
import { fetchProductsByQuery } from '../../../_api/fetchProductsByQuery'

import classes from './index.module.scss'

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch()
    } else {
      setProducts([])
    }
  }, [debouncedSearchQuery])

  const handleSearch = async () => {
    try {
      const fetchedProducts = await fetchProductsByQuery(debouncedSearchQuery)
      setProducts(fetchedProducts)
    } catch (error) {
      console.log(error)
    }
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
    <Fragment>
      <InputSh
        type="text"
        placeholder="Мерло.."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        ref={inputRef} 
      />
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
