import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
