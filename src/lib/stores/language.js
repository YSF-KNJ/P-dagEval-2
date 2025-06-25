// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { writable } from 'svelte/store';

// Fallback to 'en' if running SSR or if no language is set
const initialLanguage =
	typeof window !== 'undefined' && localStorage.getItem('lang')
		? localStorage.getItem('lang')
		: 'en';

// Create a writable store
export const language = writable(initialLanguage);

// Update localStorage when language changes (only in the browser)
language.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('lang', value);
		document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.lang = value; // Update HTML lang attribute
	}
});
