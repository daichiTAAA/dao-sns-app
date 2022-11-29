/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@ionic/react',
  '@ionic/core',
  '@ionic/react-router',
  '@stencil/core',
  'ionicons',
]);

module.exports = withTM({
  basePath: '',
  images: {
    domains: ['images.unsplash.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
});
