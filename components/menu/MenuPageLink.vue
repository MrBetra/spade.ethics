<template>
  <NuxtLink :to="linkUrl" class="page-link">
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

const route = useRoute()

const linkUrl = computed(() => {
  // Recupere le slug de la page
  if (props.item.page && props.item.page.slug) {
    return `/${props.item.page.slug}`;
  }
  return '#'; // valeur si pas de page par sécu
});
</script>

<style scoped>
.page-link {
  font-family: var(--font-secondary);
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  transition: color .3s;
}

.page-link:hover {
  text-decoration: underline;
}
</style>