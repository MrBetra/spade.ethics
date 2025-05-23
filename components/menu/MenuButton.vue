<template>
  <a :href="item.url" class="menu-button" :class="buttonStyle" target="_blank" rel="noopener noreferrer">
    {{ item.label }}
  </a>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const buttonStyle = computed(() => {
  return {
    'primary': props.item.style === 'primary',
    'secondary': props.item.style === 'secondary',
    'tertiary': props.item.style === 'tertiary'
  };
});
</script>