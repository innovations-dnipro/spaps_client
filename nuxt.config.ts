// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@spaps/api': fileURLToPath(new URL('./composables/api', import.meta.url)),
    '@spaps/composables': fileURLToPath(
      new URL('./composables', import.meta.url)
    ),
    '@spaps/core': fileURLToPath(new URL('./packages/core', import.meta.url)),
    '@spaps/enums': fileURLToPath(
      new URL('./packages/core/enums', import.meta.url)
    ),
    '@spaps/i18n': fileURLToPath(new URL('./packages/i18n', import.meta.url)),
    '@spaps/types': fileURLToPath(
      new URL('./packages/core/types', import.meta.url)
    ),
    '@spaps/utils': fileURLToPath(new URL('./packages/utils', import.meta.url)),
    '@spaps/validators': fileURLToPath(
      new URL('./composables/useValidators', import.meta.url)
    ),
  },
  css: [
    './assets/styles/main.scss',
    // "@/assets/styles/normalize.scss"
  ],
  // vite: {
  // css: {
  //   preprocessorOptions: {
  //     sass: {
  //       additionalData: '@import "@/assets/styles/_variables.scss"'
  //     }
  //   }
  // }
  // },
  // sitemap: {
  //   strictNuxtContentPaths: true,
  // },
  typescript: {
    strict: true,
  },
  // app: {
  //   head: {
  //     title: "FlumX",
  //     link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  //     meta: Meta,
  //     pageTransition: { name: 'page', mode: 'out-in' },
  //     layoutTransition: { name: 'layout', mode: 'out-in' },
  //   }
  // },
  // app: {
  //   head: {
  //     charset: 'utf-16',
  //     viewport: 'width=device-width,initial-scale=1',
  //     title: 'Riyad\'s Blog',
  //     titleTemplate: '%s - Riyad\'s Blog',
  //     meta: [{ name: 'description', content: 'Riyad\'s awesome blog' }],
  //   },
  //   pageTransition: { name: 'page', mode: 'out-in' },
  //   layoutTransition: { name: 'layout', mode: 'out-in' },
  // },
  // content: {
  //   highlight: {
  //     theme: 'dracula',
  //   },
  // },
  // site: {
  //   url: 'https://it-flumx.com',
  // },
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk'],
    vueI18n: './packages/i18n/index.ts',
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    // '@nuxtjs/robots',
    // '@nuxtjs/tailwindcss',
    // 'nuxt-icon',
    // '@nuxt/image',
    // 'nuxt-og-image',
    // '@nuxt/content',
    // '@nuxtjs/fontaine',
    // '@nuxtjs/color-mode',
    // '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Montserrat: {
            wght: [800],
          },
          Inter: {
            wght: [400, 500],
          },
        },
      },
    ],
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  plugins: ['~/plugins/vuetify', '~/plugins/loader' /*'~/plugins/axios'*/],
  routeRules: {
    // '/profile/**': { ssr: false },
    '/profile': { ssr: false },
    '/profile-rentor': { ssr: false },
  },
});
