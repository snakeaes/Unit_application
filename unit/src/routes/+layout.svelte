<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/roboto-condensed';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { fade } from 'svelte/transition';

	export let data;
	let extend: boolean | undefined;
	const updateWidth = (event: { detail: { extend: boolean } }) => {
		if (data.pathname !== '/') {
			extend = event.detail.extend;
		} else {
			extend = undefined;
		}
	};
</script>

<main>
	{#if data.pathname !== '/'}
		<Sidebar on:message={updateWidth} />
	{/if}
	{#key data.pathname}
		<div
			in:fade={{ duration: 200, delay: 300 }}
			out:fade={{ duration: 200 }}
			class="flex min-h-screen flex-col p-10 transition-all duration-500"
			class:ml-20={!extend}
			class:ml-52={extend}
			class:items-center={data.pathname === '/'}
			class:justify-center={data.pathname === '/'}
			class:ml-0={data.pathname === '/'}
		>
			<slot />
		</div>
	{/key}
</main>

<style>
	:global(body) {
		font-family: 'Roboto Condensed Variable', sans-serif;
		background-color: #f2cc8f;
	}
</style>
