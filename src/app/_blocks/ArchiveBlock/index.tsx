import React from 'react'

import { CollectionArchive } from '../../_components/CollectionArchive'
import { Gutter } from '../../_components/ui-components/Gutter'
import RichText from '../../_components/ui-components/RichText'
import { ArchiveBlockProps } from './types'

import classes from './index.module.scss'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    categories,
    showOnlyDiscountedProducts,
    showOnlyOtherProducts,
  } = props

  return (
    <div id={`block-${id}`} className={classes.archiveBlock}>
      {introContent && (
        <Gutter className={classes.introContent}>
          <RichText content={introContent} />
        </Gutter>
      )}
      <CollectionArchive
        populateBy={populateBy}
        relationTo={relationTo}
        populatedDocs={populatedDocs}
        showOnlyDiscountedProducts={showOnlyDiscountedProducts}
        showOnlyOtherProducts={showOnlyOtherProducts}
        populatedDocsTotal={populatedDocsTotal}
        categories={categories}
        limit={limit}
        sort="-publishedOn"
      />
    </div>
  )
}
