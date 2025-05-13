import type { MetadataRoute } from 'next';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchPaginatedProducts(): Promise<any[]> {
  const products = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    const { docs, totalPages } = await fetch(
      `${serverUrl}/api/products?limit=100&page=${page}&fields=slug,updatedAt`
    ).then((res) => res.json());

    products.push(...docs);
    hasMore = page < totalPages;
    page++;
  }

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: pages } = await fetch(`${serverUrl}/api/pages`).then((res) => res.json());
  const { docs: blogs } = await fetch(`${serverUrl}/api/blog`).then((res) => res.json());
  const products = await fetchPaginatedProducts();

  const sitemap: MetadataRoute.Sitemap = [
    ...pages.map((page) => ({
      changeFrequency: 'daily',
      lastModified: page.updatedAt,
      priority: 1,
      url: `${serverUrl}/${page.slug === 'home' ? '' : page.slug}`,
    })),
    ...products.map((product) => ({
      changeFrequency: 'daily',
      lastModified: product.updatedAt,
      priority: 1,
      url: `${serverUrl}/products/${product.slug}`,
    })),
    ...blogs.map((blog) => ({
      changeFrequency: 'daily',
      lastModified: blog.updatedAt,
      priority: 0.8,
      url: `${serverUrl}/blog/${blog.slug}`,
    })),
  ];

  return sitemap;
}
