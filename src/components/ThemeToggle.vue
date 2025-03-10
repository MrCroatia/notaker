<template>
  <button @click="$emit('toggle')" class="theme-button rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span class="icon text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
    <span class="tooltip hidden">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
  </button>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.theme-button {
  position: relative;
  overflow: visible;
}

.theme-button .icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.theme-button:hover .icon {
  transform: rotate(30deg);
}

.tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.theme-button:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

/* Add a small arrow to the tooltip */
.tooltip::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 4px 4px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.7);
}
</style>
