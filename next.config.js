// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true
// }

// module.exports = nextConfig

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const withPWA = require('next-pwa')
// const isProd = process.env.NODE_ENV === 'production'

// module.exports = withPWA({
//   // next.js config
//   pwa: {
//     dest: 'public',
//     disable: !isProd
//   }
// })

// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtimeCaching = require('next-pwa/cache')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/]
})

const nextConfig = withPWA({
  // next config
})
module.exports = nextConfig
