<template>
  <div class="page">
    <div class="page-container">
      <div class="page-header">
        <h1>Pages</h1>
        
        <div class="filters">
          <Dropdown 
            :actualCategory="selectedCategory"
            :cats="cats.data" 
            @select-category="filterByCategory"
          />
        </div>
      </div>
      
      <section class="container mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="page in paginatedPages" :key="page.id" class="card bg-white rounded-lg shadow-md hover:shadow-sm overflow-hidden transition-shadow">
            <NuxtLink :to="page.slug">
              <div v-if="page.cover" class="page-image h-64">
                <img :src="getImageUrl(page.cover)" alt="" class="w-full h-full object-cover">
              </div>
              <div v-else class="page-cover-placeholder h-64 bg-gray-200"></div>
            </NuxtLink>
            
            <div class="page-content p-6">
              <h2 class="page-title">
                <NuxtLink :to="page.slug" class="text-primary">
                  {{ page.title }}
                </NuxtLink>
              </h2>

              <ul v-if="page.categories && page.categories.length" class="flex flex-wrap gap-4 mt-4">
                <li v-for="categorie in page.categories" :key="page.id">
                  {{ categorie.name }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- Pagination -->
      <div class="container mt-12" v-if="totalPages > 1">
        <nav class="flex justify-center">
          <ul class="inline-flex items-center gap-2">
            <!-- Previous page -->
            <li>
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                aria-label="Previous page"
                class="flex items-center gap-2 p-3 ml-0 leading-tight text-gray-500 bg-white rounded-lg hover:bg-black hover:text-white transition disabled:opacity-50"
              >
                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 0 1 0 1.414L9.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </li>

            <!-- Page numbers -->
            <li v-for="page in totalPages" :key="page">
              <button
                @click="changePage(page)"
                :class="{
                  'bg-black text-primary': page === currentPage,
                  'bg-white': page !== currentPage
                }"
                class="p-3 leading-tight rounded-lg text-black min-w-10 hover:bg-black hover:text-primary transition disabled:opacity-50"
              >
                {{ page }}
              </button>
            </li>

            <!-- Next page -->
            <li>
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                aria-label="Next page"
                class="flex items-center gap-2 p-3 leading-tight text-gray-500 bg-white rounded-lg hover:bg-black hover:text-white transition disabled:opacity-50"
              >
                <svg class="size-5 rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 0 1 0 1.414L9.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>



      <br>
      <br>
      <br>
      <br>
      <hr>
      <br>

      <pre>
        <!-- {{ pages}} -->

        {{ pagesMeta}}

        <!-- pages:
        {{ paginatedPages }}

        total pages:
        {{ totalPages }}

        current page:
        {{ currentPage }} -->
      </pre>

    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const { find } = useStrapi()


// Fetch all pages
const { data } = await useAsyncData('pages', () => find('pages', {
  locale: 'en',
  sort: "title:asc",
  populate: {
    cover: {
      populate: "*"
    },
    categories: {
      populate: "*"
    },
  },
}))


// Define computed properties
const pages = computed(() => data.value?.data || [])
const pagesMeta = computed(() => data.value?.meta || [])


// Fetch categories
const cats = await find("categories")

// Category selection
const selectedCategory = ref(null)

// Initialize selected category from URL on component mount
onMounted(() => {
  if (route.query.category) {
    const catId = parseInt(route.query.category)
    const cat = cats.data.find(c => c.id === catId)
    if (cat) {
      selectedCategory.value = cat
    }
  }
})

// Pagination
// Initialize currentPage from URL parameter
const currentPage = ref(route.query.page ? parseInt(route.query.page) : 1)
const pageSize = 2



// Pagination logic
// Handle pagination based on selected category and current page
const paginatedPages = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  if (!selectedCategory.value) {
    return pages.value.slice(startIndex, endIndex)
  }
  
  const filtered = pages.value.filter(page => {
    if (!page.categories || !page.categories.length) {
      return false;
    }
    return page.categories.some(cat => cat.id === selectedCategory.value.id);
  })
  
  return filtered.slice(startIndex, endIndex)
})

// Total pages calculation
// Handle total pages based on selected category and current page
const totalPages = computed(() => {
  
  // Filter pages based on selected category
  const filtered = selectedCategory.value 
    ? pages.value.filter(page => {
        if (!page.categories || !page.categories.length) {
          return false;
        }
        
        // Check if page has categories and if selected category is one of them
        return page.categories.some(cat => cat.id === selectedCategory.value.id);
      })
    : pages.value
  
  // Calculate total pages based on filtered pages
  return Math.ceil(filtered.length / pageSize)
})

// Change page function
function changePage(page) {
  // Check if page is within valid range
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Update URL with new page parameter
    router.push({
      query: {
        ...route.query,
        category: selectedCategory.value ? selectedCategory.value.id : null,
        page: page,
      }
    })
  }
}

// Filter by category function
function filterByCategory(category) {
  // Reset to first page
  currentPage.value = 1
  
  // Update selected category
  selectedCategory.value = category;
  
  // If category is null, clear the query parameter
  router.push({ query: category ? { category: category.id } : {} })
}

// Watch URL parameters
watch(() => [route.query.category, route.query.page], ([newCategory, newPage]) => {
  
  // If category parameter is empty or 'null', clear the selection
  if (!newCategory || newCategory === 'null') {
    selectedCategory.value = null
  } else {
    // Update selected category
    const cat = cats.data.find(c => c.id === parseInt(newCategory))
    
    // If category is found, update selectedCategory, otherwise clear selection
    if (cat) {
      selectedCategory.value = cat
    } else {
      selectedCategory.value = null
    }
  }
  
  // Update current page from URL
  if (newPage && newPage <= totalPages.value) {
    currentPage.value = parseInt(newPage)
  } else {
    currentPage.value = 1
  }
}, { immediate: true })


function getImageUrl(image) {
  return runtimeConfig.public.strapiUrl + image.url;
}

</script>

<style scoped>
@reference '@/assets/css/style.css';

.container,
.page-header {
  @apply max-w-[1432px] mx-auto px-4 mt-12;
}

</style>