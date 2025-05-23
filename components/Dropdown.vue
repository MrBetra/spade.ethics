<template>
  <div class="dropdown relative inline-block text-left mt-8">
    <button @click="toggleDropdown" type="button" class="inline-flex w-full justify-center gap-x-2 rounded-lg bg-white px-4 py-3 text-sm text-gray-900 shadow-xs  hover:bg-gray-50"
      id="menu-button" 
      :aria-expanded="isOpen" 
      aria-haspopup="true"
    >
      {{ actualCategory ? actualCategory.name : 'Toutes les catégories' }}
      <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-show="isOpen" class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <ul class="py-1">
        <li 
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          @click="selectCategory(null)"
        >
          Toutes les catégories
        </li>
        <li v-for="cat in cats" :key="cat.id"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          @click="selectCategory(cat)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cats: {
    type: Array,
    required: true,
  },
  actualCategory: {
    type: Object,
    default: null
  }
})

// Handle show/hide
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event) => {
  if (!event.target.closest('.dropdown')) {
    isOpen.value = false;
  }
};

// Handle selected cat
const emit = defineEmits(['update:actualCategory', 'select-category']);

const selectCategory = (category) => {
  // Update selected category
  emit('update:actualCategory', category);
  // Emit select-category event
  emit('select-category', category);
  isOpen.value = false;
};


onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>