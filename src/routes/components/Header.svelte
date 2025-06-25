<script lang="ts">
	// @ts-nocheck

	import Icon from '@iconify/svelte';

	import { translations } from '$lib/stores/translation';
	import { language } from '$lib/stores/language';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { signOut, type User } from 'firebase/auth';
	import { onAuthStateChanged } from 'firebase/auth';

	let user: User | null = null;
	let errorMessage = '';

	// Reactive variable to store the path
	let currentPath;

	// Subscribe to the store
	$: currentPath = $page.url.pathname;

	$: console.log(currentPath.slice(0, 11) === '/backoffice');

	$: $translations;
	$: $language;

	function changeLanguage(lang) {
		language.set(lang);
	}

	let open = false;
	let open2 = false;

	function toggleMenu() {
		open = !open;
		open2 = false;
	}
	function toggleMenu2() {
		open2 = !open2;
		open = false;
	}
</script>

<header>
	<div class="wrapper">
		<a href="/" class="logo"><img src="/Logo.png" alt="" /></a>

		{#if $translations.header !== undefined}
			<div id="nav">
				{#if currentPath.slice(0, 11) === '/backoffice'}
					<a
						href="/backoffice/home"
						style={$language === 'ar' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					>
						<p>Home</p>
					</a>
					<span>|</span>
					<a
						href="/backoffice/archive"
						style={$language === 'ar' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					>
						<p>Archive</p>
					</a>
					<span>|</span>
					<a
						href="/"
						style={$language === 'ar' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					>
						<p>Logout</p>
					</a>
				{:else}
					<a
						href="/signup"
						style={$language === 'ar' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					>
						<p>{$translations.header.nav[1]}</p>
					</a>
					<span>|</span>
					<a
						href="/login"
						style={$language === 'ar' ? 'flex-direction: row-reverse;' : 'flex-direction: row;'}
					>
						<p>{$translations.header.nav[0]}</p>
					</a>
				{/if}
			</div>
		{/if}
		<div id="rightBox">
			<a on:click={toggleMenu2} id="langSelect"
				><Icon icon="hugeicons:language-skill" width="30" height="30" /></a
			>

			<a href="/login">
				<Icon icon="hugeicons:circle-arrow-up-right" width="33" height="33" />
			</a>
			<a href="https://wa.me/212641721009" target="_blank">
				<Icon icon="hugeicons:whatsapp" width="30" height="30" />
			</a>
		</div>
	</div>
	{#if open2}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<div id="menu">
			<a on:click={() => changeLanguage('en')}>
				<img src="/images/united-kingdom.png" alt="" />
				<p>{$translations.header.lang[0]}</p>
			</a>
			<a on:click={() => changeLanguage('ar')}>
				<img src="/images/morocco.png" alt="" />
				<p>{$translations.header.lang[1]}</p>
			</a>
			<a on:click={() => changeLanguage('es')}>
				<img src="/images/spain.png" alt="" />
				<p>{$translations.header.lang[2]}</p>
			</a>
			<a on:click={() => changeLanguage('fr')}>
				<img src="/images/france.png" alt="" />
				<p>{$translations.header.lang[3]}</p>
			</a>
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="overlay" on:click={toggleMenu2} />
	{/if}
</header>

<style>
	header {
		z-index: 998;
		max-width: var(--max-width);
		width: var(--width);
		margin: auto;
		position: relative;
		border-bottom: 2px solid #cccccc;
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: auto;
		z-index: 998;
		padding: 0.9rem 0.5rem 0.9rem 0.5rem;
		top: 1rem;
		width: 100%;
		direction: ltr !important;
	}

	#rightBox a {
		height: 3.3rem;
		width: 3.3rem;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--card-color);
		box-shadow: var(--shadows);
		border: 2px solid var(--input-color);
		margin: 0 0.1rem !important;
		font-size: var(--p-size);
	}

	#menu img {
		height: 1.6rem;
	}

	#nav {
		display: flex;
		align-items: center;
	}

	.logo img {
		height: 6rem;
	}

	.logo {
		display: flex;
	}

	#nav a,
	#nav button {
		color: var(--text-color);
		font-size: var(--p-size);

		font-weight: 500;
		transition: 0.7s ease;
		display: flex;

		cursor: pointer;
		display: flex;
		align-items: center;
		margin: 0 0.25rem;
	}
	#nav a:hover,
	#nav button:hover {
		color: var(--main-color);
	}
	#nav p {
		margin: 0 0.25rem;
	}

	#nav span {
		color: #cccccc;
		font-weight: 600;
		font-size: 1.2rem;
	}
	#rightBox {
		display: none;
	}
	#rightBox a {
		color: var(--text-color);
		transition: 0.7s ease;
		cursor: pointer;
		display: flex;
		margin: 0 0.25rem;
	}
	#rightBox a:hover {
		color: var(--main-color);
	}
	#menu {
		width: 15rem;
		position: absolute;
		top: 6rem;
		right: 0.5rem;
		z-index: 999;
		border-radius: var(--cards-radius);
		display: flex;
		flex-direction: column;
		padding: 0.5rem 1rem;
		box-shadow: -2px 2px 15px 15px #2525ad10;
		background: #2525ad3b;
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
		-moz-backdrop-filter: blur(30px);
		-o-backdrop-filter: blur(30px);
		-ms-backdrop-filter: blur(30px);
	}
	#menu .icon {
		width: 1.6rem;
		height: 1.6rem;
	}
	#menu a {
		color: var(--text-color);
		display: flex;
		margin: 0.5rem 0;
		transition: 0.7s ease;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	#menu p {
		padding: 0 5px;
	}
	#menu a:hover {
		color: var(--main-color);
	}
	#menu .iconify {
		margin: 0 0.25rem;
	}
	.overlay {
		position: absolute;
		height: 70vh;
		z-index: 888;
		width: 100%;
	}
	@media (max-width: 600px) {
		#nav {
			display: none;
		}
		#rightBox {
			display: flex;
		}
	}
</style>
