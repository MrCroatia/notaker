<template>
  <div class="app min-h-screen transition-colors duration-300" :class="{'dark-theme': isDarkTheme}" :style="{'font-family': isDarkTheme ? 'Inter, sans-serif' : 'Lexend, sans-serif'}">
    <header :class="{'bg-primary': !isDarkTheme, 'bg-note-item-bg-dark': isDarkTheme}" class="text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div class="logo flex items-center">
        <h1 class="text-2xl font-semibold tracking-tight">
          Notaker
        </h1>
      </div>
      <div class="theme-toggle">
        <ThemeToggle :isDark="isDarkTheme" @toggle="toggleTheme" />
      </div>
    </header>

    <main class="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div class="note-container rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row" :class="{'bg-white': !isDarkTheme, 'bg-background-dark': isDarkTheme}">
        <div class="note-list border-r w-full md:w-80 flex-shrink-0" :class="{'border-gray-200': !isDarkTheme, 'border-gray-700': isDarkTheme}">
          <div class="note-list-header py-4 px-4 border-b flex justify-between items-center" :class="{'bg-gray-50 border-gray-200': !isDarkTheme, 'bg-gray-700 border-gray-700': isDarkTheme}">
            <h2 class="text-lg font-semibold" :class="{'text-primary': !isDarkTheme, 'text-secondary': isDarkTheme}">My Notes</h2>
            <button @click="addNewNote" class="add-button  font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2  transition-colors duration-150 flex items-center" :class="{'bg-primary hover:bg-primary-light text-white focus:ring-secondary': !isDarkTheme, 'bg-secondary hover:bg-yellow-400 text-gray-900 focus:ring-primary-light': isDarkTheme}">
              <span>+</span> New Note
            </button>
          </div>

          <EmptyState v-if="notes.length === 0" message="No notes yet. Create your first note by clicking the 'New Note' button!" />

          <div v-else class="notes overflow-y-auto">
            <NoteItem
              v-for="note in notes"
              :key="note.id"
              :note="note"
              :isActive="selectedNoteId === note.id"
              @select="selectNote(note.id)"
              @delete="deleteNote(note.id)"
            />
          </div>
        </div>

        <NoteEditor
          :note="selectedNote"
          @update="updateNote"
        />
      </div>
    </main>

    <footer class="text-center py-4 text-sm border-t " :class="{'bg-gray-50 border-gray-200 text-gray-600': !isDarkTheme, 'bg-background-dark border-gray-700 text-gray-400': isDarkTheme}">
      <p>✏️ Notaker - A simple note-taking app. Notes are stored in your browser session.</p>
    </footer>
  </div>
</template>

<script>
import NoteItem from './components/NoteItem.vue'
import NoteEditor from './components/NoteEditor.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import EmptyState from './components/EmptyState.vue'
import { useNotesStore } from './stores/notes'

export default {
  components: {
    NoteItem,
    NoteEditor,
    ThemeToggle,
    EmptyState
  },
  
  data() {
    return {
      isDarkTheme: false
    }
  },
  
  computed: {
    notesStore() {
      return useNotesStore()
    },
    
    notes() {
      return this.notesStore.notes
    },
    
    selectedNoteId: {
      get() {
        return this.notesStore.selectedNoteId
      },
      set(value) {
        this.notesStore.selectNote(value)
      }
    },
    
    selectedNote() {
      return this.notesStore.selectedNote
    }
  },
  
  created() {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('notaker-theme')
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark'
    } else {
      // Check if user prefers dark mode at system level
      this.isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // Add some sample notes for demonstration
    this.addSampleNotes()
    
    // Reset notes when the page is refreshed or closed
    window.addEventListener('beforeunload', this.resetNotes)
  },
  
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.resetNotes)
  },
  
  methods: {
    addSampleNotes() {
      const welcomeNote = {
        id: this.generateId(),
        title: 'Welcome to Notaker!',
        content: 'This is a simple note-taking app. Your notes will be stored only for this session.\n\nFeatures:\n- Create and edit notes\n- Delete notes\n- Switch between light and dark theme\n\nStart by creating a new note or edit this one!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const tipNote = {
        id: this.generateId(),
        title: 'Tips & Tricks',
        content: '✨ Click on a note in the sidebar to edit it\n\n✨ Create a new note with the + button\n\n✨ Delete notes by hovering over them and clicking the × button\n\n✨ Toggle between light and dark mode with the button in the header\n\n✨ Your notes will be reset when you refresh the page or close the browser',
        createdAt: new Date(Date.now() - 1000 * 60),
        updatedAt: new Date(Date.now() - 1000 * 60)
      }
      
      this.notesStore.addNote(welcomeNote)
      this.notesStore.addNote(tipNote)
      this.notesStore.selectNote(welcomeNote.id)
    },
    
    addNewNote() {
      const newNote = {
        id: this.generateId(),
        title: '',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      this.notesStore.addNote(newNote)
      this.notesStore.selectNote(newNote.id)
    },
    
    selectNote(id) {
      this.notesStore.selectNote(id)
    },
    
    updateNote(updatedNote) {
      this.notesStore.updateNote(updatedNote)
    },
    
    deleteNote(id) {
      this.notesStore.deleteNote(id)
    },
    
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2)
    },
    
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      localStorage.setItem('notaker-theme', this.isDarkTheme ? 'dark' : 'light')
    },
    
    resetNotes() {
      this.notesStore.resetNotes()
    }
  }
}
</script>

<style scoped>
body.dark-theme {
  background-color: #121212;
  color: #e9ecef;
}
/* This will be imported from the CSS file */
</style>
