'use client'

import React, { useState } from 'react'
import { Brand, Category, Region, Sort, Food, Spirt, OtherCategory } from '../../../../payload/payload-types'
import { HR } from '../../../_components/ui-components/HR'
import { Checkbox } from '../../../_components/ui-components/Checkbox'
import { RadioButton } from '../../../_components/ui-components/Radio'
import { useFilter } from '../../../_providers/Filter'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../_components/ui/drawer'
import { Button } from '../../../_components/ui/button'
import { SlidersHorizontal, Undo2 } from 'lucide-react'
import { ArrowUpDown } from 'lucide-react'

import classes from './index.module.scss'
import { fetchDocs } from '../../../_api/fetchDocs'

const Filters = () => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [brands, setBrands] = useState<Brand[] | null>(null)
  const [regions, setRegions] = useState<Region[] | null>(null)
  const [sorts, setSorts] = useState<Sort[] | null>(null)
  const [foods, setFoods] = useState<Food[] | null>(null)
  const [spirts, setSpirts] = useState<Spirt[] | null>(null)
  const [otherCategories, setOtherCategories] = useState<OtherCategory[] | null>(null)

  const {
    categoryFilters,
    brandFilters,
    regionFilters,
    sortsFilters,
    foodsFilters,
    spirtsFilters,
    otherCategoriesFilters,
    sort,
    setCategoryFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
    setSpirtsFilters,
    setOtherCategoriesFilters,
    setSort,
  } = useFilter()
  const [drawerScreen, setDrawerScreen] = useState('main')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const fetchCategories = async () => {
    if (!categories) {
      const data = await fetchDocs<Category>('categories')
      setCategories(data)
    }
  }

  const fetchBrands = async () => {
    if (!brands) {
      const data = await fetchDocs<Brand>('brands')
      setBrands(data)
    }
  }

  const fetchRegions = async () => {
    if (!regions) {
      const data = await fetchDocs<Region>('regions')
      setRegions(data)
    }
  }

  const fetchSorts = async () => {
    if (!sorts) {
      const data = await fetchDocs<Sort>('sorts')
      setSorts(data)
    }
  }

  const fetchFoods = async () => {
    if (!foods) {
      const data = await fetchDocs<Food>('foods')
      setFoods(data)
    }
  }

  const fetchSpirts = async () => {
    if (!spirts) {
      const data = await fetchDocs<Spirt>('spirts')
      setSpirts(data)
    }
  }

  const fetchOtherCategories = async () => {
    if (!otherCategories) {
      const data = await fetchDocs<Spirt>('otherCategories')
      setOtherCategories(data)
    }
  }

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)

      setCategoryFilters(updatedCategories)
      setSpirtsFilters([])
      setOtherCategoriesFilters([])
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
      setSpirtsFilters([])
      setOtherCategoriesFilters([])
    }
  }

  const handleBrands = (brandId: string) => {
    if (brandFilters.includes(brandId)) {
      const updatedBrands = brandFilters.filter(id => id !== brandId)

      setBrandFilters(updatedBrands)
    } else {
      setBrandFilters([...brandFilters, brandId])
    }
  }

  const handleRegions = (regionId: string) => {
    if (regionFilters.includes(regionId)) {
      const updatedRegions = regionFilters.filter(id => id !== regionId)

      setRegionFilters(updatedRegions)
    } else {
      setRegionFilters([...regionFilters, regionId])
    }
  }

  const handleSorts = (sortId: string) => {
    if (sortsFilters.includes(sortId)) {
      const updatedSorts = sortsFilters.filter(id => id !== sortId)

      setSortsFilters(updatedSorts)
    } else {
      setSortsFilters([...sortsFilters, sortId])
    }
  }

  const handleFoods = (foodId: string) => {
    if (foodsFilters.includes(foodId)) {
      const updatedFoods = foodsFilters.filter(id => id !== foodId)

      setFoodsFilters(updatedFoods)
    } else {
      setFoodsFilters([...foodsFilters, foodId])
    }
  }

  const handleSpirts = (spirtId: string) => {
    if (spirtsFilters.includes(spirtId)) {
      const updatedSpirts = spirtsFilters.filter(id => id !== spirtId)

      setSpirtsFilters(updatedSpirts)
      setCategoryFilters([])
      setOtherCategoriesFilters([])
    } else {
      setSpirtsFilters([...spirtsFilters, spirtId])
      setCategoryFilters([])
      setOtherCategoriesFilters([])
    }
  }

  const handleOtherCategories = (ocId: string) => {
    if (otherCategoriesFilters.includes(ocId)) {
      const updatedOC = otherCategoriesFilters.filter(id => id !== ocId)

      setOtherCategoriesFilters(updatedOC)
      setCategoryFilters([])
      setSpirtsFilters([])
    } else {
      setOtherCategoriesFilters([...otherCategoriesFilters, ocId])
      setCategoryFilters([])
      setSpirtsFilters([])
    }
  }

  const handleSort = (value: string) => setSort(value)

  const navigateToScreen = async (screenName: string) => {
    setIsTransitioning(true)

    setTimeout(async () => {
      switch (screenName) {
        case 'categories':
          await fetchCategories()
          break
        case 'brands':
          await fetchBrands()
          break
        case 'regions':
          await fetchRegions()
          break
        case 'sorts':
          await fetchSorts()
          break
        case 'foods':
          await fetchFoods()
          break
        case 'spirts':
          await fetchSpirts()
          break
          case 'otherCategories':
            await fetchOtherCategories()
            break
        default:
          break
      }
      setDrawerScreen(screenName)
      setIsTransitioning(false)
    }, 300)
  }

  const navigateBack = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setDrawerScreen('main')
      setIsTransitioning(false)
    }, 300)
  }

  const resetDrawerScreen = () => {
    setDrawerScreen('main')
  }

  const getTransitionClasses = () => {
    if (drawerScreen === 'main') {
      return isTransitioning ? 'translate-x-full' : 'translate-x-0'
    } else {
      return isTransitioning ? '-translate-x-full' : 'translate-x-0'
    }
  }

  const resetAllFilters = () => {
    setCategoryFilters([])
    setBrandFilters([])
    setRegionFilters([])
    setSortsFilters([])
    setSpirtsFilters([])
    setFoodsFilters([])
    setOtherCategoriesFilters([])

    setIsTransitioning(true)
    setTimeout(() => {
      resetDrawerScreen()
      setIsTransitioning(false)
    }, 300)
  }

  const renderMainDrawerScreen = () => (
    <>
      <DrawerHeader>
        <DrawerTitle>Филтри</DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-col gap-2 p-4">
        <Button variant="outline" onClick={() => navigateToScreen('categories')}>
          Категории
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('brands')}>
          Производители
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('sorts')}>
          Сорт
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('regions')}>
          Региони
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('foods')}>
          Храни
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('spirts')}>
          Спиртни Напитки
        </Button>
        <Button variant="outline" onClick={() => navigateToScreen('otherCategories')}>
          Други
        </Button>
      </div>
    </>
  )

  return (
    <div className={classes.filters}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            Филтри
            <SlidersHorizontal size={16} className={classes.iconGap} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div
            className={`mx-auto w-full max-w-sm transition-transform duration-300 ${getTransitionClasses()}`}
          >
            {drawerScreen !== 'main' && (
              <DrawerHeader>
                <DrawerTitle>
                  {drawerScreen === 'categories'
                    ? 'Категории'
                    : drawerScreen === 'brands'
                    ? 'Производители'
                    : drawerScreen === 'sorts'
                    ? 'Сорт'
                    : 'Региони'}
                </DrawerTitle>

                <button onClick={navigateBack} className="text-left flex gap-2">
                  <Undo2 />
                  Назад
                </button>
              </DrawerHeader>
            )}

            {drawerScreen === 'main' && renderMainDrawerScreen()}

            {drawerScreen === 'categories' && (
              <>
                <HR className={classes.hr} />
                <div className={classes.categories}>
                  {categories.map(category => {
                    const isSelected = categoryFilters.includes(category.id)
                    return (
                      <Checkbox
                        key={category.id}
                        label={category.title}
                        value={category.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleCategories(category.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'brands' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {brands.map(brand => {
                    const isSelected = brandFilters.includes(brand.id)
                    return (
                      <Checkbox
                        key={brand.id}
                        label={brand.title}
                        value={brand.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleBrands(brand.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'sorts' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {sorts?.map(sort => {
                    const isSelected = sortsFilters.includes(sort.id)
                    return (
                      <Checkbox
                        key={sort.id}
                        label={sort.title}
                        value={sort.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleSorts(sort.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'regions' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {regions.map(region => {
                    const isSelected = regionFilters.includes(region.id)
                    return (
                      <Checkbox
                        key={region.id}
                        label={region.title}
                        value={region.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleRegions(region.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'foods' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {foods.map(food => {
                    const isSelected = foodsFilters.includes(food.id)
                    return (
                      <Checkbox
                        key={food.id}
                        label={food.title}
                        value={food.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleFoods(food.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'spirts' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {spirts.map(spirt => {
                    const isSelected = spirtsFilters.includes(spirt.id)
                    return (
                      <Checkbox
                        key={spirt.id}
                        label={spirt.title}
                        value={spirt.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleSpirts(spirt.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            {drawerScreen === 'otherCategories' && (
              <>
                <HR className={classes.hr} />
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {otherCategories.map(cat => {
                    const isSelected = otherCategoriesFilters.includes(cat.id)
                    return (
                      <Checkbox
                        key={cat.id}
                        label={cat.title}
                        value={cat.id}
                        isSelected={isSelected}
                        onClickHandler={() => handleOtherCategories(cat.id)}
                      />
                    )
                  })}
                </div>
                <HR className={classes.hr} />
              </>
            )}

            <DrawerFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" onClick={resetAllFilters} className="flex-grow">
                  Нулирай
                </Button>
                <DrawerClose asChild onClick={resetDrawerScreen}>
                  <Button variant="outline" className="flex-grow">
                    Затвори
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            Сорт
            <ArrowUpDown size={16} className={classes.iconGap} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Сортирай</DrawerTitle>
              <DrawerDescription>Сортирай по</DrawerDescription>
            </DrawerHeader>
            <HR className={classes.hr} />
            <div className={classes.categories}>
              <RadioButton
                label="Най-нови"
                value="-createdAt"
                isSelected={sort === '-createdAt'}
                onRadioChange={handleSort}
                groupName="sort"
              />
              <RadioButton
                label="Най-стари"
                value="createdAt"
                isSelected={sort === 'createdAt'}
                onRadioChange={handleSort}
                groupName="sort"
              />

              <RadioButton
                label="Най-ниска цена"
                value="price"
                isSelected={sort === 'price'}
                onRadioChange={handleSort}
                groupName="sort"
              />
              <RadioButton
                label="Най-висока цена"
                value="-price"
                isSelected={sort === '-price'}
                onRadioChange={handleSort}
                groupName="sort"
              />
            </div>
            <HR className={classes.hr} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Сортирай</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Filters
