import Image from 'next/image'

import { Tabs } from '../../ui/tabs-animated'
import { Media, Product } from '../../../../payload/payload-types'
import { Button } from '../../Buttons/Button'
import { GiWineBottle } from 'react-icons/gi'

export function TabsBanner({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return null
  }

  const shuffleProducts = products => {
    if (products.length > 1) {
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[products[i], products[j]] = [products[j], products[i]]
      }
    }
    return products
  }

  const displayedProducts = shuffleProducts([...products]).slice(0, 4)

  const productTabs = displayedProducts.map((product: Product, index: number) => {
    const productImage = product.meta.image as Media
    const productImageUrl = `/media/${productImage.filename as string}`
    const productPath = `/products/${product.slug}`

    return {
      title: <GiWineBottle size={30} />,
      value: `product${index + 1}`,
      content: (
        <div className="flex flex-col md:flex-row gap-2 w-full overflow-hidden relative h-full rounded-2xl p-4 md:p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br  from-gray-300 to-gray-400">
          <div className="flex-1 flex flex-col justify-center items-center gap-5 sm:items-start">
            <p>{product.title}</p>
            <Button
              el="link"
              href={productPath}
              label="Разгледай"
              appearance="primary"
              invert={true}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <CardImageContent imageUrl={productImageUrl} />
          </div>
        </div>
      ),
    }
  })

  return (
    <section className="h-[450px] [perspective:1000px] relative b flex flex-col max-w-4xl mx-auto w-full items-start justify-start mb-20 p-6 lg:p-0">
      <div className="w-full mb-3 flex justify-center items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          <span className="text-red-500">Wine</span>Time избра за вас
        </h2>
      </div>
      <Tabs tabs={productTabs} />
    </section>
  )
}

const CardImageContent = ({ imageUrl }) => {
  return (
    <div className="relative w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72">
      <Image
        src={imageUrl}
        alt="product-image"
        fill
        className="object-contain object-center rounded-xl mx-auto"
      />
    </div>
  )
}
