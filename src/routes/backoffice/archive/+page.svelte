<script>
	// @ts-nocheck

	import Icon from '@iconify/svelte';
	import Header from '../../components/Header.svelte';
	import { translations } from '$lib/stores/translation';
	import { language } from '$lib/stores/language';
	import { onMount, afterUpdate, getContext } from 'svelte';
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	export let archive = [
		{
			id: 'abc123',
			title: 'Math Quiz',
			code: 'MATH2024',
			type: 'Taken',
			date: '2025-05-15',
			score: '85%'
		},
		{
			id: 'def456',
			title: 'Science Test',
			code: 'SCI2025',
			type: 'Created',
			date: '2025-05-10',
			score: null
		},
		{
			id: 'ghi789',
			title: 'English Exam',
			code: 'ENG2025',
			type: 'Taken',
			date: '2025-04-29',
			score: '92%'
		}
	];

	let archivedTests = [];

	onMount(() => {
		const storedTests = JSON.parse(localStorage.getItem('tests')) || [];
		archivedTests = storedTests;
	});
</script>

<Header />

<section>
	<div class="archive-section">
		<h2 style="margin-bottom: 16px;">📦 Archived Tests</h2>

		{#if archivedTests.length === 0}
			<p>No archived tests found.</p>
		{:else}
			<table class="archive-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Description</th>
						<th>Questions</th>
						<th>Code</th>
					</tr>
				</thead>
				<tbody>
					{#each archivedTests as test, index}
						<tr>
							<td>{index + 1}</td>
							<td>{test.title}</td>
							<td>{test.description}</td>
							<td>{test.questions.length}</td>
							<td>{test.code || '—'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</section>

<style>
	section {
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.archive-section {
		min-height: 70vh;
		width: var(--width);
		max-width: var(--max-width);

		margin: 0 auto;
		padding: 20px;
	}

	.buttons {
		display: flex;
	}

	.createBtn {
		padding: 0rem 1.7rem;
		height: 4rem;
		border-radius: var(--buttons-radius);
		background-color: var(--main-color);
		color: var(--background-color);
		font-size: var(--p-size);
		font-weight: 500;
		transition: 0.7s ease;
		filter: drop-shadow(0 0 0px var(--main-color));
		margin: 0.25rem;
		display: flex;
		align-items: center;
	}
	.createBtn:hover {
		filter: drop-shadow(0 0 10px var(--main-color));
	}

	.joinBtn {
		padding: 0rem 1.7rem;
		height: 4rem;
		border-radius: var(--buttons-radius);
		background-color: var(--second-color);
		color: var(--background-color);
		font-size: var(--p-size);
		font-weight: 500;
		transition: 0.7s ease;
		filter: drop-shadow(0 0 0px var(--second-color));
		margin: 0.25rem;
		display: flex;
		align-items: center;
	}
	.joinBtn:hover {
		filter: drop-shadow(0 0 10px var(--second-color));
	}

	.svgImg {
		width: 100%;
		max-width: 25rem;
	}

	.svgImg path {
		stroke: #7b70ee; /* Match your fill color */
		stroke-width: 1;
		fill-opacity: 0; /* Hide fill initially */
		animation: draw 2s ease forwards;
	}

	@keyframes draw {
		from {
			stroke-dasharray: 1000;
			stroke-dashoffset: 1000;
			fill-opacity: 0;
		}
		to {
			stroke-dashoffset: 0;
			fill-opacity: 1;
		}
	}

	.archive-container {
		padding: 16px;
		font-family: sans-serif;
	}

	.archive-title {
		font-size: 1.25rem;
		font-weight: bold;
		margin-bottom: 16px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid #ddd;
		font-size: var(--p-size);
	}

	thead {
		background-color: #f2f2f2;
	}

	th,
	td {
		text-align: left;
		padding: 8px;
		border: 1px solid #ddd;
		width: 15rem;
	}

	tbody tr:hover {
		background-color: #f9f9f9;
		transition: background-color 0.2s;
	}

	.type-created {
		color: green;
	}

	.type-taken {
		color: blue;
	}

	.score-empty {
		color: #999;
	}

	.code {
		font-family: monospace;
	}
</style>
