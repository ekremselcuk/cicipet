/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Optional: try enabling this if needed later
  async redirects() {
    return [
      {
        source: '/redirect-test',
        destination: 'https://google.com',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
