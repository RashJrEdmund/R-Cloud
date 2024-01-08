const withPWA = require('next-pwa')({ // see package https://www.npmjs.com/package/next-pwa
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  // disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },

  cacheStartUrl: true, // weather to cache start url or not
  dynamicStartUrlRedirect: true, // if your start url returns different HTML document under different state (such as logged in vs. not logged in), this should be set to true
  register: true,
  // scope: '/app',
  sw: 'service-worker.js', // an alias for service worker file outputs.
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...withPWA,
};

module.exports = nextConfig;
