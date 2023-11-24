export const prod = process.env.NODE_ENV === 'production'
export const baseUrl = prod ? process.env.NEXTAUTH_URL : (process.env.VERCEL_URL ?? process.env.NEXTAUTH_URL)