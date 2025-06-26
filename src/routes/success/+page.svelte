<script>
	import { page } from '$app/stores';
	import Header from '../components/Header.svelte';

	// Get the data passed through the URL
	let userData = {
		name: $page.url.searchParams.get('name') || '',
		email: $page.url.searchParams.get('email') || ''
	};
</script>

<Header />

<section class="success-container">
	<div class="success-card">
		<h1>Registration Successful! 🎉</h1>
		<div class="user-info">
			<h2>Welcome {userData.name}!</h2>
			<p>Your account has been created successfully.</p>
		</div>
		<a href="/login" class="continue-btn">Continue to Login</a>
	</div>
</section>

<style>
	.success-container {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.success-card {
		background: white;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		max-width: 500px;
		width: 100%;
		text-align: center;
	}

	h1 {
		color: var(--main-color);
		margin-bottom: 1.5rem;
	}

	.user-info {
		margin: 2rem 0;
		padding: 1rem;
		background: #f5f5f5;
		border-radius: 8px;
	}

	h2 {
		color: var(--text-color);
		margin-bottom: 1rem;
	}

	p {
		color: var(--p-color);
		margin: 0.5rem 0;
	}

	.continue-btn {
		display: inline-block;
		padding: 0.8rem 2rem;
		background-color: var(--main-color);
		color: white;
		text-decoration: none;
		border-radius: 5px;
		transition: background-color 0.3s ease;
	}

	.continue-btn:hover {
		background-color: #1a1a1a;
	}
</style> 