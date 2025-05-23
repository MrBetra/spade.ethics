<template>
  <section class="block-hero my-12" :data-image-position="block.imagePosition.toLowerCase()">
    <div class="container">
      <div class="content">
        <h2 class="title">{{ block.title }}</h2>
        
        <RichTextRenderer 
          v-if="block.description && block.description.length" 
          :content="block.description"
          class="description"
        />

        <div class="ctas" v-if="block.ctas && block.ctas.length">
          <NuxtLink 
            v-for="cta in block.ctas" 
            :key="cta.id" 
            :to="cta.url" 
            class="cta-button"
            :class="cta.style.toLowerCase()"
          >
            {{ cta.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="image-container" v-if="block.cover">
        <img 
          :src="getImageUrl(block.cover)" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
});


function getImageUrl(image) {
  return runtimeConfig.public.strapiUrl + image.url;
}

</script>

<style scoped>
@reference '@/assets/css/style.css';

.container {
  @apply max-w-[1400px] mx-auto flex items-center gap-8;

  @media (max-width: 768px) {
    @apply flex-col items-start;
  }
}

/* Default layout (image on right) */

.content {
  @apply flex-1;
}

.image-container {
  @apply flex-1;

  img {
    @apply max-w-full h-auto;
  }
}

section[data-image-position="left"] .container {
  @apply flex-row-reverse;
  
  @media (max-width: 768px) {
    @apply flex-col;
  }
}

.title {
  @apply mb-4;
}

.description {
  @apply mb-8 text-lg leading-relaxed;
}

.ctas {
  @apply flex gap-4;
}
</style>