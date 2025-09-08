import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',
    // Разрешаем Server Actions для всех origin в development
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3002', 'localhost:3001', 'localhost:3000', '*.app.github.dev', '*.github.dev'],
        },
    },
    // Отключаем strict mode для Server Actions
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default withBundleAnalyzer(nextConfig);
