<template>
  <NuxtLink :to="item.url" class="menu-link">
    {{ item.label }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.menu-link {
  font-family: var(--font-secondary);
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  transition: color .3s;
}

.menu-link:hover {
  text-decoration: underline;
}
</style>