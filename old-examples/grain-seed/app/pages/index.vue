<template>
  <div class="app-container">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <h1 class="logo">Grain Seed</h1>
        <nav class="nav">
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">About</a>
          <a href="#" class="nav-link">Services</a>
          <a href="#" class="nav-link">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-logo">
            <GrainLogo :size="150" />
          </div>
          <h2 class="hero-title">Welcome to Grain Seed</h2>
          <p class="hero-description">
            A modern, elegant interface designed for optimal readability and user experience. 
            Built with understated elegance and functional design principles.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </section>

        <!-- Cards Section -->
        <section class="cards-section">
          <h3 class="section-title">Features</h3>
          <div class="cards-grid">
            <div class="card">
              <div class="card-icon">🎨</div>
              <h4 class="card-title">Elegant Design</h4>
              <p class="card-description">
                Clean, modern interface with carefully chosen colors and typography
              </p>
            </div>
            <div class="card">
              <div class="card-icon">📱</div>
              <h4 class="card-title">Responsive</h4>
              <p class="card-description">
                Optimized for all devices with fluid layouts and adaptive design
              </p>
            </div>
            <div class="card">
              <div class="card-icon">⚡</div>
              <h4 class="card-title">Performance</h4>
              <p class="card-description">
                Built with modern web technologies for optimal speed and efficiency
              </p>
            </div>
          </div>
        </section>

        <!-- Message/Chat Example Section -->
        <section class="messages-section">
          <h3 class="section-title">Conversation Example</h3>
          <div class="messages-container">
            <div class="message message-user">
              <p>This is an example of how messages appear in the interface</p>
              <span class="message-time">10:30 AM</span>
            </div>
            <div class="message message-system">
              <p>The design prioritizes readability with proper contrast and spacing</p>
              <span class="message-time">10:31 AM</span>
            </div>
            <div class="message message-user">
              <p>Interactive elements have subtle hover effects and smooth transitions</p>
              <span class="message-time">10:32 AM</span>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Grain Seed. Designed with ❤️</p>
      </div>
    </footer>
  </div>
</template>

<script setup>

// Page metadata
useSeoMeta({
  title: 'Grain Seed - Modern Interface Design',
  description: 'A modern, elegant interface designed for optimal readability and user experience'
})
</script>

<style scoped>
/* Scoped styles for the index page */
.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-logo {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.hero-description {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.cards-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.messages-section {
  padding: 4rem 0;
}

.messages-container {
  max-width: 600px;
  margin: 0 auto;
}

.message {
  background: var(--message-bg);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  position: relative;
}

.message-user {
  background: var(--message-user-bg);
  margin-left: 2rem;
}

.message-system {
  background: var(--message-system-bg);
  margin-right: 2rem;
}

.message p {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.message-time {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-logo :deep(svg) {
    width: 120px;
    height: 120px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .message-user {
    margin-left: 1rem;
  }
  
  .message-system {
    margin-right: 1rem;
  }
}
</style>
