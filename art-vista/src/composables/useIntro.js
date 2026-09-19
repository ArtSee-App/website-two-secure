import { ref } from 'vue';

/**
 * Shared state for the first-load intro:
 *   'loading'  → logo centred on the loading screen, glow pulses once
 *   'moving'   → logo flies to its header position (overlay still opaque)
 *   'done'     → logo landed: header shows the real logo + wordmark, overlay fades out
 *   'finished' → overlay removed
 *
 * A module-level singleton so LoadingScreen (writer) and Header (reader)
 * agree without prop-drilling through the router.
 */
export const introState = ref('loading');

export function setIntroState(state) {
  introState.value = state;
}
