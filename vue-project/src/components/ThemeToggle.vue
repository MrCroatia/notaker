<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

onMounted(() => {
  // Check for user's preference or stored theme
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const storedTheme = localStorage.getItem('theme')

  if (storedTheme) {
    isDarkMode.value = storedTheme === 'dark'
  } else {
    isDarkMode.value = userPrefersDark
  }

  setTheme()
})

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  setTheme()
}

const setTheme = () => {
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <button @click="toggleTheme">
    {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

button:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
</style>