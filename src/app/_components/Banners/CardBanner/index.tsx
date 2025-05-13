import { Gutter } from '../../ui-components/Gutter'

export default function CardBanner() {
  return (
    <Gutter>
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Winetime - единствената италианска енотека в България
          </h1>
          <p className="mt-4 text-lg">
            Разгледай внимателно подбраните от нас италиански вина на най-добра цена онлайн и
            разкрий множеството вкусове на слънчева Италия.
          </p>
        </div>
      </div>
    </Gutter>
  )
}
