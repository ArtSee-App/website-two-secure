<template>
  <div
    ref="root"
    class="audience-card"
    :class="{ 'audience-card--wide': wide }"
    :tabindex="focusable ? 0 : undefined"
    :role="focusable ? 'link' : undefined"
    @keydown.enter="onEnter"
  >
    <div class="audience-card__inner" :class="`audience-card__inner--${tone}`">
      <div class="audience-card__head">
        <p class="audience-card__eyebrow">{{ eyebrow }}</p>
        <h2 class="audience-card__title">{{ title }}</h2>
        <p class="audience-card__subtitle">{{ subtitle }}</p>
      </div>

      <ul v-if="features && features.length" class="audience-card__features">
        <li v-for="(feature, index) in features" :key="index" class="audience-card__feature">
          <span class="audience-card__icon" aria-hidden="true">{{ feature.icon }}</span>
          <div class="audience-card__feature-text">
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.description }}</p>
          </div>
        </li>
      </ul>

      <div v-if="$slots.media" class="audience-card__media">
        <slot name="media" />
      </div>

      <button
        v-if="cta"
        type="button"
        class="audience-card__cta"
        @click.stop="emit('cta')"
      >
        {{ cta }} <span aria-hidden="true">&#8594;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * Shared card for the three "For ..." audience cards on the Home page:
 * eyebrow → title → subtitle → (features) → (media) / (cta).
 * The click behaviour is owned by the parent (native @click falls through to the root).
 */
const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  /** Background tint: 'enthusiasts' | 'artists' | 'museums' */
  tone: { type: String, default: 'enthusiasts' },
  features: { type: Array, default: () => [] },
  /** Label for the button (museums card). When set, the card root is not focusable. */
  cta: { type: String, default: '' },
  wide: { type: Boolean, default: false },
  focusable: { type: Boolean, default: true }
});

const emit = defineEmits(['cta']);
const root = ref(null);

function onEnter() {
  // Non-focusable cards (museums) let the real CTA button own Enter; avoid a double navigation.
  if (!props.focusable) return;
  // Re-dispatch as a click so the parent's @click handler runs for keyboard users.
  if (root.value) root.value.click();
}
</script>

<style scoped>
/* ---------- Card shell ---------- */
.audience-card {
  cursor: pointer;
  border-radius: 24px;
  outline: none;
  transition: transform 0.25s ease;
}

.audience-card:focus-visible .audience-card__inner {
  border-color: rgba(255, 255, 255, 0.4);
}

.audience-card__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  isolation: isolate;
  transition: border-color 0.25s ease;
}

/* Soft colour background (same gradients as the rest of the site, toned down) */
.audience-card__inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.6;
}

.audience-card__inner--enthusiasts::before {
  background-image: var(--bubbles-blue-purple);
  transform: scaleX(-1);
}

.audience-card__inner--artists::before {
  background-image: var(--bubbles-teal-magenta);
}

.audience-card__inner--museums::before {
  background-image: var(--bubbles-gold);
}

/* ---------- Header block ---------- */
.audience-card__eyebrow {
  margin: 0 0 10px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.audience-card__title {
  margin: 0 0 12px;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.15;
  color: #fff;
}

.audience-card__subtitle {
  margin: 0;
  max-width: 52ch;
  font-size: 1rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
}

/* ---------- Features ---------- */
.audience-card__features {
  list-style: none;
  margin: 24px 0 0;
  padding: 24px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.audience-card__feature {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.audience-card__icon {
  font-size: 1.5rem;
  line-height: 1.3;
  flex-shrink: 0;
}

.audience-card__feature-text h4 {
  margin: 0 0 2px;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.audience-card__feature-text p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.65);
}

/* ---------- Media ---------- */
.audience-card__media {
  margin-top: auto;
  padding-top: 28px;
}

.audience-card__media :deep(.promo-video) {
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

/* ---------- CTA (museums) ---------- */
.audience-card__cta {
  padding: 12px 24px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease;
}

.audience-card__cta:hover,
.audience-card__cta:focus-visible {
  background: rgba(255, 255, 255, 0.14);
  outline: none;
}

/* ---------- Wide (museums) variant ---------- */
.audience-card--wide .audience-card__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 48px;
  align-items: center;
}

.audience-card--wide .audience-card__subtitle {
  max-width: 60ch;
}

/* ---------- Hover (pointer devices only) ---------- */
@media (hover: hover) {
  .audience-card:hover {
    transform: translateY(-3px);
  }

  .audience-card:hover .audience-card__inner {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

/* ---------- Mobile ---------- */
@media screen and (max-width: 767px) {
  .audience-card__inner {
    padding: 24px;
  }

  .audience-card__title {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .audience-card__subtitle {
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .audience-card__features {
    margin-top: 20px;
    padding-top: 20px;
    gap: 14px;
  }

  .audience-card__media {
    padding-top: 24px;
  }

  .audience-card--wide .audience-card__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .audience-card__cta {
    width: 100%;
  }
}
</style>
