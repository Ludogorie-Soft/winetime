import { NextResponse } from 'next/server';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com';

async function fetchPaginatedProducts(): Promise<any[]> {
  const products: any[] = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    const response = await fetch(
      `${serverUrl}/api/products?limit=100&page=${page}&fields=slug,updatedAt`
    );
    const { docs, totalPages } = await response.json();

    products.push(...docs);
    hasMore = page < totalPages;
    page++;
  }

  return products;
}

export async function GET() {
  const [pagesRes, blogsRes, products] = await Promise.all([
    fetch(`${serverUrl}/api/pages`),
    fetch(`${serverUrl}/api/blog`),
    fetchPaginatedProducts(),
  ]);

  const { docs: pages } = await pagesRes.json();
  const { docs: blogs } = await blogsRes.json();

  const items = [
    ...pages.map((page: any) => ({
      url: `${serverUrl}/${page.slug === 'home' ? '' : page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'daily',
      priority: 1.0,
    })),
    ...products.map((product: any) => ({
      url: `${serverUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'daily',
      priority: 1.0,
    })),
    ...blogs.map((blog: any) => ({
      url: `${serverUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: 'daily',
      priority: 0.8,
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map((item) => {
    const lastModISO = new Date(item.lastModified).toISOString();

    return `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${lastModISO}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>
  `;
  })
  .join('')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
