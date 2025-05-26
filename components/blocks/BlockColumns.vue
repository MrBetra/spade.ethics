<!-- BlockColumns.vue -->
<template>
  <section :class="blockClass" class="my-24">
    <div class="container mx-auto max-w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(column, index) in block.content" 
          :key="column.id || index"
          class="column-card bg-white rounded-lg shadow-md"
        >
          <!-- Image cover -->
          <div v-if="column.cover" class="column-cover h-64 overflow-hidden">
            <img
              :src="getImageUrl(column.cover)" 
              :alt="column.cover.alternativeText || '' "
              class="w-full h-full object-cover"
              :placeholder="column.cover.formats?.thumbnail?.url || ''"
            />
          </div>
          <div v-else class="column-cover-placeholder h-64 bg-gray-200"></div>

          <div class="p-6">
            <!-- Title -->
            <h3 class="text-xl font-bold mb-4">{{ column.title }}</h3>
            
            <!-- Description if exists -->
            <RichTextRenderer 
              v-if="column.description && column.description.length" 
              :content="column.description"
              class="description"
            />
            
            <!-- CTA Button if exists -->
            <div v-if="column.cta" class="mt-4">
              <NuxtLink 
                :to="column.cta.url"
                class="cta-button"
                :class="column.cta.style.toLowerCase()"
              >
                {{ column.cta.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

const props = defineProps({
  block: {
    type: Object,
    required: true,

    default: () => ({
      columns: 3,
      content: []
    })
  }
});

const blockClass = computed(() => props.block.__component.replace('.', '-'))

function getImageUrl(image) {
  if (runtimeConfig.public.environment === "development") {
    return runtimeConfig.public.strapiUrl + image.url;
  } else {
    return image.url
  }
}

</script>

<style scoped>

</style>