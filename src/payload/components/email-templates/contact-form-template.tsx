import * as React from 'react'

interface ContactFormProps {
  name?: string
  email?: string
  text?: string
}

export const ContactFormTamplate: React.FC<Readonly<ContactFormProps>> = ({
  name,
  email,
  text,
}) => (
  <div>
    <h1>
      Заяква за контакт от {name} със емаил {email}
    </h1>
    <h2>
      Текст:
      {text}
    </h2>
  </div>
)

export default ContactFormTamplate
