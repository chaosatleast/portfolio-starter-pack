/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // In cases where the error had occurred because of a package you imported
        // and not because you’re explicitly trying to access a Node.js module,
        // you can modify like this
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            };
        }
        return config;

        // when webpack encounters an import for the fs module,
        //  it will not attempt to resolve the import,
        //  and the fs module will not be bundled with the application.
        // This allows the fs module to be loaded at runtime on the server-side,
        //  but not on the client-side
    },
    compiler: {
        removeConsole:
            process.env.NODE_ENV === "production"
                ? { exclude: ["error"] }
                : false,
    },
};

export default nextConfig;
