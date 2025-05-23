<template>
  <template v-if="node.type === 'text'">
    
    <template v-if="hasFormatting">
      <strong v-if="node.bold"><template v-if="!node.italic && !node.underline && !node.code && !node.strikethrough">{{ node.text }}</template></strong>
      <em v-if="node.italic"><template v-if="!node.bold && !node.underline && !node.code && !node.strikethrough">{{ node.text }}</template></em>
      <u v-if="node.underline"><template v-if="!node.bold && !node.italic && !node.code && !node.strikethrough">{{ node.text }}</template></u>
      <code v-if="node.code"><template v-if="!node.bold && !node.italic && !node.underline && !node.strikethrough">{{ node.text }}</template></code>
      <s v-if="node.strikethrough"><template v-if="!node.bold && !node.italic && !node.underline && !node.code">{{ node.text }}</template></s>
      
      
      <strong v-if="node.bold && node.italic"><em>{{ node.text }}</em></strong>
      <strong v-if="node.bold && node.underline"><u>{{ node.text }}</u></strong>
      <strong v-if="node.bold && node.code"><code>{{ node.text }}</code></strong>
      <strong v-if="node.bold && node.strikethrough"><s>{{ node.text }}</s></strong>
      
      <em v-if="node.italic && node.underline"><u>{{ node.text }}</u></em>
      <em v-if="node.italic && node.code"><code>{{ node.text }}</code></em>
      <em v-if="node.italic && node.strikethrough"><s>{{ node.text }}</s></em>
      
      <u v-if="node.underline && node.code"><code>{{ node.text }}</code></u>
      <u v-if="node.underline && node.strikethrough"><s>{{ node.text }}</s></u>
      
      <code v-if="node.code && node.strikethrough"><s>{{ node.text }}</s></code>
      
      <strong v-if="node.bold && node.italic && node.underline"><em><u>{{ node.text }}</u></em></strong>
      <strong v-if="node.bold && node.italic && node.code"><em><code>{{ node.text }}</code></em></strong>
      <strong v-if="node.bold && node.italic && node.strikethrough"><em><s>{{ node.text }}</s></em></strong>
      <strong v-if="node.bold && node.underline && node.code"><u><code>{{ node.text }}</code></u></strong>
      <strong v-if="node.bold && node.underline && node.strikethrough"><u><s>{{ node.text }}</s></u></strong>
      <strong v-if="node.bold && node.code && node.strikethrough"><code><s>{{ node.text }}</s></code></strong>
      
      <em v-if="node.italic && node.underline && node.code"><u><code>{{ node.text }}</code></u></em>
      <em v-if="node.italic && node.underline && node.strikethrough"><u><s>{{ node.text }}</s></u></em>
      <em v-if="node.italic && node.code && node.strikethrough"><code><s>{{ node.text }}</s></code></em>
      
      <u v-if="node.underline && node.code && node.strikethrough"><code><s>{{ node.text }}</s></code></u>
    </template>

    <template v-else>
      {{ node.text }}
    </template>
  </template>

  <!-- Links -->
  <NuxtLink 
    v-else-if="node.type === 'link'" 
    :to="node.url" 
    :target="isExternalUrl(node.url) ? '_blank' : undefined"
    :rel="isExternalUrl(node.url) ? 'noopener noreferrer' : undefined"
  >
    <template v-for="(child, index) in node.children" :key="index">
      <RenderTextNode :node="child" />
    </template>
  </NuxtLink>

  <!-- Images within text -->
  <img 
    v-else-if="node.type === 'image'" 
    :src="node.url" 
    :alt="node.alt || ''" 
  />

  <!-- Fallback for other node types -->
  <template v-else>
    {{ node.text || '' }}
  </template>
</template>

<script setup>
const props = defineProps({
  node: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Check if the node has any text formatting
const hasFormatting = computed(() => {
  return props.node.bold || props.node.italic || props.node.underline || props.node.code || props.node.strikethrough;
});

// Helper to check if URL is external
function isExternalUrl(url) {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}
</script>