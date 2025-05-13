import { Resend } from 'resend'
import { PayloadHandler } from 'payload/config'
import ConfirmOrderEmailTemplate from '../components/email-templates/confirm-order-template'
import NewOrderEmailTemplate from '../components/email-templates/new-order-template'
import { Settings } from '../payload-types'
import { fetchHomepageSettings } from '../../app/_api/fetchGlobals'

export const sendMail: PayloadHandler = async (req: any, res: any): Promise<void> => {
  const { email, orderId } = req.body
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    let homeSettings: Settings | null = null
    try {
      homeSettings = await fetchHomepageSettings()
      console.log('Settings data:', homeSettings)
    } catch (settingsError) {
      console.error('Error fetching home settings:', settingsError)
    }

    const orderEmailRecipients = homeSettings?.newOrderEmails?.length
      ? homeSettings.newOrderEmails.map(item => item.Email).filter(Boolean)
      : process.env.OFFICE_EMAIL?.split(',').map(email => email.trim())

    const [confirmOrderEmail, newOrderEmail] = await Promise.all([
      resend.emails.send({
        from: 'Winetime <no-reply@winetime.bg>',
        to: email,
        subject: 'Потвърждение за поръчка',
        react: ConfirmOrderEmailTemplate({ orderId }),
      }),
      resend.emails.send({
        from: 'Winetime <no-reply@winetime.bg>',
        to: orderEmailRecipients || 'info@winetime.bg',
        subject: `Нова поръчка #${orderId}`,
        react: NewOrderEmailTemplate({ orderId }),
      }),
    ])

    // Both emails sent successfully
    res.status(200).json({
      message: 'Emails Sent',
      data: { confirmOrderEmail, newOrderEmail },
    })
  } catch (error) {
    console.error('Error sending emails:', error)
    const message = error instanceof Error ? error.message : 'Failed to send emails'
    res.status(500).json({ message })
  }
}
