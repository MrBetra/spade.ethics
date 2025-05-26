<template>
  <nav class="navigation">
    <NuxtLink to="/" class="brand">
      <img :src="getImageUrl(global.data.logoPrimary)" alt="">
    </NuxtLink>
    <ul class="nav-list">
      <li v-for="item in navItems" :key="item.id" class="nav-item">
        <!-- Import dynamique de components -->
        <component :is="getComponent(item)" :item="item" />
      </li>
    </ul>
    <!-- <pre>
      {{ global }}
    </pre> -->
  </nav>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const { find } = useStrapi()

// Import explicite des components pour l'import dynamique
import MenuLink from './MenuLink.vue';
import MenuButton from './MenuButton.vue';
import MenuDropdown from './MenuDropdown.vue';
import MenuPageLink from './MenuPageLink.vue';

const props = defineProps({
  navItems: {
    type: Array,
    required: true
  }
});

const global = await find('global', {
  populate: {
    logoPrimary: {
      populate: '*'
    },
    logoSecondary: {
      populate: '*'
    },
  },
})

// Return le cmponents à afficher
const getComponent = (item) => {
  switch (item.__component) {
    case 'menu.menu-link':
      return MenuLink;
    case 'menu.menu-button':
      return MenuButton;
    case 'menu.dropdown':
      return MenuDropdown;
    case 'menu.menu-page-link':
      return MenuPageLink;
    default:
      return MenuLink;
  }
};

function getImageUrl(image) {
  if (runtimeConfig.public.environment === "development") {
    return runtimeConfig.public.strapiUrl + image.url;
  } else {
    return image.url
  }
}

</script>

<style scoped>
@reference '@/assets/css/style.css';

.navigation {
  @apply w-full max-w-[1400px] mx-auto flex items-center;

  .nav-list {
    @apply ml-auto;
  }
}

.brand {
  @apply w-30;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.nav-item {
  position: relative;
}
</style>