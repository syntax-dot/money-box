// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '@nuxt/ui-pro',
    ],

    runtimeConfig: {
        public: {
            DEFAULT_ADDRESS: process.env['DEFAULT_ADDRESS']
        }
    },

    devtools: {enabled: true},
    modules: ['nuxt-mongoose', './modules/auth.module', "@nuxt/ui"],

    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
            ],
        },
    },
})
