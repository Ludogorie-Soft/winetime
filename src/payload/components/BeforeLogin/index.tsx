import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Добре дошли в админ панела!</b>
        {' Тук админите се вписват за да оправляват магазина. Клиентите е нужно '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>да се впишат</a>
        {' за да достъпят акунта своя акаунт.'}
      </p>
    </div>
  )
}

export default BeforeLogin
