/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "angga-ari.com",
                pathname: "**"
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/manage',
                destination: '/manage/dashboard',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
