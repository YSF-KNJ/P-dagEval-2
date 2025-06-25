<script>
	import Icon from '@iconify/svelte';
</script>

<div class="slideshow">
	<div class="card-container">
		{#each [1, 2, 3, 4, 5, 6, 7] as item}
			<div class="card">
				this is div number {item}
			</div>
		{/each}
	</div>
</div>

<style>
	.slideshow {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		text-align: center;
	}

	.card-container {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		overflow-y: auto;
		padding: 1rem 0;

		&::-webkit-scrollbar {
			width: 0.8rem;
			height: 0.8rem;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--main-color);
			width: 3rem !important;
			border-radius: 5rem;
		}
	}

	.card {
		border: 1px solid var(--input-color);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		cursor: pointer;

		background-color: #f0f0f0;
		border-radius: 1.3rem;
		padding: 20px;
		max-width: 20rem;
		min-width: 12rem;
		width: 100%;
		margin: 0 1rem 0 0;
		min-height: 10rem;
	}

	h3 {
		margin: 0;
		font-size: 1.5rem;
	}

	p {
		font-size: 1rem;
		margin-top: 10px;
	}

	button {
		display: flex;
		color: var(--main-color);
		border: none;
		cursor: pointer;
		transition: 0.7s ease;
	}

	button:hover {
		filter: drop-shadow(0 0 10px var(--main-color));
	}

	/* Adjust grid for smaller screens */
	@media (max-width: 900px) {
		.card-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.card-container {
			grid-template-columns: 1fr;
		}
	}
</style>
