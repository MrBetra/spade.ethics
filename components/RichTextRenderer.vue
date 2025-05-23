<template>
  <div class="rich-text-renderer">
    <template v-for="(node, index) in content" :key="index">
      <!-- Headings -->
      <component 
        :is="`h${node.level}`" 
        v-if="node.type === 'heading'"
        class="rich-text-heading"
      >
        <template v-for="(child, childIndex) in node.children" :key="childIndex">
          <RenderTextNode :node="child" />
        </template>
      </component>

      <!-- Paragraphs -->
      <p v-else-if="node.type === 'paragraph'" class="rich-text-paragraph">
        <template v-for="(child, childIndex) in node.children" :key="childIndex">
          <RenderTextNode :node="child" />
        </template>
      </p>

      <!-- Lists -->
      <ul v-else-if="node.type === 'list' && node.format === 'unordered'" class="rich-text-list rich-text-list-unordered">
        <li v-for="(item, itemIndex) in node.children" :key="itemIndex" class="rich-text-list-item">
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <RenderTextNode :node="child" />
          </template>
        </li>
      </ul>

      <ol v-else-if="node.type === 'list' && node.format === 'ordered'" class="rich-text-list rich-text-list-ordered">
        <li v-for="(item, itemIndex) in node.children" :key="itemIndex" class="rich-text-list-item">
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <RenderTextNode :node="child" />
          </template>
        </li>
      </ol>

      <!-- Blockquote -->
      <blockquote v-else-if="node.type === 'quote'" class="rich-text-quote">
        <p v-for="(child, childIndex) in node.children" :key="childIndex">
          <template v-for="(textNode, textNodeIndex) in child.children" :key="textNodeIndex">
            <RenderTextNode :node="textNode" />
          </template>
        </p>
      </blockquote>

      <!-- Code blocks -->
      <pre v-else-if="node.type === 'code'" class="rich-text-code-block">
        <code>{{ node.children[0]?.text || '' }}</code>
      </pre>

      <!-- Image -->
      <figure v-else-if="node.type === 'image'" class="rich-text-image">
        <img 
          :src="node.url" 
          :alt="node.alt || ''" 
          :width="node.width" 
          :height="node.height"
        />
        <figcaption v-if="node.caption">{{ node.caption }}</figcaption>
      </figure>

      <!-- Table -->
      <table v-else-if="node.type === 'table'" class="rich-text-table">
        <tbody>
          <tr v-for="(row, rowIndex) in node.children" :key="rowIndex" class="rich-text-table-row">
            <td 
              v-for="(cell, cellIndex) in row.children" 
              :key="cellIndex"
              class="rich-text-table-cell"
            >
              <template v-for="(textNode, textNodeIndex) in cell.children" :key="textNodeIndex">
                <RenderTextNode :node="textNode" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Fallback for other node types -->
      <div v-else class="rich-text-unknown">
        <!-- Fallback content for unknown node types -->
        {{ node.text || '' }}
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>