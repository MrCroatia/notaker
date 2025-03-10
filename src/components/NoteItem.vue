<template>
  <div
    class="note-item px-4 py-3 border-b cursor-pointer flex justify-between items-start transition-all duration-200 ease-in-out"
    :class="{ 'bg-note-item-bg dark:bg-note-item-bg-dark border-l-4  pl-3': isActive, 'hover:bg-note-item-hover dark:hover:bg-note-item-hover-dark': !isActive,  'border-primary dark:border-secondary': isActive, 'border-gray-200 dark:border-gray-700': !isActive }"
    @click="$emit('select')"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="note-item-content">
      <h3 class="text-lg font-semibold mb-1" :class="{'text-primary dark:text-white': isActive, 'text-gray-800 dark:text-gray-200': !isActive}">{{ note.title || 'Untitled Note' }}</h3>
      <p class="text-sm mb-2 line-clamp-2" :class="{'text-primary-light dark:text-gray-400': isActive, 'text-gray-600 dark:text-gray-400': !isActive}">{{ notePreview }}</p>
      <div class="note-meta flex items-center justify-between text-xs" :class="{'text-primary-light dark:text-gray-400': isActive, 'text-gray-500 dark:text-gray-400': !isActive}">
        <span class="note-date">{{ formattedDate }}</span>
        <span v-if="wordCount > 0" class="note-stats px-2 py-1 rounded-full text-xs" :class="{'bg-primary-light text-white': isActive, 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300': !isActive}">{{ wordCount }} words</span>
      </div>
    </div>
    <button @click.stop="$emit('delete')" class="delete-button text-gray-500 hover:text-red-500 dark:hover:text-red-400 focus:outline-none p-1 rounded-md transition-colors duration-150" :class="{'scale-110': isHovered}" title="Delete note">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  
  computed: {
    notePreview() {
      if (!this.note.content) return ''
      return this.note.content.substring(0, 100) + (this.note.content.length > 100 ? '...' : '')
    },
    
    formattedDate() {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(this.note.updatedAt)
    },
    
    wordCount() {
      if (!this.note.content) return 0
      return this.note.content.split(/\s+/).filter(word => word.length > 0).length
    }
  },
    data() {
        return {
            isHovered: false,
        }
    }
}
</script>

<style scoped>
.note-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.6;
}

.note-stats {
  background-color: rgba(var(--color-primary-rgb, 67, 97, 238), 0.1);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
}
</style>
