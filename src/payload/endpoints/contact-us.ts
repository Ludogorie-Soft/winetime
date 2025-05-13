import { Resend } from 'resend'
import { PayloadHandler } from 'payload/config'
import ContactFormTamplate from '../components/email-templates/contact-form-template'
import { Settings } from '../payload-types'
import { fetchHomepageSettings } from '../../app/_api/fetchGlobals'

export const contactFrom: PayloadHandler = async (req: any, res: any): Promise<void> => {
  const { name, email, text } = req.body
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    let homeSettings: Settings | null = null
    try {
      homeSettings = await fetchHomepageSettings()
    } catch (settingsError) {
      console.error('Error fetching home settings:', settingsError)
    }

    const contactEmailRecipients = homeSettings?.contactUsFormEmails?.length
      ? homeSettings.contactUsFormEmails.map(item => item.Email).filter(Boolean)
      : process.env.OFFICE_EMAIL?.split(',').map(email => email.trim())

    const data = await resend.emails.send({
      from: 'Contact Form Wine Time <no-reply@winetime.bg>',
      to: contactEmailRecipients || 'info@winetime.bg',
      subject: 'Заявка за контакт',
      react: ContactFormTamplate({ name: name, email: email, text: text }),
    })

    res.status(200).json({ message: 'Email Sent', data })
  } catch (error) {
    console.error('Error sending email:', error)
    const message = error instanceof Error ? error.message : 'Failed to send email'
    res.status(500).json({ message })
  }
}
