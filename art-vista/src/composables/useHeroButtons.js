import { ref } from 'vue';

/**
 * Whether the hero's store buttons ("Available on iOS / Android") are
 * currently in the viewport. Hero.vue writes it; Header.vue shows its own
 * "Get the app" pill whenever this is false (scrolled away, second panel,
 * or any page without the hero).
 */
export const heroButtonsVisible = ref(false);
