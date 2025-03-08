<template>
  <div class="app" :class="{ 'dark-theme': isDarkTheme }">
    <header>
      <div class="logo">
        <h1>✏️ Notaker</h1>
      </div>
      <div class="theme-toggle">
        <ThemeToggle :isDark="isDarkTheme" @toggle="toggleTheme" />
      </div>
    </header>
    
    <main>
      <div class="note-container">
        <div class="note-list">
          <div class="note-list-header">
            <h2>My Notes</h2>
            <button @click="addNewNote" class="add-button">
              <span>+</span> New Note
            </button>
          </div>
          
          <EmptyState v-if="notes.length === 0" message="No notes yet. Create your first note by clicking the 'New Note' button!" />
          
          <div v-else class="notes">
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
    
    <footer>
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

<style>
/* This will be imported from the CSS file */
</style>
