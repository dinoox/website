import { defineNuxtConfig } from 'nuxt'
import vitePluginString from 'vite-plugin-string';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [],
            style: [],
            script: [],
            noscript: [
                { children: 'Javascript is required' }
            ]
        }
    },

    css: [
        '@/assets/theme/base.scss',
        '@/node_modules/animate.css/animate.css',
    ],
    vite: {
        plugins: [
          vitePluginString()
        ]
    }
})
