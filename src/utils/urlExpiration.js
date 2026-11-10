// The query parameters of a signed storage URL that give when it was signed and for how many seconds it is valid: S3's,
// Files.com's and Google Cloud Storage's.
const SIGNED_URL_VALIDITIES = [
  ['x-amz-date', 'x-amz-expires'],
  ['x-files-date', 'x-files-expires'],
  ['x-goog-date', 'x-goog-expires'],
]

// A time a signature gives, in milliseconds: in the basic ISO 8601 form signatures use, such as 20261019T120000Z, or in
// any form Date.parse() reads; or null.
const signedTimeOf = value => {
  const basic = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value ?? '')

  if (basic) {
    const [year, month, day, hours, minutes, seconds] = basic.slice(1).map(Number)
    return Date.UTC(year, month - 1, day, hours, minutes, seconds)
  }

  const time = Date.parse(value ?? '')
  return Number.isFinite(time) ? time : null
}

// When a signed URL expires, in milliseconds, by its own query: its signing time plus its seconds, or, for an Azure
// shared access signature, its se; the earliest, when it gives several; or null when it gives none.
const signedUrlExpiryOf = url => {
  let query
  try {
    query = [...new URL(url).searchParams.entries()]
  } catch {
    return null
  }

  const parameter = name => query.find(([key]) => key.toLowerCase() === name)?.[1] ?? null
  const expiries = SIGNED_URL_VALIDITIES.map(([dateName, secondsName]) => {
    const signedAt = signedTimeOf(parameter(dateName))
    const seconds = parameter(secondsName) ?? ''

    return signedAt !== null && /^\d+$/.test(seconds) ? signedAt + Number(seconds) * 1000 : null
  })

  if (parameter('sig') !== null) {
    expiries.push(signedTimeOf(parameter('se')))
  }

  const known = expiries.filter(expiry => expiry !== null)
  return known.length > 0 ? Math.min(...known) : null
}

/**
 * Returns the earliest known expiration in epoch milliseconds, or null when unknown.
 * expires is an optional ISO date-time supplied by the API. This only reads the URL;
 * it does not validate its signature or obtain a replacement URL.
 */
const getUrlExpiration = (url, expires) => {
  const given = typeof expires === 'string' ? Date.parse(expires) : NaN
  const known = [Number.isFinite(given) ? given : null, signedUrlExpiryOf(url)].filter(expiry => expiry !== null)

  return known.length > 0 ? Math.min(...known) : null
}

/** Whether a known expiration is at or before the local clock. Unknown is false, not proof of validity. */
const isUrlExpired = (url, expires) => {
  const expiry = getUrlExpiration(url, expires)
  return expiry !== null && expiry <= Date.now()
}

export { getUrlExpiration, isUrlExpired }
