import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({

  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  css: [
    '@/assets/css/style.css',
  ],

  modules: ['@nuxtjs/strapi', '@nuxt/image'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  strapi: {
    url: process.env.NUXT_STRAPI_URL || 'http://localhost:1337',
    version: 'v5',
    prefix: '/api',
  },

  // Variables d'environnement accessibles côté client
  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_STRAPI_URL || 'http://localhost:1337',
      environment: process.env.NODE_ENV,
    }
  },

  // Configuration pour la génération statique (si nécessaire)
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  compatibilityDate: '2025-05-17'
})