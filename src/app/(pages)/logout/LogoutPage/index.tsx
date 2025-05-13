'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Успешно отписване.')
      } catch (_) {
        setError('Вече сте отписани.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'Какво искате да направите сега?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link
                  href={`/${productsPage.slug}`}
                  style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  Натистене тук
                </Link>
                {` за да продължите да пазарувате.`}
              </Fragment>
            )}
            {` За да се впишете отново, `}
            <Link href="/login" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
              Натистене тук
            </Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
