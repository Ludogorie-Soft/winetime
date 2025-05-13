import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import TransitonLayout from '../../_components/TransitionLayout'
import { Beef } from 'lucide-react'

import classes from './index.module.scss'
import { Food } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'
import FoodCard from '../../_components/Cards/FoodCard'
import { HR } from '../../_components/ui-components/HR'

const Foods = async () => {
  let foods: Food[] | null = null

  try {
    foods = await fetchDocs<Food>('foods')
  } catch (error) {
    console.log(error)
  }
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center">
            <Beef style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Храни</h3>
          </div>
          <HR />
          <div className="flex flex-wrap items-center justify-center gap-4">
            {foods?.map((food: Food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export default Foods
