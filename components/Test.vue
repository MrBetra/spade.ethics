<script setup>
import { strapi } from '@strapi/client';

const client = strapi({ baseURL: 'http://localhost:1337/api' })

// Pages
const pages = client.collection('pages')

const allPages = await pages.find()

// Menu
const mainMenu = client.single("main-menu")

const mainMenuFR = await mainMenu.find(
  {
    populate: {
      mainMenuItems: {
        populate: '*'
      }
    },
    locale: 'fr'
  }
)

const mainMenuEN = await mainMenu.find(
  {
    populate: {
      mainMenuItems: {
        populate: '*'
      }
    },
    locale: 'en'
  }
)

const menuItemsFR = mainMenuFR.data.mainMenuItems
const menuItemsEN = mainMenuEN.data.mainMenuItems

</script>

<template>
  <div>
    <h1>Datas :</h1>

    <h2>Pages :</h2>
    <pre>
      {{ allPages.data }}
    </pre>

    <h3>Liste des pages :</h3>
    <ul>
      <li v-for="item in allPages.data" :key="item.id">
        {{ item.title }}
      </li>
    </ul>

    <h2>Menu Datas :</h2>
    <h3>FR</h3>
    <pre>
      {{ menuItemsFR }}
    </pre>

    <h4>Nav :</h4>
    <nav class="main-menu">
      <ul>
        <li v-for="item in menuItemsFR" :key="item.id">
          <NuxtLink :to="item.url || '/' ">
            {{ item.label }}
          </NuxtLink>
          
          <ul v-if="item.subMenu && item.subMenu.length">
            <li v-for="child in item.subMenu" :key="child.id">
              <NuxtLink :to="child.url || '/'">
                {{ child.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

