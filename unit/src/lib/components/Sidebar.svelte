<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import expand from '$lib/icons/expand.svg';
	import home from '$lib/icons/home.svg';
	import calendar from '$lib/icons/calendar.svg';
	import docs from '$lib/icons/docs.svg';
	import todo from '$lib/icons/todo.svg';
	import apps from '$lib/icons/apps.svg';
	import settings from '$lib/icons/settings.svg';
	import people from '$lib/icons/people.svg';
	import type { Route } from '$lib/types';

	$: current = $page.url.pathname;

	let pages: Route[] = [
		{ path: '/home', title: 'Главная', icon: home },
		{ path: '/people', title: 'Сотрудники', icon: people },
		// { path: '/calendar', title: 'Календарь', icon: calendar }, not now
		{ path: '/docs', title: 'Документы', icon: docs },
		{ path: '/todo', title: 'Задачи', icon: todo },
		{ path: '/apps', title: 'Приложения', icon: apps }
	];

	const dispatch = createEventDispatcher();
	let opened: boolean = false;
	let showTitle: boolean = false;
	const toggle = () => {
		if (opened) {
			dispatch('message', {
				extend: false
			});
			showTitle = !showTitle;
		} else {
			dispatch('message', {
				extend: true
			});
			setTimeout(() => (showTitle = !showTitle), 500);
		}
		opened = !opened;
	};
</script>

<nav
	class="fixed flex h-full flex-col border-r border-black py-4 transition-all duration-500"
	class:w-52={opened}
	class:w-20={!opened}
>
	<button type="button" on:click={toggle} class="mb-4 ml-4 flex cursor-pointer items-center"
		><img
			src={expand}
			alt="expand"
			class="mr-8 h-12 w-12 transition-all duration-500"
			class:rotate-180={opened}
			class:mr-2={opened}
		/><span class="mr-2 overflow-hidden transition-all duration-500">Скрыть</span></button
	>

	{#each pages as page}
		<a
			href={page.path}
			class="my-4 flex w-full items-center pl-4"
			class:text-rose-600={current === page.path}
		>
			<div class="flex h-12 w-full items-center">
				<img
					src={page.icon}
					alt="page"
					class="mr-8 h-12 w-12 transition-all duration-500"
					class:mr-2={opened}
					class:active={current === page.path}
				/><span class="overflow-hidden transition-all duration-500">{page.title}</span>
			</div>
		</a>
	{/each}
	<a
		href="/settings"
		class="absolute bottom-2 left-0 my-4 flex w-full items-center pl-4"
		class:text-rose-600={current === '/settings'}
	>
		<div class="flex h-12 w-full items-center">
			<img
				src={settings}
				alt="page"
				class="mr-8 h-12 w-12 transition-all duration-500"
				class:mr-2={opened}
				class:active={current === '/settings'}
			/><span class="overflow-hidden transition-all duration-500">Настройки</span>
		</div>
	</a>
</nav>

<style>
	.active {
		filter: invert(19%) sepia(94%) saturate(2908%) hue-rotate(334deg) brightness(90%) contrast(97%);
	}
</style>
