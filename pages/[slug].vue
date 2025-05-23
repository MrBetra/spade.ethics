<template>
  <div class="page">
    <div v-if="page" class="page__container">
      <h1>{{ page.title }}</h1>
      
      <RichTextRenderer 
        v-if="page.description && page.description.length" 
        :content="page.description"
        class="description mt-4"
      />

      <div v-if="blocks" class="blocks">
        <component v-for="block in blocks" :key="block.id" :is="getBlock(block)" :block="block" />
      </div>
    </div>
    <div v-else class="page__container">
      <h1>Page non trouvée</h1>
    </div>
  </div>

  <br>
  <hr>
  <br>

  <pre>
    {{ page }}
  </pre>
</template>

<script setup>
// Explicit import for dynamic import
import BlockHero from '../components/blocks/BlockHero.vue';
import BlockColumns from '../components/blocks/BlockColumns.vue';
import BlockTextImage from '../components/blocks/BlockTextImage.vue';

const route = useRoute()
const { find } = useStrapi()

const data = await find('pages', {
  populate: {
    categories: {
      populate: '*'
    },
    blocks: {
      on: {
        'blocks.hero': {
          populate: {
            cover: {
              fields: ['name', 'url', 'formats'],
            },
            ctas: {
              populate: '*'
            }
          },
          // populate: '*'
        },
        'blocks.columns': {
          populate: {
            content: {
              populate: '*'
            }
          },
        },
        'blocks.text-image': {
          populate: {
            content: {
              populate: '*'
            }
          },
        },
        'blocks.fact-and-figure': {
          populate: {
            content: {
              populate: '*'
            }
          },
        },
      }
    }
  },
  filters: {
    slug: {
      $eq: route.params.slug
    }
  },
})

const page = computed(() => data.data[0])
const blocks = computed(() => data.data[0].blocks)

const getBlock = (block) => {
  switch (block.__component) {
    case 'blocks.hero':
      return BlockHero;
    case 'blocks.columns':
      return BlockColumns;
    case 'blocks.text-image':
      return BlockTextImage;
  }
};

// 404
if (!page) {
  throw createError({
    statusCode: 404,
    message: 'Page non trouvée'
  })
}
</script>

<style scoped>
@reference '@/assets/css/style.css';

.page {
  @apply px-4 mt-12;
}

.page__container {
  @apply mx-auto w-full max-w-[1400px];
}

</style>