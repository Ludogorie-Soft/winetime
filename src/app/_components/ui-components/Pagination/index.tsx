import React from 'react'

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  UiPagination,
} from '../../ui/pagination'

export const Pagination: React.FC<{
  page: number
  totalPages: number
  onClick: (page: number) => void
}> = props => {
  const { page, totalPages, onClick } = props

  // Define the max pages to show based on the screen size
  const maxPagesToShow = (() => {
    if (window.innerWidth <= 480) return 4 // Mobile
    if (window.innerWidth <= 768) return 7 // Tablet
    return 15 // Desktop
  })()

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const getPageNumbers = () => {
    let pages = []

    if (page > 2) {
      pages.push(1)
    }

    if (page > 3) {
      pages.push('...')
    }

    if (page > 1) {
      pages.push(page - 1)
    }

    pages.push(page)

    if (page < totalPages) {
      pages.push(page + 1)
    }

    if (page < totalPages - 2) {
      pages.push('...')
    }

    if (page < totalPages - 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const handlePageChange = (newPage: number) => {
    onClick(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <UiPagination className="mt-6">
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
        )}

        {getPageNumbers().map(p => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === page} onClick={() => handlePageChange(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </UiPagination>
  )
}
