import { PRODUCT_BRANDS } from './brands'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const HEADER = `
  Header {
    promotionBanner
  }
`

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`

export const FOOTER = `
  Footer {
    copyright
    phone
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`

export const SETTINGS = `
  Settings {
    productsPage {
      slug
    }
  }
`

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`

export const HOMESETTINGS = `
  Settings {
    indexPage {
      slug
    }
    newOrderEmails {
      Email
    }
    requestProductEmails {
      Email
    }
    contactUsFormEmails {
      Email
    }
  }
`

export const HOMESETTINGS_QUERY = `
query Settings {
  ${HOMESETTINGS}
}
`
