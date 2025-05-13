import React from 'react'

const defaultLabels = {
  singular: 'Документ',
  plural: 'Документа',
}

const defaultCollectionLabels = {
  products: {
    singular: 'Продукт',
    plural: 'Продукта',
  },
}

export const PageRange: React.FC<{
  totalDocs?: number
  currentPage?: number
  collection?: string
  limit?: number
  collectionLabels?: {
    singular?: string
    plural?: string
  }
}> = props => {
  const {
    totalDocs,
    currentPage,
    collection,
    limit,
    collectionLabels: collectionLabelsFromProps,
  } = props

  const indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { singular, plural } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || ''] || defaultLabels || {}

  return (
    <div className="flex items-center font-semibold">
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Няма намерени резултати.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${indexStart} - ${indexEnd} от ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
    </div>
  )
}
