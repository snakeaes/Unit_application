<script lang="ts">
	import { DocTheme } from '../../shared.js';
	import VacationTemplate from '$lib/components/VacationTemplate.svelte';

	let template: DocTheme | undefined;
</script>

<h1 class="mb-4 text-3xl">Документооборот</h1>
<section class="flex min-h-[85vh]">
	<div class="w-1/3 border-r border-r-black">
		<select
			bind:value={template}
			class="my-4 cursor-pointer border-2 border-black bg-white py-2 pl-4 pr-8 text-xl active:opacity-50"
		>
			<option selected disabled value={undefined}>Выберите тему:</option>
			<option value={DocTheme.Vacation}>Отпуск</option>
			<option value={DocTheme.Fire}>Увольнение</option>
		</select>
		{#if template === DocTheme.Vacation}
			<VacationTemplate></VacationTemplate>
		{:else if template === DocTheme.Fire}
			<h1 class="mb-4 text-3xl">Данный шаблон не загружен</h1>
			<p class="text-lg">Обратитесь к администратору</p>
		{/if}
	</div>
	<div class="w-2/3"></div>
</section>

<style>
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
	}

	select {
		background-image: url('src/lib/icons/arrow_down.svg');
		background-repeat: no-repeat, repeat;
		background-position:
			right 0.2em top 50%,
			0 0;
		background-size:
			1.5em auto,
			100%;
	}
</style>
