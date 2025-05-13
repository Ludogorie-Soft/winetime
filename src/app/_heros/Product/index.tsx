'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../_providers/Auth'
import { Product, Media, Food } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/Buttons/AddToCartButton'
import { AddToFavouritesButton } from '../../_components/Buttons/AddToFavouritesButton'
import { Gutter } from '../../_components/ui-components/Gutter'
import Image from 'next/image'
import { Price } from '../../_components/Price'
import { useFilter } from '../../_providers/Filter'
import RichText from '../../_components/ui-components/RichText'
import { TypographyH3 } from '../../_components/typography/typography-h3'
import { Card } from '../../_components/ui/card'
import { TbTruckDelivery } from 'react-icons/tb'
import { formatDateBG, getDeliveryDate, getDeliveryDate2 } from '../../_utilities/deliveryDate'
import {
  CarouseDetailslItem,
  Carousel,
  CarouselApi,
  CarouselDetailsContent,
} from '../../_components/ui/carousel'
import { toast } from 'sonner'
import { Input } from '../../_components/ui-components/Input'
import { TextArea } from '../../_components/ui-components/Textarea'
import { Button } from '../../_components/Buttons/Button'
import { FaWpforms } from 'react-icons/fa'
import classes from './index.module.scss'
import { DiscountPrice } from '../../_components/DiscountPrice'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../_components/ui/dialog'
import { useForm } from 'react-hook-form'
import { HR } from '../../_components/ui-components/HR'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../_components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../_components/ui/tooltip'
import { LuGrape } from 'react-icons/lu'
import Link from 'next/link'
import FoodCard from '../../_components/Cards/FoodCard'

type EmailData = {
  reqId: string
  name: String
  email: string
  wineName: string
  wineSlug: string
  wineQuantity: number
  extraText: string
}

type FormData = {
  name: string
  email: string
  wineName: string
  wineQuantity: number
  text: string
}

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
  } = useFilter()

  const {
    title,
    categories,
    spirts,
    quantity,
    richText,
    media,
    meta,
    brands = {},
    glassTypes = {},
  } = product

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isDialogOpen, setDialogOpen] = useState(false)

  const brandTitle = (brands as any).title

  const testImage = meta.image as Media
  const metaImagePath = meta && meta.image ? `/media/${testImage.filename as string}` : null

  const brandImage = (brands as any).media as Media
  const brandImagePath = (brands as any).media ? `/media/${brandImage.filename as string}` : null
  const brandAltText = (brands as any).media ? `/media/${brandImage.alt as string}` : null

  const brandRichText = (brands as any).richText
  const glassTypesRichText = glassTypes && (glassTypes as any).richText
  
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const deliveryDate = getDeliveryDate()
  const formattedDeliveryDate = formatDateBG(deliveryDate)

  const allImagesPaths = media ? media.map((m: any) => `/media/${m.upload.filename as any}`) : []

  if (metaImagePath) {
    allImagesPaths.unshift(metaImagePath)
  }

  const closeDialog = () => setDialogOpen(false)

  const confirmMail = async (emailData: EmailData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/send-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
  
      const responseData = await response.json()
      return responseData
    } catch (error) {
      console.error('Error sending email:', error)
      throw error // Rethrow to handle the error in OnSubmit
    }
  }
  
  const OnSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Send the order request
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            wineName: data.wineName,
            wineQuantity: data.wineQuantity,
            addMore: data.text,
          }),
        })
  
        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Нещо се обърка.')
  
        const { error: errorFromRes, doc } = await orderReq.json()
  
        if (errorFromRes) throw new Error(errorFromRes)
  
        await confirmMail({
          reqId: doc.id,
          name: data.name,
          email: data.email,
          wineName: data.wineName,
          wineSlug: product.slug,
          wineQuantity: data.wineQuantity,
          extraText: data.text,
        })
  
        toast.success(`Успешно изпратихте вашето запитване!`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })
  
        reset() // Reset the form
  
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Нещо се обърка.'
        toast.error(`Грешка при заявка: ${msg}`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })
      }
    },
    [reset]
  )

  return (
    <Gutter>
      <div className={classes.productHero}>
        <Carousel setApi={setApi} className="w-full">
          <CarouselDetailsContent>
            {allImagesPaths.map((imagePath, index) => (
              <CarouseDetailslItem key={index}>
                <div className={`${classes.mediaWrapper} min-h-[50vh] md:min-h-[70vh]`}>
                  {!imagePath && <div className={classes.placeholder}>No image</div>}
                  {imagePath && (
                    <Image
                      src={imagePath}
                      alt={`Product Image ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      placeholder="blur"
                      blurDataURL={'assets/icons/placeholder.svg'}
                      loading="lazy"
                    />
                  )}
                </div>
              </CarouseDetailslItem>
            ))}
            <div className="absolute z-10 right-0 top-[3.3%] mid:top-[4%]">
              <AddToFavouritesButton product={product} />
            </div>
            {product.isChosen && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="absolute bottom-[80px] left-[28px]">
                      <Image src="/wine-icon.svg" alt="Bio" width={100} height={100} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Winetime препоръчва</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {product.isHomemade && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="absolute bottom-[44px] left-[24px]">
                      <LuGrape style={{ width: '28px', height: '28px', color: 'purple' }} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Занаятчийски продукт</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {product.isBio && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="absolute bottom-[8px] left-[20px]">
                      <Image src="/assets/icons/bio.svg" alt="Bio" width={35} height={35} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Био Продукт</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CarouselDetailsContent>
          {/* <div className="flex items-center justify-center gap-3 mt-2.5">
            <div className="flex items-center justify-center gap-1">
              <CarouselStaticPrevious />
              <CarouselStaitcNext />
            </div>
            <div className="flex items-center justify-center py-2 text-center text-sm text-muted-foreground">
              {current} / {count}
            </div>
          </div> */}
        </Carousel>

        <div className="flex flex-col mt-2">
          <div className="flex flex-col items-center justify-center">
            <TypographyH3 text={title} />

            <Link href={`/brands/${(product?.brands as any)?.id}`}>
              <h4 className="max-w-full uppercase m-0 text-xs font-semibold whitespace-nowrap text-blue-500 overflow-hidden truncate">
                {(product.brands as any).title}
              </h4>
            </Link>
          </div>

          {/* <p className={`${quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {quantity > 0 ? 'Налично' : 'Изчепан'}
          </p> */}

          <div className="mt-2 text-center">
            {product.discountPrice ? (
              <div className="flex gap-2 items-center justify-center">
                <div className="line-through text-gray-500">
                  <Price product={product} button={false} colored={true} bigPrice={true} />
                </div>
                <DiscountPrice product={product} button={false} bigPrice={true} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Price product={product} button={false} colored={true} bigPrice={true} />
              </div>
            )}
          </div>

          {product.quantity > 0 && (
            <div className="mt-4 w-full">
              <AddToCartButton product={product} className="mt-4 w-full" />
            </div>
          )}

          {(product.quantity == 0 || !product.quantity) && (
            <div className="mt-4 w-full">
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className={classes.buttonRequest}>Заявка</div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex justify-start gap-4 items-center mb-2">
                      <FaWpforms style={{ width: '36px', height: '36px' }} />
                      <h3 className="text-3xl leading-10 font-normal">Форма за заявка за вино</h3>
                    </div>
                    <HR />
                    <div className="flex flex-col items-center w-full">
                      <div className="w-full p-2">
                        <form onSubmit={handleSubmit(OnSubmit)} className={classes.form}>
                          <Input
                            name="name"
                            label="Име:"
                            required
                            register={register}
                            error={errors.name}
                            type="text"
                            defaultValue={user?.name}
                          />
                          <Input
                            name="email"
                            label="Емайл:"
                            required
                            register={register}
                            error={errors.email}
                            type="email"
                            defaultValue={user?.email}
                          />
                          <Input
                            name="wineName"
                            label="Име на виното:"
                            required
                            register={register}
                            error={errors.wineName}
                            type="text"
                            defaultValue={product.title}
                          />
                          <Input
                            name="wineQuantity"
                            label="Количество:"
                            required
                            register={register}
                            error={errors.wineQuantity}
                            type="number"
                          />
                          <TextArea
                            name="text"
                            label="Съобщение:"
                            register={register}
                            error={errors.text}
                          />
                          <div className={classes.actions}>
                            <Button label="Начало" href="/" appearance="secondary" />
                            <Button
                              label="Изпрати"
                              type="submit"
                              onClick={closeDialog}
                              appearance="primary"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="flex align-center justify-start mt-4 gap-2">
            <TbTruckDelivery className="h-6 w-6" />
            <p>
              <strong>Очаквана доставка: </strong>
              {formattedDeliveryDate}
            </p>
          </div>

          <div className="flex align-center justify-start mt-4 gap-2">
            <p>
              {product.wineColor && (
                <h4>
                  <strong>Цвят: </strong>
                  <span>{product.wineColor}</span>
                </h4>
              )}
              {product.wineAroma && (
                <h4>
                  <strong>Аромат: </strong>
                  <span>{product.wineAroma}</span>
                </h4>
              )}
              {product.wineTaste && (
                <h4>
                  <strong>Вкус: </strong>
                  <span>{product.wineTaste}</span>
                </h4>
              )}

              {product.regions && product.regions.length > 0 && (
                <h4>
                  <strong>Регион: </strong>
                  {product.regions.map((region: any, index: number) => (
                    <React.Fragment key={index}>
                      <Link
                        href="/products"
                        onClick={() => {
                          setCategoryFilters([])
                          setSpirtsFilters([])
                          setBrandFilters([])
                          setRegionFilters([region.id])
                          setSortsFilters([])
                          setFoodsFilters([])
                        }}
                      >
                        <span className="text-blue-500">{region.title}</span>
                      </Link>
                      {index < product.regions.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </h4>
              )}
              {product.milliliters && (
                <h4>
                  <strong>Миллилитри: </strong>
                  <span>{product.milliliters.replace('_', '')} мл.</span>
                </h4>
              )}
              {product.sorts && product.sorts.length > 0 && (
                <h4>
                  <strong>Сорт: </strong>
                  {product.sorts.map((sort: any, index: number) => (
                    <React.Fragment key={index}>
                      <Link
                        href="/products"
                        onClick={() => {
                          setCategoryFilters([])
                          setSpirtsFilters([])
                          setBrandFilters([])
                          setRegionFilters([])
                          setSortsFilters([sort.id])
                          setFoodsFilters([])
                        }}
                      >
                        <span className="text-blue-500">{sort.title}</span>
                      </Link>
                      {index < product.sorts.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </h4>
              )}
              {product.alchoholPercentage && (
                <h4>
                  <strong>Алкохол: </strong>
                  <span>{product.alchoholPercentage}%</span>
                </h4>
              )}

              {categories && (
                <h4>
                  <strong>Категория: </strong>
                  <Link
                    href="/products"
                    onClick={() => {
                      setCategoryFilters([(categories as any).id])
                      setSpirtsFilters([])
                      setBrandFilters([])
                      setRegionFilters([])
                      setSortsFilters([])
                      setFoodsFilters([])
                    }}
                  >
                    <span className="text-blue-500">{(categories as any).title}</span>
                  </Link>
                </h4>
              )}

              {spirts && (
                <h4>
                  <strong>Категория: </strong>
                  <Link
                    href="/products"
                    onClick={() => {
                      setCategoryFilters([])
                      setSpirtsFilters([(spirts as any).id])
                      setBrandFilters([])
                      setRegionFilters([])
                      setSortsFilters([])
                      setFoodsFilters([])
                    }}
                  >
                    <span className="text-blue-500">{(spirts as any).title}</span>
                  </Link>
                </h4>
              )}

              {product.wineClass && (
                <h4>
                  <strong>Клас: </strong>
                  <span className="uppercase">{product.wineClass}</span>
                </h4>
              )}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="description">
            <div className="mt-4 mb-4 underline">
              <TypographyH3 text="Описание" />
            </div>
          </TabsTrigger>
          <TabsTrigger value="brand">
            <div className="mt-4 mb-4 underline">
              <TypographyH3 text="За Производителя" />
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card className="p-6">
            <RichText content={richText} />
          </Card>
        </TabsContent>
        <TabsContent value="brand">
          <Card className="p-6">
          <TypographyH3 text={brandTitle} />
            <Image
              src={brandImagePath}
              alt={brandAltText}
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
              objectPosition="center"
            />
            <RichText content={brandRichText} />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {product.foods && product.foods.length > 0 && (
          <Card className="flex-1 p-6 mb-6 flex flex-col gap-2 text-l">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-normal items-center">Идеално за пиене с</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {(product.foods as Food[])?.map((food: Food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          </Card>
        )}

        {product.glassTypes && (
          <Card className="flex-1 p-6 mb-6 text-xl flex flex-col justify-start gap-4 items-center">
            <div className="w-full flex flex-col items-start justify-center">
              {product.wineTemperature && (
                <div className="w-full flex flex-col items-center md:items-start gap-2">
                  <h3 className="text-xl font-normal">Температура на сервиране</h3>
                  <h3 className="text-base text-gray-600 font-normal">{product.wineTemperature}</h3>
                </div>
              )}
              {product.glassTypes && (
                <div className="w-full flex flex-col items-center md:items-start gap-2">
                  <h3 className="text-xl font-normal">Чаша</h3>
                  <h3 className="text-base text-gray-600 font-normal">
                    {(product.glassTypes as any).title}
                  </h3>
                </div>
              )}
            </div>
            <div>
              <div className={classes.mediaGlassWrapper}>
                {product.glassTypes &&
                  typeof product.glassTypes !== 'string' &&
                  product.glassTypes.media && (
                    <Image
                      src={`/media/${(product.glassTypes.media as Media).filename}`}
                      alt={(product.glassTypes.media as Media).alt || 'Default Alt Text'}
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      placeholder="blur"
                      blurDataURL={'assets/icons/placeholder.svg'}
                      loading="lazy"
                    />
                  )}
              </div>
              {glassTypesRichText && <RichText content={glassTypesRichText} />}
            </div>
          </Card>
        )}
      </div>
    </Gutter>
  )
}
