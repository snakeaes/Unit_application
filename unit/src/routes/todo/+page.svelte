<script lang="ts">
	import type { Color } from '$lib/types';

	let colors: Color[] = [
		{ name: 'beige', hex: '#F2CC8F' },
		{ name: 'teal', hex: '#81B29A' },
		{ name: 'dark', hex: '#3D405B' },
		{ name: 'red', hex: '#E07A5F' },
		{ name: 'light', hex: '#F4F1DE' }
	];
</script>

<section>
	<h1 class="mb-10 text-5xl">Colors List</h1>
	<p class="mb-10 text-2xl">TODO: add colors to Tailwind config</p>
	<div class="mb-10 flex flex-wrap">
		{#each colors as color}
			<div
				class="m-4 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-zinc-400"
				style:background-color={color.hex}
			>
				<p>{color.name}</p>
			</div>
		{/each}
	</div>
</section>
