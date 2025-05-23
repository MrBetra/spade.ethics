<template>
  <div>
    <header>
      <MenuNav :navItems="menuNavDatas" />
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const { find } = useStrapi()

const { data } = await find('main-menu', {
  populate: {
    mainMenuItems: {
      populate: '*'
    }
  },
})

const menuNavDatas = computed(() => {
  if (!data) return []
  return data.mainMenuItems
})
</script>

<style>
@reference '@/assets/css/style.css';

body {
  @apply font-primary bg-primary;
}


header {
  @apply p-4;
}

nav ul {
  display: flex;
  row-gap: 1rem;
}

main {}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>