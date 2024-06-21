<script lang="ts">
	import { requests } from '$lib/stores/requests';
	import type { DocRequest, VacationForm } from '$lib/types';
	import { DocStatus, DocTheme } from '../../shared';
	import DocsSettings from './DocsSettings.svelte';

	let link: string | undefined;
	let payload: VacationForm = {
		to: {
			name: '',
			role: ''
		},
		from: {
			name: '',
			role: ''
		},
		vacation: {
			days: '',
			since: ''
		},
		signed: {
			day: `${new Date(Date.now()).getDate()}`,
			month: 'июня'
		},
		approved: {
			status: true,
			role: '',
			name: '',
			day: '',
			month: ''
		},
		year: `${new Date(Date.now()).getFullYear()}`
	};

	const writeToStore = () => {
		let dateString = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate()}`;
		let request: DocRequest = {
			id: Date.now().toString(),
			title: `На ${payload.vacation.days} дней, с ${payload.vacation.since}`,
			date: new Date(dateString),
			status: DocStatus.Processing,
			doc: {
				id: DocTheme.Vacation,
				title: 'Отпуск'
			}
		};
		$requests.push(request);
	};

	const log = async () => {
		let url = 'http://147.45.104.199:3000/doc';
		let config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		};
		let request = await fetch(url, config);
		let response = await request.blob();
		link = URL.createObjectURL(response);
		writeToStore();
	};
</script>

<form class="flex min-w-80 flex-col pr-10">
	<h1 class="mb-4 text-2xl">Заявление</h1>
	<h2 class="mb-4 text-xl">Кому</h2>
	<label for="role">Должность</label>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name="role"
		id="role"
		placeholder="Гендиректору сэру"
		bind:value={payload.to.role}
		required
	/>
	<p>ФИО</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="Иванову И.И."
		bind:value={payload.to.name}
		required
	/>
	<h2 class="my-4 text-xl">Ваш начальник</h2>
	<p>Должность</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="Шеф"
		bind:value={payload.approved.role}
		required
	/>
	<p>ФИО</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="Иванов И.И."
		bind:value={payload.approved.name}
		required
	/>
	<h2 class="my-4 text-xl">От кого</h2>
	<p>Должность</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="Не шефа"
		bind:value={payload.from.role}
		required
	/>
	<p>ФИО</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="Иванова И.И."
		bind:value={payload.from.name}
		required
	/>
	<h2 class="my-4 text-xl">Срок</h2>
	<p>Количество дней</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="2"
		bind:value={payload.vacation.days}
		required
	/>
	<p>С ... числа</p>
	<input
		type="text"
		class="border-2 border-black p-2 focus:outline-none"
		name=""
		id=""
		placeholder="1 января"
		bind:value={payload.vacation.since}
		required
	/>
	<button
		type="submit"
		class="mt-4 border-2 border-black bg-[#81B29A] p-3 text-xl duration-100 hover:scale-105 active:opacity-80 disabled:scale-100 disabled:opacity-50"
		on:click={log}
		>Отпустите
	</button>
	{#if link !== undefined}
		<button
			type="button"
			class="mt-4 border-2 border-black bg-[#81B29A] p-3 text-xl duration-100 hover:scale-105 active:opacity-80 disabled:scale-100 disabled:opacity-50"
			><a href={link} download="vacation.pdf">Загрузить</a>
		</button>
	{/if}
</form>
