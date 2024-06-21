<script lang="ts">
	import { type Color, type Task } from '$lib/types';
	import { tasks } from '$lib/stores/tasks';
	import { chosen } from '$lib/stores/widgets';
	import { WidgetOptions } from '../../shared';
	import { fade } from 'svelte/transition';
	let colors: Color[] = [
		{ name: 'beige', hex: '#F2CC8F' },
		{ name: 'teal', hex: '#81B29A' },
		{ name: 'dark', hex: '#3D405B' },
		{ name: 'red', hex: '#E07A5F' },
		{ name: 'light', hex: '#F4F1DE' }
	];

	let active = false;
	let choose = '';
	let picked: string[] = [];

	let disabled = true;

	const toggleDisable = (): void => {
		console.log('array' + picked);
		disabled = picked.length === 0;
	};

	let message: string | undefined = undefined;

	const showMessage = () => {
		message = 'Виджет сохранен';
		setTimeout(() => {
			message = undefined;
		}, 2000);
	};

	const saveChosen = (): void => {
		$chosen = $chosen.filter((item) => item.type !== WidgetOptions.Tasks);
		picked.forEach((task) => {
			for (let i = 0; i < $tasks.length; i++) {
				if ($tasks[i].props.id === task) {
					$chosen.push($tasks[i]);
				}
			}
		});
		showMessage();
		console.log($chosen);
	};

	const getLastTask = (tasks: Task[]): void => {
		$chosen = $chosen.filter((item) => item.type !== WidgetOptions.Tasks);
		if (tasks.length === 1) {
			$chosen.push(tasks[0]);
		}
		if (tasks.length > 1) {
			tasks.sort((a, b) => {
				return Date.parse(a.props.until.toString()) - Date.parse(b.props.until.toString());
			});
			$chosen.push(tasks[tasks.length - 1]);
		}
		showMessage();
	};
</script>

<div
	style:background-color={colors[4].hex}
	class="mb-4 mr-4 w-full max-w-[700px] border-2 border-black"
>
	<div style:background-color={colors[3].hex} class="p-4">
		<h3 class="text-3xl">Задачи</h3>
	</div>
	<div class="p-4">
		<input type="checkbox" name="todo" id="todo" class="h-5 w-5" bind:checked={active} />
		<label for="todo" class="text-xl">Подключить виджет</label>
		<div class="mt-4">
			<div>
				<input
					type="radio"
					name="pick_task"
					id="latest_task"
					disabled={!active}
					value="latest_task"
					bind:group={choose}
				/>
				<label for="latest_task" class="text-xl" class:opacity-50={!active}>Ближайшая задача</label>
			</div>
			<div class="mb-4">
				<input
					type="radio"
					name="pick_task"
					id="choose_task"
					disabled={!active}
					value="choose_task"
					bind:group={choose}
				/>
				<label for="choose_task" class="text-xl" class:opacity-50={!active}>Выбрать задачи</label>
			</div>
			{#if choose === 'latest_task'}
				<div class="flex items-center">
					<button
						class="mr-2 border-2 border-black p-3 text-xl duration-100 hover:scale-105 active:opacity-80"
						style:background-color={colors[1].hex}
						class:hidden={!active}
						on:click={() => {
							getLastTask($tasks);
						}}
					>
						Сохранить
					</button>
					{#if message !== undefined}<p
							class="text-xl text-green-600"
							transition:fade={{ delay: 250, duration: 300 }}
						>
							{message}
						</p>{/if}
				</div>
			{:else if choose === 'choose_task'}
				{#each $tasks as task}
					<div>
						<input
							type="checkbox"
							name="task"
							id={task.props.id}
							class="h-5 w-5"
							bind:group={picked}
							on:change={() => {
								toggleDisable();
							}}
							value={task.props.id}
						/>
						<label for={task.props.id} class="text-xl">{task.props.title}</label>
					</div>
				{/each}
				<div class="mt-4 flex items-center">
					<button
						class="mr-2 border-2 border-black p-3 text-xl duration-100 hover:scale-105 active:opacity-80 disabled:scale-100 disabled:opacity-50"
						style:background-color={colors[1].hex}
						class:hidden={!active}
						{disabled}
						on:click={() => {
							saveChosen();
						}}
					>
						Сохранить
					</button>
					{#if message !== undefined}<p
							class="text-xl text-green-600"
							transition:fade={{ delay: 250, duration: 300 }}
						>
							{message}
						</p>{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
