if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

if (!process.env.WORDPRESS_DOMAIN_REDIRECT) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_DOMAIN_REDIRECT.
  `);
}

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        // does not add /docs since basePath: false is set
        source: "/posts/:path*",
        has: [
          {
            type: 'query',
            key: 'fbclid',
          },
        ],
        destination: `${process.env.WORDPRESS_DOMAIN_REDIRECT}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
};
