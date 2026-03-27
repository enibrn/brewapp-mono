<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="['grain-logo', className]"
  >
    <!-- Sfondo circolare sottile -->
    <circle 
      cx="60" 
      cy="60" 
      r="58" 
      stroke="currentColor" 
      stroke-width="1" 
      fill="none" 
      opacity="0.3"
    />
    
    <!-- Stelo principale -->
    <path 
      d="M60 100 L60 25" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round"
    />
    
    <!-- Spiga di grano centrale -->
    <g transform="translate(60, 15)">
      <!-- Grani della spiga -->
      <ellipse cx="-3" cy="5" rx="2.5" ry="4" fill="currentColor" opacity="0.9"/>
      <ellipse cx="3" cy="8" rx="2.5" ry="4" fill="currentColor" opacity="0.8"/>
      <ellipse cx="-3" cy="12" rx="2.5" ry="4" fill="currentColor" opacity="0.9"/>
      <ellipse cx="3" cy="15" rx="2.5" ry="4" fill="currentColor" opacity="0.8"/>
      <ellipse cx="-3" cy="19" rx="2.5" ry="4" fill="currentColor" opacity="0.9"/>
      <ellipse cx="3" cy="22" rx="2.5" ry="4" fill="currentColor" opacity="0.8"/>
      <ellipse cx="-2" cy="26" rx="2.5" ry="4" fill="currentColor" opacity="0.9"/>
      <ellipse cx="2" cy="29" rx="2.5" ry="4" fill="currentColor" opacity="0.8"/>
      
      <!-- Ariste (le "barbe" del grano) -->
      <path d="M-5 5 L-12 -2" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
      <path d="M5 8 L12 1" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
      <path d="M-5 12 L-12 5" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
      <path d="M5 15 L12 8" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
      <path d="M-5 19 L-12 12" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
      <path d="M5 22 L12 15" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
    </g>
    
    <!-- Semi sparsi intorno -->
    <g opacity="0.6">
      <!-- Semi a sinistra -->
      <ellipse cx="25" cy="45" rx="2" ry="3" fill="currentColor" transform="rotate(-15 25 45)"/>
      <ellipse cx="20" cy="60" rx="1.5" ry="2.5" fill="currentColor" transform="rotate(25 20 60)"/>
      <ellipse cx="30" cy="75" rx="2" ry="3" fill="currentColor" transform="rotate(-45 30 75)"/>
      
      <!-- Semi a destra -->
      <ellipse cx="95" cy="40" rx="1.5" ry="2.5" fill="currentColor" transform="rotate(35 95 40)"/>
      <ellipse cx="100" cy="65" rx="2" ry="3" fill="currentColor" transform="rotate(-25 100 65)"/>
      <ellipse cx="90" cy="80" rx="1.5" ry="2.5" fill="currentColor" transform="rotate(15 90 80)"/>
      
      <!-- Semi in basso -->
      <ellipse cx="45" cy="95" rx="1.5" ry="2.5" fill="currentColor" transform="rotate(45 45 95)"/>
      <ellipse cx="75" cy="90" rx="2" ry="3" fill="currentColor" transform="rotate(-35 75 90)"/>
    </g>
    
    <!-- Dettagli decorativi -->
    <g opacity="0.4">
      <!-- Piccole foglie -->
      <path d="M45 70 Q50 65 55 70 Q50 75 45 70" fill="currentColor"/>
      <path d="M65 75 Q70 70 75 75 Q70 80 65 75" fill="currentColor"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 120,
  className: ''
})
</script>

<style scoped>
.grain-logo {
  color: var(--accent-primary);
  transition: all var(--transition-base);
}

.grain-logo:hover {
  color: var(--accent-light);
  transform: scale(1.05);
}

/* Animazione sottile per i semi */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(2deg); }
}

.grain-logo g:last-child {
  animation: float 4s ease-in-out infinite;
}
</style>
