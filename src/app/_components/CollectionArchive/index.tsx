'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import { Product } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { useFilter } from '../../_providers/Filter'
import { Card } from '../Cards/Card'
import { PageRange } from '../ui-components/PageRange'
import { Pagination } from '../ui-components/Pagination'
import LoaderProducts from '../ui/loader'

import classes from './index.module.scss'

type Result = {
  totalDocs: number
  docs: Product[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

interface WhereClause {
  categories?: { in: string }
  brands?: { in: string }
  regions?: { in: string }
  sorts?: { in: string }
  foods?: { in: string }
  spirts?: { in: string }
  tags?: { in: string }
  otherCategories?: { in: string }
  visible?: { equals: boolean}
}

export type Props = {
  className?: string
  relationTo?: 'products'
  populateBy?: 'collection' | 'selection'
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  sort?: string
  limit?: number
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  showOnlyDiscountedProducts?: boolean
  showOnlyOtherProducts?: boolean
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  categories?: ArchiveBlockProps['categories']
  brands?: ArchiveBlockProps['brands']
  sorts?: ArchiveBlockProps['sorts']
  regions?: ArchiveBlockProps['regions']
  foods?: ArchiveBlockProps['foods']
  spirts?: ArchiveBlockProps['spirts']
  tags?: ArchiveBlockProps['tags']
  otherCategories?: ArchiveBlockProps['otherCategories']
}

export const CollectionArchive: React.FC<Props> = props => {
  const {
    categoryFilters,
    brandFilters,
    regionFilters,
    sortsFilters,
    foodsFilters,
    spirtsFilters,
    tagsFilters,
    otherCategoriesFilters,
    sort,
  } = useFilter()

  const {
    className,
    relationTo,
    showPageRange,
    onResultChange,
    limit = 10,
    populatedDocs,
    populatedDocsTotal,
    showOnlyDiscountedProducts,
    showOnlyOtherProducts,
  } = props

  const [results, setResults] = useState<Result>({
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    docs: populatedDocs?.map(doc => doc.value) || [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true) 
      setError(undefined) 

      let actualSort = sort
      if (sort === 'price' || sort === '-price') {
        const shouldUseDiscountPrice = results.docs && results.docs.some(doc => doc.discountPrice)
        actualSort = shouldUseDiscountPrice ? sort.replace('price', 'discountPrice') : sort
      }

      const whereClause: WhereClause = {
        visible: { equals: true },
      }

      if (categoryFilters && categoryFilters.length > 0) {
        whereClause.categories = {
          in: Array.isArray(categoryFilters) ? categoryFilters.join(',') : categoryFilters,
        }
      }

      if (brandFilters && brandFilters.length > 0) {
        whereClause.brands = {
          in: Array.isArray(brandFilters) ? brandFilters.join(',') : brandFilters,
        }
      }

      if (sortsFilters && sortsFilters.length > 0) {
        whereClause.sorts = {
          in: Array.isArray(sortsFilters) ? sortsFilters.join(',') : sortsFilters,
        }
      }

      if (regionFilters && regionFilters.length > 0) {
        whereClause.regions = {
          in: Array.isArray(regionFilters) ? regionFilters.join(',') : regionFilters,
        }
      }

      if (foodsFilters && foodsFilters.length > 0) {
        whereClause.foods = {
          in: Array.isArray(foodsFilters) ? foodsFilters.join(',') : foodsFilters,
        }
      }

      if (spirtsFilters && spirtsFilters.length > 0) {
        whereClause.spirts = {
          in: Array.isArray(spirtsFilters) ? spirtsFilters.join(',') : spirtsFilters,
        }
      }

      if (tagsFilters && tagsFilters.length > 0) {
        whereClause.tags = {
          in: Array.isArray(tagsFilters) ? tagsFilters.join(',') : tagsFilters,
        }
      }

      if (otherCategoriesFilters && otherCategoriesFilters.length > 0) {
        whereClause.otherCategories = {
          in: Array.isArray(otherCategoriesFilters) ? otherCategoriesFilters.join(',') : otherCategoriesFilters,
        }
      }

      const searchQuery = qs.stringify(
        {
          sort: actualSort,
          where: whereClause,
          limit,
          page,
          depth: 1,
        },
        { encode: false },
      )

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
        )
        const json = await req.json()

        const { docs } = json as { docs: Product[] }
        let fetchedDocs = json.docs as Product[]
        let newTotalDocs = json.totalDocs

        if (showOnlyDiscountedProducts) {
          fetchedDocs = fetchedDocs.filter(doc => doc.discountPrice && doc.discountPrice > 0)
          newTotalDocs = fetchedDocs.length
        }

        if (showOnlyOtherProducts) {
          fetchedDocs = fetchedDocs.filter(doc => doc.productType === 'other')
          newTotalDocs = fetchedDocs.length
        }

        const newResults = {
          ...json,
          docs: fetchedDocs,
          totalDocs: newTotalDocs,
        }

        if (docs && Array.isArray(docs)) {
          setResults(newResults)
          if (typeof onResultChange === 'function') {
            onResultChange(json)
          }
        }
      } catch (err) {
        console.warn(err) // eslint-disable-line no-console
        setError(`Unable to load "${relationTo} archive" data at this time.`)
      } finally {
        setIsLoading(false) // Ensure loading state is set to false after request is done
      }
    }

    makeRequest()
  }, [
    page,
    categoryFilters,
    brandFilters,
    regionFilters,
    sortsFilters,
    foodsFilters,
    spirtsFilters,
    tagsFilters,
    otherCategoriesFilters,
    showOnlyDiscountedProducts,
    showOnlyOtherProducts,
    relationTo,
    onResultChange,
    sort,
    limit,
  ])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div ref={scrollRef} className={classes.scrollRef} />
      {isLoading && <LoaderProducts />}

      {!isLoading && error && <div>{error}</div>}

      {!isLoading && (
        <Fragment>
          {showPageRange !== false && (
            <div className={classes.pageRange}>
              <PageRange
                totalDocs={results.totalDocs}
                currentPage={results.page}
                collection={relationTo}
                limit={limit}
              />
            </div>
          )}

          <div className={classes.grid}>
            {results.docs?.map((result, index) => {
              return <Card key={index} relationTo="products" doc={result} />
            })}
          </div>

          {results.totalPages > 1 && (
            <Pagination page={results.page} totalPages={results.totalPages} onClick={setPage} />
          )}
        </Fragment>
      )}
    </div>
  )
}
