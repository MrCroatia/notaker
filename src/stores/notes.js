import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    selectedNoteId: null
  }),
  
  getters: {
    selectedNote: (state) => {
      return state.notes.find(note => note.id === state.selectedNoteId)
    }
  },
  
  actions: {
    addNote(note) {
      this.notes.unshift(note)
    },
    
    updateNote(updatedNote) {
      const index = this.notes.findIndex(note => note.id === updatedNote.id)
      if (index !== -1) {
        this.notes[index] = updatedNote
      }
    },
    
    deleteNote(id) {
      const index = this.notes.findIndex(note => note.id === id)
      if (index !== -1) {
        this.notes.splice(index, 1)
        
        // If we deleted the selected note, select another one if available
        if (this.selectedNoteId === id) {
          this.selectedNoteId = this.notes.length > 0 ? this.notes[0].id : null
        }
      }
    },
    
    selectNote(id) {
      this.selectedNoteId = id
    },
    
    resetNotes() {
      this.notes = []
      this.selectedNoteId = null
    }
  }
})
