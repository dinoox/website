import { defineNuxtConfig } from 'nuxt'
import vitePluginString from 'vite-plugin-string';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/theme/base.scss'
    ],
    vite: {
        plugins: [
          vitePluginString()
        ]
    }
})
