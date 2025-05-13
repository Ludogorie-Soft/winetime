import { Resend } from 'resend'
import { PayloadHandler } from 'payload/config'
import NewRequestEmailTemplate from '../components/email-templates/new-request-template'
import { Settings } from '../payload-types'
import { fetchHomepageSettings } from '../../app/_api/fetchGlobals'

export const sendRequest: PayloadHandler = async (req: any, res: any): Promise<void> => {
  const { reqId, name, wineSlug, email, wineName, wineQuantity, extraText } = req.body
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    let homeSettings: Settings | null = null
    try {
      homeSettings = await fetchHomepageSettings()
    } catch (settingsError) {
      console.error('Error fetching home settings:', settingsError)
    }

    const requestEmailRecipients = homeSettings?.requestProductEmails?.length
      ? homeSettings.requestProductEmails.map(item => item.Email).filter(Boolean)
      : process.env.OFFICE_EMAIL?.split(',').map(email => email.trim())

    const confirmOrderEmail = await resend.emails.send({
      from: 'Winetime <no-reply@winetime.bg>',
      to: requestEmailRecipients || 'info@winetime.bg',
      subject: `Нова заявка за ${wineName}`,
      react: NewRequestEmailTemplate({
        reqId,
        name,
        email,
        wineName,
        wineSlug,
        wineQuantity,
        extraText,
      }),
    })

    res.status(200).json({
      message: 'Emails Sent',
      data: { confirmOrderEmail },
    })
  } catch (error) {
    console.error('Error sending emails:', error)
    const message = error instanceof Error ? error.message : 'Failed to send emails'
    res.status(500).json({ message })
  }
}
