<template>
  <div class="note-editor">
    <div v-if="note" class="editor flex flex-col h-full">
      <input
        v-model="localTitle"
        placeholder="Note title"
        class="title-input text-2xl font-heading font-semibold placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-b py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary dark:focus:border-secondary"
        :class="{'text-primary dark:text-secondary border-gray-300 dark:border-gray-600': !note.title, 'text-gray-800 dark:text-gray-200 border-primary dark:border-secondary': note.title}"
        @input="updateNote"
      >
      <div class="editor-toolbar flex justify-between items-center text-sm  py-2 border-b mb-4" :class="{'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600': !note.title, 'text-primary-light dark:text-gray-400 border-primary dark:border-secondary': note.title}">
        <span class="word-count px-2 py-1 rounded-full text-xs" :class="{'bg-primary-light text-white': !isDarkTheme, 'bg-secondary text-gray-900': isDarkTheme}" v-if="wordCount > 0">{{ wordCount }} words</span>
        <span class="last-updated">Last updated: {{ lastUpdated }}</span>
      </div>
      <textarea
        v-model="localContent"
        placeholder="Start typing your note here..."
        class="content-textarea placeholder-gray-400 dark:placeholder-gray-500 bg-transparent flex-grow px-0 py-4 focus:outline-none focus:ring-0"
        :class="{'text-gray-700 dark:text-gray-300': !note.content, 'text-primary dark:text-secondary': note.content}"
        @input="updateNote"
      ></textarea>
    </div>
    <div v-else class="no-selection flex items-center justify-center h-full">
      <div class="no-selection-content text-center">
        <span class="icon text-6xl text-gray-400 dark:text-gray-500">📝</span>
        <h3 class="text-2xl font-semibold text-gray-600 dark:text-gray-400 mt-4">No Note Selected</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Select a note from the sidebar or create a new one to start writing.</p>
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
