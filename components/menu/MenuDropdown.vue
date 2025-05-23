<template>
  <div class="dropdown">
    <button class="dropdown-toggle" @click="toggleDropdown" :aria-expanded="isOpen" aria-haspopup="true">
      {{ item.label }}
      <span class="dropdown-icon"></span>
    </button>
    
    <ul v-show="isOpen" class="dropdown-menu">
      <li v-for="subItem in item.subMenu" :key="subItem.id" class="dropdown-item">
        <NuxtLink 
          :to="subItem.url" 
          class="dropdown-link"
        >
          {{ subItem.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};


const closeDropdown = (event) => {
  if (!event.target.closest('.dropdown')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  font-size: inherit;
  font-family: inherit;
}

.dropdown-icon {
  border-color: black transparent transparent transparent;
  border-style: solid;
  border-width: 5px 6px 0;
  content: "";
  height: 0;
  width: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: calc(50% - 2px);
  transform: rotate(0deg);
  transition: .5s ease;
  z-index: 250;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  padding: .5rem 0;
  margin: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 100;

  display: flex;
  flex-direction: column;
  gap: 0;
}

.dropdown-item {
  padding: .5rem 1rem;
  text-align: center;
}

.dropdown-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: color .3s;
}

.dropdown-link:hover {
  text-decoration: underline;
}

.dropdown-text {
  color: #888;
  cursor: default;
}
</style>