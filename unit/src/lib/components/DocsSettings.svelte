<script lang="ts">
	import { type Color, type DocRequest, type DocSort, type DocWidget } from '$lib/types';
	import { chosen } from '$lib/stores/widgets';
	import { requests } from '$lib/stores/requests';
	import { DocSortOptions, DocStatus, WidgetOptions } from '../../shared';
	import { fade } from 'svelte/transition';

	let colors: Color[] = [
		{ name: 'beige', hex: '#F2CC8F' },
		{ name: 'teal', hex: '#81B29A' },
		{ name: 'dark', hex: '#3D405B' },
		{ name: 'red', hex: '#E07A5F' },
		{ name: 'light', hex: '#F4F1DE' }
	];

	let sorted: DocRequest[];

	let message: string | undefined = undefined;

	const sortLatest = (option: string, template?: string): DocRequest[] => {
		switch (option) {
			case DocSortOptions.Latest:
				sorted = $requests.toSorted((a, b) => {
					return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
				}); // ascending
				sorted = sorted.slice(-3).reverse();
				return sorted;
			case DocSortOptions.Unclosed:
				sorted = $requests.toSorted((a, b) => {
					return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
				}); // ascending
				sorted = sorted.filter(
					(item) => item.status != DocStatus.Approved && item.status != DocStatus.Denied
				);
				sorted = sorted.slice(-3).reverse();
				return sorted;
			case DocSortOptions.Template:
				sorted = $requests.toSorted((a, b) => {
					return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
				}); // ascending
				sorted = sorted.filter((item) => item.doc.id === template);
				sorted = sorted.slice(-3).reverse();
				return sorted;
			default:
				return sorted;
		}
	};

	let options: DocSort[] = [
		{
			id: DocSortOptions.Latest,
			title: 'Вывести последние заявки'
		},
		{
			id: DocSortOptions.Unclosed,
			title: 'Вывести последние незакрытые заявки'
		},
		{
			id: DocSortOptions.Template,
			title: 'Вывести последние заявки по теме:'
		}
	];

	let templates = $requests.filter((value, index, self) => {
		return self.findIndex((v) => v.doc.id === value.doc.id) === index;
	});

	let active = false;
	let choose = '';
	let template: string | undefined = undefined;

	const showMessage = () => {
		message = 'Виджет сохранен';
		setTimeout(() => {
			message = undefined;
		}, 2000);
	};

	const saveChosen = (option: string, template?: string): void => {
		let widget: DocWidget = {
			type: WidgetOptions.Docs,
			items: []
		};
		$chosen = $chosen.filter((item) => item.type !== WidgetOptions.Docs);
		if (option == DocSortOptions.Template) {
			widget.items = sortLatest(option, template);
		} else {
			widget.items = sortLatest(option);
		}
		$chosen.push(widget);
		console.log($chosen);

		showMessage();
	};
</script>

<div
	style:background-color={colors[4].hex}
	class="mb-4 mr-4 w-full max-w-[700px] border-2 border-black"
>
	<div style:background-color={colors[3].hex} class="p-4">
		<h3 class="text-3xl">Заявки</h3>
	</div>
	<div class="p-4">
		<input type="checkbox" name="req" id="req" class="h-5 w-5" bind:checked={active} />
		<label for="req" class="text-xl">Подключить виджет</label>
		<div class="mt-4">
			{#each options as option}
				<div>
					<input
						type="radio"
						name="pick_doc"
						id={option.id}
						disabled={!active}
						value={option.id}
						bind:group={choose}
					/>
					<label for={option.id} class="text-xl" class:opacity-50={!active}>{option.title}</label>
				</div>
			{/each}

			{#if choose === 'template_req'}
				<div>
					<select
						bind:value={template}
						name="template"
						id="template"
						class="mt-4 cursor-pointer border-2 border-black bg-transparent py-2 pl-4 pr-8 text-xl active:opacity-50"
					>
						<option selected disabled value={undefined}>Выберите тему:</option>
						{#each templates as item}
							<option value={item.doc.id}>{item.doc.title}</option>
						{/each}
					</select>
				</div>

				<div class="mt-4 flex items-center">
					<button
						class="mr-2 border-2 border-black p-3 text-xl duration-100 hover:scale-105 active:opacity-80 disabled:scale-100 disabled:opacity-50"
						style:background-color={colors[1].hex}
						class:hidden={!active}
						disabled={template === undefined}
						on:click={() => {
							saveChosen(choose, template);
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
			{:else if choose !== ''}
				<div class="mt-4 flex items-center">
					<button
						class="mr-2 border-2 border-black p-3 text-xl duration-100 hover:scale-105 active:opacity-80 disabled:scale-100 disabled:opacity-50"
						style:background-color={colors[1].hex}
						class:hidden={!active}
						on:click={() => {
							saveChosen(choose);
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
