import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    build: {
        cssMinify: 'lightningcss',
    },
    css: {
        transformer: 'lightningcss',
        minify: true,
        lightningcss: {
            browserslist: '>= 0.25%',
            drafts: {
                nesting: true,
                customMedia: true,
            },
            cssModules: true,
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@styles': path.resolve(__dirname, './src/assets/styles'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@shared': path.resolve(__dirname, '/src/assets/shared'),
            '@components': path.resolve(__dirname, '/src/components'),
            '@templates': path.resolve(__dirname, '/src/templates'),
            '@routes': path.resolve(__dirname, '/src/routes'),
            '@static': path.resolve(__dirname, '/src/static'),
            '@hooks': path.resolve(__dirname, '/src/hooks'),
            '@constants': path.resolve(__dirname, '/src/constants'),
        },
    },
});
