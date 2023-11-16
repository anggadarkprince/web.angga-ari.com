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
    }
}

module.exports = nextConfig
