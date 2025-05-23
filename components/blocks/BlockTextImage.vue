<!-- BlockTextImage.vue -->
<template>
  <section class="block-text-image">
    <div class="container">
      <div class="content-wrapper" :class="[isImageRight ? 'image-right' : 'image-left']">
        <!-- Text Content -->
        <div class="text-content">
          <h2 class="title">{{ content.title }}</h2>
          
          <RichTextRenderer 
            v-if="content.description && content.description.length" 
            :content="content.description"
            class="description"
          />
          
          <!-- CTAs -->
          <div class="ctas" v-if="content.ctas && content.ctas.length">
            <NuxtLink 
              v-for="cta in content.ctas" 
              :key="cta.id" 
              :to="cta.url" 
              class="cta-button"
              :class="cta.style.toLowerCase()"
            >
              {{ cta.label }}
            </NuxtLink>
          </div>
        </div>
        
        <!-- Image -->
        <div class="image-container" v-if="content.cover">
          <img 
            :src="getImageUrl(content.cover)" 
            :alt="content.cover.alternativeText || content.title"
            :width="content.cover.width"
            :height="content.cover.height"
          />
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
    required: true
  }
});

const content = computed(() => props.block.content || {});

const isImageRight = computed(() => content.value.imagePosition === 'Right');

function getImageUrl(image) {
  return runtimeConfig.public.strapiUrl + image.url;
}

</script>

<style scoped>
@reference '@/assets/css/style.css';

.block-text-image {
  @apply my-12;
}

.container {
  @apply max-w-[1400px] mx-auto;
}

.content-wrapper {
  @apply flex flex-col gap-8;
}

.image-right {
  @apply lg:flex-row;
}

.image-left {
  @apply lg:flex-row-reverse;
}

.text-content {
  @apply w-full lg:w-1/2 flex flex-col justify-center;
}

.title {
  @apply text-3xl font-bold mb-4 text-gray-900;
}

.rich-text {
  @apply mb-6 text-gray-700 leading-relaxed;
}

.paragraph {
  @apply mb-4;
}

.link {
  @apply text-blue-600 hover:underline;
}

.list {
  @apply list-disc pl-5 mb-4;
}

.ctas {
  @apply flex gap-4 mt-4;
}

.image-container {
  @apply w-full lg:w-1/2;
}

.image-wrapper {
  @apply overflow-hidden rounded-lg shadow-lg;
}

@media (max-width: 1023px) {
  .image-wrapper {
    @apply mb-8;
  }
}
</style>