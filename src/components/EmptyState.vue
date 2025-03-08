<template>
  <div class="empty-state">
    <div class="empty-state-content">
      <span class="icon">📋</span>
      <h3>No Notes Yet</h3>
      <p>{{ message }}</p>
      <div class="empty-state-arrow">
        <span>👆</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'No notes yet. Create your first note!'
    }
  }
}
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
}

.empty-state-content {
  text-align: center;
  max-width: 250px;
  animation: fadeIn 0.5s ease-out;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.empty-state-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--color-primary);
}

.empty-state-content p {
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.empty-state-arrow {
  position: relative;
  font-size: 1.5rem;
  animation: bounce 2s infinite;
  transform: rotate(-45deg);
  display: inline-block;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(-45deg);
  }
  40% {
    transform: translateY(-15px) rotate(-45deg);
  }
  60% {
    transform: translateY(-7px) rotate(-45deg);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
