<script lang="ts">
	import DocsWidget1U from '$lib/components/DocsWidget1U.svelte';
	import TaskWidget1U from '$lib/components/TaskWidget1U.svelte';
	import { type Widget } from '$lib/types';
	import { chosen } from '$lib/stores/widgets';
	import { WidgetOptions } from '../../shared';
	import { requests } from '$lib/stores/requests';

	const getWidget = (pick: WidgetOptions): Widget => {
		switch (pick) {
			case WidgetOptions.Docs:
				return DocsWidget1U;
			case WidgetOptions.Tasks:
				return TaskWidget1U;
		}
	};
</script>

<section>
	<h1 class="mb-10 text-5xl">Добрый вечер, Username</h1>
	{#if $chosen.length === 0}
		<p>
			Вы можете включить в <a href="/settings" class="text-rose-600">настройках</a> отображение виджетов
			для наиболее важных тем
		</p>
	{/if}
	<p></p>
	<div class="flex flex-wrap">
		{#key $chosen}
			{#each $chosen as item}
				<svelte:component this={getWidget(item.type)} {item}></svelte:component>
			{/each}
		{/key}
	</div>
</section>
