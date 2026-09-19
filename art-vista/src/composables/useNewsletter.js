import { ref } from 'vue';

/**
 * Shared newsletter signup state + submit handler (used by Hero and Blog).
 *
 * Posts the email to the `save_email` Netlify function, which authenticates
 * against the ArtVista backend server-side, so no token or API URL is needed
 * in the browser.
 */
export function useNewsletter() {
  const email = ref('');
  const isSubscribed = ref(false);
  const isSubmitting = ref(false);

  async function subscribe() {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
      const res = await fetch('/.netlify/functions/save_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_to_save: email.value.trim() })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || res.statusText);
      }
      isSubscribed.value = true;
      email.value = '';
    } catch (err) {
      console.error('Subscription error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  }

  return { email, isSubscribed, isSubmitting, subscribe };
}
