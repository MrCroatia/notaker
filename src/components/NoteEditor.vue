<template>
  <div class="note-editor">
    <div v-if="note" class="editor">
      <input 
        v-model="localTitle" 
        placeholder="Note title" 
        class="title-input"
        @input="updateNote"
      >
      <div class="editor-toolbar">
        <span class="word-count" v-if="wordCount > 0">{{ wordCount }} words</span>
        <span class="last-updated">Last updated: {{ lastUpdated }}</span>
      </div>
      <textarea 
        v-model="localContent" 
        placeholder="Start typing your note here..." 
        class="content-textarea"
        @input="updateNote"
      ></textarea>
    </div>
    <div v-else class="no-selection">
      <div class="no-selection-content">
        <span class="icon">📝</span>
        <h3>No Note Selected</h3>
        <p>Select a note from the sidebar or create a new one to start writing.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      localTitle: '',
      localContent: ''
    }
  },
  
  computed: {
    wordCount() {
      if (!this.localContent) return 0
      return this.localContent.split(/\s+/).filter(word => word.length > 0).length
    },
    
    lastUpdated() {
      if (!this.note) return ''
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(this.note.updatedAt)
    }
  },
  
  watch: {
    note: {
      immediate: true,
      handler(newNote) {
        if (newNote) {
          this.localTitle = newNote.title
          this.localContent = newNote.content
        } else {
          this.localTitle = ''
          this.localContent = ''
        }
      }
    }
  },
  
  methods: {
    updateNote() {
      if (!this.note) return
      
      this.$emit('update', {
        ...this.note,
        title: this.localTitle,
        content: this.localContent,
        updatedAt: new Date()
      })
    }
  }
}
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
  border-bottom: 1px solid var(--color-border);
}

.word-count {
  background-color: rgba(var(--color-primary-rgb, 67, 97, 238), 0.1);
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.no-selection-content {
  text-align: center;
  max-width: 300px;
}

.no-selection-content .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.no-selection-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.no-selection-content p {
  line-height: 1.6;
}
</style>
