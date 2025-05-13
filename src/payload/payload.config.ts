import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { payloadCloud } from '@payloadcms/plugin-cloud'
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
// import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateDescription } from '@payloadcms/plugin-seo/types'
import stripePlugin from '@payloadcms/plugin-stripe'
import { slateEditor } from '@payloadcms/richtext-slate' // editor-import
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories/Categories'
import Brands from './collections/Brands/Brands'
import GlassTypes from './collections/GlassTypes/GlassTypes'
import Foods from './collections/Foods/Foods'
import Regions from './collections/Regions/Regions'
import Sorts from './collections/Sorts/Sorts'
import { Media } from './collections/Media/Media'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import Products from './collections/Products'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { sendMail } from './endpoints/send-email'
import { sendRequest } from './endpoints/send-request'
import { contactFrom } from './endpoints/contact-us'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'
import CustomDashboardIcon from './components/CustomDashboardIcon/CustomDashboardIcon'
import Spirts from './collections/Spirts/Spirts'
import Requests from './collections/Requests/Requests'
import Blog from './collections/Blog/Blog'
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import Tags from './collections/Tags/Tags'
import OtherCategories from './collections/OtherCategories/OtherCategories'

const generateTitle: GenerateTitle = async (doc) => {
  try {
    const response = await fetch(`https://n8n.ssgs.cloud/webhook/5832a8ac-459b-45c8-947a-b8ec64566ae3?method=title&name=${doc?.publishedDoc?.title}`);
    const responseBody = await response.text();

    if (response.ok) {
      const data = JSON.parse(responseBody);
      let title = data?.message?.content || 'Wine Time';
      // Remove surrounding double quotes if they exist
      title = title.replace(/^"(.*)"$/, '$1');
      return title;
    } else {
      console.error('Error fetching title:', response.statusText);
      return 'Wine Time';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Wine Time';
  }
};

const generateDescription: GenerateDescription = async (doc) => {
  try {
    const response = await fetch(`https://n8n.ssgs.cloud/webhook/5832a8ac-459b-45c8-947a-b8ec64566ae3?method=description&name=${doc?.publishedDoc?.title}`);
    const responseBody = await response.text();

    if (response.ok) {
      const data = JSON.parse(responseBody);
      return data?.message?.content || 'Wine Time';
    } else {
      console.error('Error fetching description:', response.statusText);
      return 'Wine Time';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Wine Time';
  }
};

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['blog', 'products']
    },
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
      graphics: {
        Icon: CustomDashboardIcon,
        Logo: CustomDashboardIcon,
      },
    },
    
    
    webpack: config => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/seed')]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
            '@': path.resolve(__dirname),
          },
        },
      }
    },
  },
  editor: slateEditor({}), // editor-config
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Products, Orders, Requests, Categories, Spirts, OtherCategories, Brands, GlassTypes, Sorts, Regions, Foods, Tags, Blog, Media, Pages, Users],
  globals: [Settings, Header, Footer],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  endpoints: [
    {
      path: '/create-payment-intent',
      method: 'post',
      handler: createPaymentIntent,
    },
    {
      path: '/send-mail',
      method: 'post',
      handler: sendMail,
    },
    {
      path: '/send-request',
      method: 'post',
      handler: sendRequest,
    },
    {
      path: '/contact-us',
      method: 'post',
      handler: contactFrom,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: customersProxy,
    },
    {
      path: '/stripe/products',
      method: 'get',
      handler: productsProxy,
    },
  ],
  plugins: [
    // formBuilder({}),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      rest: false,
      webhooks: {
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      },
    }),
    // redirects({
    //   collections: ['pages', 'products'],
    // }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'products', 'blog'],
      generateTitle,
      generateDescription,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
    cloudStorage({
      collections: {
        media: {
          adapter: s3Adapter({
            config: {
              forcePathStyle: true,
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],
})
