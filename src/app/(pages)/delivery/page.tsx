import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'
import { GoPackageDependents } from 'react-icons/go'

import classes from './index.module.scss'

export const dynamic = 'force-dynamic'

export default function Delivery() {
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center">
            <GoPackageDependents style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Доставка</h3>
          </div>
          <HR />

          <p>
            Доставките на територията на България извършваме чрез услугите на куриерска фирма{' '}
            <a href="https://www.speedy.bg/public/bg" style={{ fontWeight: 'bold' }}>
              Speedy
            </a>
            .
          </p>
          <br />
          <h4 className="text-lg font-bold">Колко струва доставката?</h4>
          <p>Ако вашата поръчка е до поискване в офис на куриера, важат следните условия:</p>
          <ul>
            <li className={classes.listItem}>
              Цената за доставка на 1 бутилка е <b>6,00 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 2 бутилки е <b>6,30 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 3 бутилки е <b>7,40 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 4 или 5 бутилки е <b> 10,00 лв</b>.
            </li>
            <li className={classes.listItem}>
              Поръчки на стойност над <b>99 лв</b> се доставят напълно <b>БЕЗПЛАТНО</b>.
            </li>
          </ul>
          <br />
          <p>Ако вашата поръчка е до точен адрес, важат следните условия:</p>
          <ul>
            <li className={classes.listItem}>
              Цената за доставка на 1 бутилка е <b>6,60 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 2 бутилки е <b>8,00 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 3 бутилки е <b>9,00 лв</b>.
            </li>
            <li className={classes.listItem}>
              Цената за доставка на 4 или 5 бутилки е <b>11,00 лв</b>.
            </li>
            <li className={classes.listItem}>
              Поръчки на стойност над <b>99 лв</b> се доставят напълно <b>БЕЗПЛАТНО</b>.
            </li>
          </ul>
          <br />
          <h4 className="text-lg font-bold">Кога ще изпратите поръчката ми?</h4>
          <p>
            Обикновено обработването и изпращането на вашата поръчка се случва в рамките на 1
            работен ден.
          </p>
          <br />
          <h4 className="text-lg font-bold">Колко време отнема доставката?</h4>
          <p>Доставката стандартно отнема 1 работен ден. (Speedy СТАНДАРТ 24 часа)</p>
          <br />
          <h4 className="text-lg font-bold">Мога ли да проследя поръчката си?</h4>
          <p>
            В момента, в който заявим поръчката ви на куриера, получавате мейл с линк към вашата
            товарителница.
          </p>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}
