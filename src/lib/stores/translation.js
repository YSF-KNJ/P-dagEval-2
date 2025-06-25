// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { writable } from 'svelte/store';
import { language } from './language';

export const translations = writable({});

// Function to load translations dynamically
const loadTranslations = async (lang) => {
  let messages;

  switch (lang) {
    case 'ar':
      messages = (await import('../locales/ar.json')).default;
      break;
    case 'es':
      messages = (await import('../locales/es.json')).default;
      break;
    case 'fr':
      messages = (await import('../locales/fr.json')).default;
      break;
    case 'en':
    default:
      messages = (await import('../locales/en.json')).default;
      break;
  }

  translations.set(messages);
};

// Update translations when language changes
language.subscribe((lang) => {
  loadTranslations(lang);
});

// Load initial language translations only in the browser
if (typeof window !== 'undefined') {
  loadTranslations(localStorage.getItem('lang') || 'en');
}
