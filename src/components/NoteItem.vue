<template>
  <div 
    class="note-item"
    :class="{ 'active': isActive }"
    @click="$emit('select')"
  >
    <div class="note-item-content">
      <h3>{{ note.title || 'Untitled Note' }}</h3>
      <p>{{ notePreview }}</p>
      <div class="note-meta">
        <span class="note-date">{{ formattedDate }}</span>
        <span v-if="wordCount > 0" class="note-stats">{{ wordCount }} words</span>
      </div>
    </div>
    <button @click.stop="$emit('delete')" class="delete-button" title="Delete note">×</button>
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
