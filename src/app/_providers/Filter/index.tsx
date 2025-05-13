'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IContextType {
  categoryFilters: string[]
  setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  brandFilters: string[]
  setBrandFilters: React.Dispatch<SetStateAction<string[]>>
  regionFilters: string[]
  setRegionFilters: React.Dispatch<SetStateAction<string[]>>
  sortsFilters: string[]
  setSortsFilters: React.Dispatch<SetStateAction<string[]>>
  foodsFilters: string[]
  setFoodsFilters: React.Dispatch<SetStateAction<string[]>>
  spirtsFilters: string[]
  setSpirtsFilters: React.Dispatch<SetStateAction<string[]>>
  tagsFilters: string[]
  setTagsFilters: React.Dispatch<SetStateAction<string[]>>
  otherCategoriesFilters: string[]
  setOtherCategoriesFilters: React.Dispatch<SetStateAction<string[]>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  brandFilters: [],
  setBrandFilters: () => [],
  regionFilters: [],
  setRegionFilters: () => [],
  sortsFilters: [],
  setSortsFilters: () => [],
  foodsFilters: [],
  setFoodsFilters: () => [],
  spirtsFilters: [],
  setSpirtsFilters: () => [],
  tagsFilters: [],
  setTagsFilters: () => [],
  otherCategoriesFilters: [],
  setOtherCategoriesFilters: () => [],
  sort: '',
  setSort: () => '',
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState([])
  const [brandFilters, setBrandFilters] = useState([])
  const [regionFilters, setRegionFilters] = useState([])
  const [sortsFilters, setSortsFilters] = useState([])
  const [foodsFilters, setFoodsFilters] = useState([])
  const [spirtsFilters, setSpirtsFilters] = useState([])
  const [tagsFilters, setTagsFilters] = useState([])
  const [otherCategoriesFilters, setOtherCategoriesFilters] = useState([])
  const [sort, setSort] = useState('-createdAt')

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        brandFilters,
        setBrandFilters,
        regionFilters,
        setRegionFilters,
        sortsFilters,
        setSortsFilters,
        foodsFilters,
        setFoodsFilters,
        spirtsFilters,
        setSpirtsFilters,
        tagsFilters,
        setTagsFilters,
        setOtherCategoriesFilters,
        otherCategoriesFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
