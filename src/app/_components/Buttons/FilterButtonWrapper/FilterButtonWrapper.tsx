'use client'

import { useFilter } from '../../../_providers/Filter'

const FilterButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    setCategoryFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
    setSpirtsFilters,
  } = useFilter()

  return (
    <button
      onClick={() => {
        setCategoryFilters([])
        setBrandFilters([])
        setRegionFilters([])
        setSortsFilters([])
        setFoodsFilters([])
        setSpirtsFilters([])
      }}
    >
      {children}
    </button>
  )
}

export default FilterButtonWrapper
