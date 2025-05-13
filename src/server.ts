import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import express from 'express'
import payload from 'payload'
import cron from 'node-cron'
import { updateProducts } from './updateProducts'
import nodemailer from 'nodemailer'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3000

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    email: {
      transport: nodemailer.createTransport({
        host: 'smtp.resend.com', 
        port: 587, 
        auth: {
          user: 'resend', 
          pass: process.env.RESEND_API_KEY, 
        },
      }),
      fromName: 'WineTime Password Reset',
      fromAddress: 'no-reply@winetime.bg', 
    },
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
      try {
        await updateProducts()
      } catch (error) {
        console.error('Failed to update products:', error)
      }

      cron.schedule('0 2 * * *', async () => {
        console.log('Running scheduled product update at 2 AM...')
        try {
          await updateProducts()
        } catch (error) {
          console.error('Failed to update products:', error)
        }
      })
    })
  })
}

start()
