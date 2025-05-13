'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../../payload/payload-types'
import { inclusions, noHeaderFooterUrls } from '../../../constants'
import { Button } from '../../Buttons/Button'
import { Gutter } from '../../ui-components/Gutter'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { TypographyH3 } from '../../typography/typography-h3'
import { TypographyP } from '../../typography/typography-p'

import classes from './index.module.scss'
import { TypographyH4 } from '../../typography/typography-h4'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdDoneOutline } from 'react-icons/md'
import { LuWine } from 'react-icons/lu'
import { fetchFooter } from '../../../_api/fetchGlobals'

const FooterComponent = () => {
  const [footer, setFooter] = useState<Footer | null>(null)

  useEffect(() => {
    fetchFooter().then(setFooter).catch(console.log)
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  const pathname = usePathname()
  const navItems = footer?.navItems || []
  const phoneNumber = footer?.phone || []
  const phoneNumberTel = footer?.phone.replace('+359', '0').replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3') || []

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getIcons = icon => {
    switch (icon) {
      case 'icon2':
        return <TbTruckDelivery style={{ width: '50px', height: '50px' }} />
      case 'icon3':
        return <MdDoneOutline style={{ width: '50px', height: '50px' }} />
      case 'icon4':
        return <LuWine style={{ width: '50px', height: '50px' }} />
      default:
        return null
    }
  }

  const renderIconsFooter = () => (
    <div className={classes.wrap}>
      <TypographyP text={footer?.copyright} />

      <div className={classes.socialLinks}>
        {navItems.map(item => {
          const icon = item?.link?.icon as Media

          return (
            <Button
              key={item.link.label}
              el="link"
              href={item.link.url}
              newTab={true}
              className={classes.socialLinkItem}
            >
              <Image
                src={icon?.url}
                alt={item.link.label}
                width={24}
                height={24}
                className={classes.socialIcon}
              />
            </Button>
          )
        })}
      </div>
    </div>
  )

  const renderDesktopFooter = () => (
    <div className={classes.footerWholeWrap}>
      <div className={classes.footerInfromationTab}>
        <div className="flex justify-center items-center">
          <Link href="/" className="flex justify-center items-center">
            <Link href="/">
              {/* <h2 className="text-3xl font-bold">winetime</h2> */}
              <Image src="/wine-logo-white.svg" alt="logo" width={130} height={90} />
            </Link>
          </Link>
        </div>

        <div className={classes.infromationTab}>
          <div className={classes.buttonFooterTop}>
            <TypographyH4 text="ЗА КОМПАНИЯТА" />
          </div>

          <span>
            <Link href="/about-us" className={classes.buttonFooter}>
              История
            </Link>
          </span>

          <span>
            <Link href={`tel:${phoneNumber}`} className={classes.buttonFooter}>
              Телефон: {phoneNumberTel}
            </Link>
          </span>

          <span>
            <Link href="/contact-form" className={classes.buttonFooter}>
              Форма за контакт
            </Link>
          </span>
        </div>

        <div className={classes.infromationTab}>
          <div className={classes.buttonFooterTop}>
            <TypographyH4 text="ПОЛИТИКА" />
          </div>

          <span>
            <Link href="/delivery" className={classes.buttonFooter}>
              Доставка
            </Link>
          </span>

          <span>
            <Link href="/terms-policy" className={classes.buttonFooter}>
              Общи условия
            </Link>
          </span>

          <span>
            <Link href="/personal-data" className={classes.buttonFooter}>
              Лични данни
            </Link>
          </span>
        </div>
      </div>
      {renderIconsFooter()}
    </div>
  )

  const renderMobileFooter = () => (
    <div className={classes.mobileFooter}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="information">
          <AccordionTrigger>
            <TypographyH4 text="ЗА КОМПАНИЯТА" />
          </AccordionTrigger>
          <AccordionContent>
            <div className={classes.infromationTab}>
              <span className={classes.mobileText}>
                <Link href="/about-us" className={classes.buttonFooter}>
                  История
                </Link>
              </span>

              <span className={classes.mobileText}>
                <Link href={`tel:${phoneNumber}`} className={classes.buttonFooter}>
                  Телефон: {phoneNumberTel}
                </Link>
              </span>

              <span className={classes.mobileText}>
                <Link href="/contact-form" className={classes.buttonFooter}>
                  Форма за контакт
                </Link>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="aboutUs">
          <AccordionTrigger>
            <TypographyH4 text="ПОЛИТИКА" />
          </AccordionTrigger>
          <AccordionContent>
            <div className={classes.infromationTab}>
              <span className={classes.mobileText}>
                <Link href="/delivery" className={classes.buttonFooter}>
                  Доставка
                </Link>
              </span>

              <span className={classes.mobileText}>
                <Link href="/terms-policy" className={classes.buttonFooter}>
                  Общи условия
                </Link>
              </span>

              <span className={classes.mobileText}>
                <Link href="/personal-data" className={classes.buttonFooter}>
                  Лични данни
                </Link>
              </span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {renderIconsFooter()}
    </div>
  )

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map(inclusion => (
            <li key={inclusion.title} className={classes.listItem}>
              <div className={`${classes.listItemIcon} pointer-events-none`}>
                {getIcons(inclusion.iconType)}
              </div>

              <TypographyH3 text={inclusion.title} />
              <TypographyP text={inclusion.description} />
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>{isMobile ? renderMobileFooter() : renderDesktopFooter()}</Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
