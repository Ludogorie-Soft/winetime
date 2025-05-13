import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import TransitonLayout from '../../_components/TransitionLayout'
import { MapPin } from 'lucide-react'
import { LuPizza } from 'react-icons/lu'
import { IoMdGlobe } from 'react-icons/io'
import { Region } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'
import RegionCard from '../../_components/Cards/RegionCard'
import { HR } from '../../_components/ui-components/HR'

import classes from './index.module.scss'

const Regions = async () => {
  let regions: Region[] | null = null

  try {
    regions = await fetchDocs<Region>('regions')
  } catch (error) {
    console.log(error)
  }

  const otherRegions = regions?.filter(region => region.otherRegion === true)
  const primaryRegions = regions?.filter(region => region.otherRegion === false)

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center">
            <MapPin style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Региони</h3>
          </div>
          <HR />
          <div className="flex justify-center gap-4 items-center mb-6">
            <LuPizza style={{ width: '36px', height: '36px' }} />
            <h3 className="text-2xl leading-10 font-normal">ИТАЛИАНСКИ РЕГИОНИ</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryRegions?.map((region: Region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
          <HR />
          <div className="flex justify-center gap-4 items-center mb-6">
            <IoMdGlobe style={{ width: '36px', height: '36px' }} />
            <h3 className="text-2xl leading-10 font-normal">ДРУГИ ВИНЕНИ РЕГИОНИ</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {otherRegions?.map((region: Region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export default Regions
