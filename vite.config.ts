import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import {viteMockServe} from 'vite-plugin-mock'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteMockServe(), vanillaExtractPlugin()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 两种方式都可以
                additionalData: `@import '@/styles/global.scss';`
                // additionalData: '@use "@/assets/scss/global.scss" as *;'
            }
        }
    },
    server: {
        host: true,
        port: 80
    }
})
