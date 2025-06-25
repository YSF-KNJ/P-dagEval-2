<script lang="ts">
	// @ts-nocheck

	import { onMount } from 'svelte';
	let test = null;
	let answers = [];

	onMount(() => {
		test = JSON.parse(localStorage.getItem('activeTest'));
		if (test) {
			answers = Array(test.questions.length).fill(null);
		}
	});

	function submitAnswers() {
		let correctCount = 0;

		test.questions.forEach((q, i) => {
			const user = answers[i];
			const correct = q.correctAnswers;

			if (q.type === 'radio') {
				if (parseInt(user) === correct[0]) correctCount++;
			} else if (q.type === 'checkbox') {
				const sortedUser = (user || []).sort();
				const sortedCorrect = correct.slice().sort();
				if (JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect)) correctCount++;
			}
		});

		alert(`You scored ${correctCount}/${test.questions.length}`);
	}
</script>

{#if test}
	<h1>{test.title}</h1>
	<form onsubmit={submitAnswers}>
		{#each test.questions as q, i}
			<div style="margin-bottom: 1em;">
				<p><strong>Q{i + 1}:</strong> {q.text}</p>

				{#each q.options as opt, j}
					<label>
						{#if q.type === 'radio'}
							<input type="radio" bind:group={answers[i]} value={j} />
						{:else if q.type === 'checkbox'}
							<input
								type="checkbox"
								checked={answers[i]?.includes(j)}
								onchange={() => {
									if (!answers[i]) answers[i] = [];
									if (answers[i].includes(j)) {
										answers[i] = answers[i].filter((v) => v !== j);
									} else {
										answers[i] = [...answers[i], j];
									}
								}}
							/>
						{/if}
						{opt}
					</label><br />
				{/each}

				{#if answers[i] !== null}
					<p><em>Explanation: {q.explanation}</em></p>
				{/if}
			</div>
		{/each}

		<button type="submit">Submit Test</button>
	</form>
{:else}
	<p>Loading test...</p>
{/if}
