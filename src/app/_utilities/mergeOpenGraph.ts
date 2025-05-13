import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Wine Time',
  title: 'Добре дошли в WineTime',
  description: 'Добре дошли в WineTime – вашият онлайн магазин за първокласни вина и сомелиерски вдъхновения. Насладете се на селекция от най-добрите италиански и световни вина, съчетани с експертни съвети и перфектни предложения за всяко събитие. WineTime – качеството винаги на първо място!',
  images: [
    {
      url: 'https://winetime.bg/wine-logo.png',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
