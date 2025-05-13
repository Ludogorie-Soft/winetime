const policies = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    //Google
    'https://maps.googleapis.com',
    'https://*.googletagmanager.com',
    'https://googleads.g.doubleclick.net',
    'https://region1.analytics.google.com',
    'https://*.analytics.google.com',
    'https://pagead2.googlesyndication.com',
    'https://*.googlesyndication.com',
    'https://www.google.com',
    'https://*.google.com',
    'https://stats.g.doubleclick.net',
    //Consent Manager
    'https://cdn.priv.center',
    'https://prod-origin.truendo.com',
  ],
  'child-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': [
    "'self'", 
    'https://*.stripe.com', 
    'https://raw.githubusercontent.com', 
    'https://cdn.consentmanager.net', 
    'https://www.google.com', 
    'https://www.google.bg', 
    'https://b.delivery.consentmanager.net',
  ],
  'font-src': ["'self'", 'https://cdn.priv.center'],
  'frame-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    'https://hooks.stripe.com',
    'https://*.googletagmanager.com',
    'https://td.doubleclick.net',
    'https://region1.analytics.google.com',
    'https://*.analytics.google.com',
    'https://pagead2.googlesyndication.com',
    'https://*.googlesyndication.com',
    'https://www.google.com',
    'https://*.google.com',
    'https://stats.g.doubleclick.net',
  ],
  'connect-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://api.stripe.com',
    'https://maps.googleapis.com',
    'https://ee.econt.com',
    'https://n8n.ssgs.cloud',
    'https://*.googletagmanager.com',
    'https://region1.analytics.google.com',
    'https://region1.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.google-analytics.com',
    'https://pagead2.googlesyndication.com',
    'https://*.googlesyndication.com',
    'https://www.google.com',
    'https://*.google.com',
    'https://stats.g.doubleclick.net',
    //Consent manager
    'https://prod-origin.truendo.com',
    'https://prod-fra.truendo.com',
  ],
}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
