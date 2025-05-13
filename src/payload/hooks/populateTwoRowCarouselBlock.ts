import type { AfterReadHook } from 'payload/dist/collections/config/types';
import type { Page, Product } from '../payload-types';

export const populateTwoRowCarouselBlock: AfterReadHook = async ({
  doc,
  context,
  req: { payload },
}) => {
  const layoutWithPopulatedCarousel = await Promise.all(
    doc.layout.map(async block => {
      if (block.blockType === 'twoRowCarousel') {
        const twoRowCarouselBlock = block as Extract<Page['layout'][0], { blockType: 'twoRowCarousel' }>;

        const carousels = ['firstCarousel', 'secondCarousel'] as const;

        for (const carouselKey of carousels) {
          const carousel = twoRowCarouselBlock[carouselKey];

          if (carousel.populateBy === 'collection' && !context.isPopulatingTwoRowCarouselBlock) {
            const where: any = {};

            where.visible = { equals: true }

            if (carousel.categories?.length) {
              where.categories = {
                in: carousel.categories.map(cat => (typeof cat === 'string' ? cat : cat.id)),
              };
            }

            if (carousel.brands?.length) {
              where.brands = {
                in: carousel.brands.map(brand => (typeof brand === 'string' ? brand : brand.id)),
              };
            }

            if (carousel.sorts?.length) {
                where.sorts = {
                  in: carousel.sorts.map(sort => (typeof sort === 'string' ? sort : sort.id)),
                };
              }
              
              if (carousel.regions?.length) {
                where.regions = {
                  in: carousel.regions.map(region => (typeof region === 'string' ? region : region.id)),
                };
              }
              
              if (carousel.foods?.length) {
                where.foods = {
                  in: carousel.foods.map(food => (typeof food === 'string' ? food : food.id)),
                };
              }
              
              if (carousel.spirts?.length) {
                where.spirts = {
                  in: carousel.spirts.map(spirt => (typeof spirt === 'string' ? spirt : spirt.id)),
                };
              }

            if (carousel.priceLimit) {
              where.price = { less_than_equal: carousel.priceLimit };
            }

            if (carousel.priceOver) {
                where.price = { greater_than_equal: carousel.priceOver };
            }

            if (carousel.showOnlyDiscountedProducts) {
              where.discountPrice = { greater_than: 0 };
            }

            if (carousel.quantityOverZero) {
              where.quantity = { greater_than: 0 };
            }

            const res: { totalDocs: number; docs: Product[] } = await payload.find({
              collection: carousel.relationTo || 'products',
              limit: carousel.limit || 10,
              context: {
                isPopulatingTwoRowCarouselBlock: true,
              },
              where,
              sort: '-publishedOn',
            });
            
            twoRowCarouselBlock[carouselKey] = {
              ...carousel,
              populatedDocsTotal: res.totalDocs,
              populatedDocs: res.docs.map((thisDoc: Product) => ({
                relationTo: carousel.relationTo,
                value: thisDoc.id,
              })),
            };
          } else if (carousel.populateBy === 'selection' && carousel.selectedDocs?.length) {
            const productIds = carousel.selectedDocs.map(doc => (typeof doc === 'string' ? doc : doc.id));

            const res: { docs: Product[] } = await payload.find({
              collection: 'products',
              limit: 0,
              where: {
                id: { in: productIds },
              },
            });
            
            twoRowCarouselBlock[carouselKey] = {
              ...carousel,
              populatedDocsTotal: res.docs.length,
              populatedDocs: res.docs.map((thisDoc: any) => ({
                relationTo: 'products',
                value: thisDoc,
              })),
            };
          }
        }

        return twoRowCarouselBlock;
      }

      return block;
    })
  );

  return {
    ...doc,
    layout: layoutWithPopulatedCarousel,
  };
};
