import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { customerProxy } from './endpoints/customer'
import { createStripeCustomer } from './hooks/createStripeCustomer'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { CustomerSelect } from './ui/CustomerSelect'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      bg: 'Потребител',
    },
    plural: {
      en: 'Users',
      bg: 'Потребители',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'phone'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`;

        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Your Password</title>
              <style>
                  body {
                      font-family: 'Georgia', serif;
                      line-height: 1.6;
                      color: #333;
                      background-color: #f9f5f2;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      background-color: #fff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1);
                  }
                  .header {
                      background-color: #dc2626;
                      color: #fff;
                      padding: 20px;
                      text-align: center;
                  }
                  .content {
                      padding: 30px;
                  }
                  h1 {
                      margin: 0;
                      font-size: 28px;
                      font-weight: normal;
                  }
                  .btn {
                      display: inline-block;
                      background-color: #dc2626;
                      color: #fff;
                      text-decoration: none;
                      padding: 12px 24px;
                      border-radius: 4px;
                      font-weight: bold;
                      margin-top: 20px;
                  }
                  .footer {
                      background-color: #f1e8e8;
                      color: #666;
                      text-align: center;
                      padding: 10px;
                      font-size: 12px;
                  }
                  .wine-glass {
                      font-size: 48px;
                      margin-bottom: 10px;
                  }
              </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="wine-glass">🍷</div>
                <h1>Време е да възстановим вашата парола</h1>
              </div>
              <div class="content">
                <p>Уважаеми ${user["email"]},</p>
                <p>Чухме, че сте загубили паролата си. Няма проблем! Подготвихме специален имейл за вас, за да нулирате паролата си.</p>
                <p>Както при добро вино, сигурността на вашия акаунт се подобрява с времето. Кликнете върху бутона по-долу, за да промените паролата си</p>
                <p style="text-align: center;">
                  <a href="${resetPasswordURL}" class="btn">Нулирай Моята Парола</a>
                </p>
                <p>Ако не сте заявявали тази нулиране, моля игнорирайте този имейл. Вашият акаунт е все още е в безопасност.</p>
                <p>Наздраве,<br>Екипът за сигурност, който обича вино</p>
              </div>
              <div class="footer">
                <p>Този имейл е изпратен с любов и нотка танини. Моля, пийте отговорно и разглеждайте сигурно.</p>
              </div>
            </div>
          </body>
          </html>
        `;
      }
    }
  },
  endpoints: [
    {
      path: '/:teamID/customer',
      method: 'get',
      handler: customerProxy,
    },
    {
      path: '/:teamID/customer',
      method: 'patch',
      handler: customerProxy,
    },
  ],
  fields: [
    {
      name: 'name',
      label: {
        en: 'Name',
        bg: 'Име',
      },
      type: 'text',
    },
    {
      name: 'phone',
      label: {
        en: 'Phone Number',
        bg: 'Телефонен номер',
      },
      type: 'text',
      validate: (value) => {
      if (!value) {
        return true; 
      }

      const phoneRegex = /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;

      if (!phoneRegex.test(value)) {
        return 'Invalid phone number format';
      }

      return true;
    },
    },
    {
      name: 'roles',
      label: {
        en: 'Roles',
        bg: 'Права',
      },
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: {
            en: 'admin',
            bg: 'admin',
          },
          value: 'admin',
        },
        {
          label: {
            en: 'customer',
            bg: 'потребител',
          },
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'purchases',
      label: {
        en: 'Purchases',
        bg: 'Покупки',
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      name: 'stripeCustomerID',
      label: 'Stripe Customer',
      hidden: true,
      type: 'text',
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: CustomerSelect,
        },
      },
    },
    {
      label: {
        en: 'Cart',
        bg: 'Количка',
      },
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: {
            en: 'Items',
            bg: 'Артикули',
          },
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              label: {
                en: 'Product',
                bg: 'Пордукт',
              },
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              label: {
                en: 'Quantity',
                bg: 'Количество',
              },
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
    {
      label: {
        en: 'Favourites',
        bg: 'Любими',
      },
      name: 'favourites',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: {
            en: 'Items',
            bg: 'Артикули',
          },
          type: 'array',
          interfaceName: 'FavouriteItems',
          fields: [
            {
              name: 'product',
              label: {
                en: 'Product',
                bg: 'Пордукт',
              },
              type: 'relationship',
              relationTo: 'products',
            },
          ],
        },
      ],
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      hidden: true,
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
  timestamps: true,
}

export default Users
