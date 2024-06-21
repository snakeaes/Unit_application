<script lang="ts">
	import { people } from '$lib/stores/people';
	import type { Person, PersonPresent } from '$lib/types';
	import { PersonStatus, SortPeople, type Roles } from '../../shared';
	let fields = [
		{
			id: SortPeople.Name,
			title: 'ФИО'
		},
		{
			id: SortPeople.Phone,
			title: 'Телефон'
		},
		{
			id: SortPeople.Mail,
			title: 'Почта'
		},
		{
			id: SortPeople.Department,
			title: 'Отдел'
		},
		{
			id: SortPeople.Role,
			title: 'Должность'
		},
		{
			id: SortPeople.Status,
			title: 'Статус'
		},
		{
			id: 'schedule',
			title: 'График'
		}
	];

	let show: string | null = '';

	let search = '';

	let render = 'collapse';

	let employees: PersonPresent[] = [];

	const toggle = (id: string) => {
		// render = false;
		show = show === id ? null : id;
		render = show !== null ? 'visible' : 'collapse';
		// setTimeout(() => {
		// 	render = true;
		// }, 50);
	};
	let row: HTMLElement;
	// let content: ChildNode;
	const showDetails = (event: Event) => {
		row = event.target?.closest('tr');
		let details = row.nextElementSibling;
		let content = details?.childNodes[0].childNodes[0];
		if (details?.classList.contains('collapse')) {
			details.classList.remove('collapse');
			content?.classList.add('expanded');
			content?.classList.remove('closed');
		} else {
			content.classList.remove('expanded');
			content.classList.add('closed');
			setTimeout(() => {
				details.classList.add('collapse');
			}, 300);
		}
	};

	const setStatus = (status: PersonStatus): string => {
		switch (status) {
			case PersonStatus.BusinessTrip:
				return 'text-blue-400';
			case PersonStatus.Sick:
				return 'text-rose-600';
			case PersonStatus.Vacation:
				return 'text-yellow-600';
			case PersonStatus.Work:
				return 'text-green-600';
			default:
				return 'text-gray-400';
		}
	};

	const formatSchedule = (person: Person): string => {
		let schedule = '';
		if (person.status.name === PersonStatus.Work) {
			let from = person.working_from.toLocaleTimeString('ru-RU').slice(0, -3);
			let until = person.working_until.toLocaleTimeString('ru-RU').slice(0, -3);
			schedule = `${from} - ${until}`;
		} else {
			let from = person.working_from.toLocaleDateString('ru-RU');
			let until = person.working_until.toLocaleDateString('ru-RU');
			schedule = `${from} - ${until}`;
		}
		return schedule;
	};

	const getTableContent = () => {
		employees = [];
		$people.forEach((person) => {
			employees.push({
				id: person.id,
				fullname: `${person.lastname} ${person.firstname} ${person.middlename}`,
				phone: person.phone,
				mail: person.mail,
				department: person.department,
				role: person.role,
				status: person.status,
				schedule: formatSchedule(person)
			});
		});
	};

	const sortAlpha = () => {
		employees = employees.sort((a, b) => {
			if (a.fullname < b.fullname) {
				return -1;
			}
			if (a.fullname > b.fullname) {
				return 1;
			}
			return 0;
		});
	};

	const sortDepartment = () => {
		employees = employees.sort((a, b) => {
			if (a.department < b.department) {
				return -1;
			}
			if (a.department > b.department) {
				return 1;
			}
			return 0;
		});
	};

	const sortRole = () => {
		employees = employees.sort((a, b) => {
			if (a.role.priority < b.role.priority) {
				return -1;
			}
			if (a.role.priority > b.role.priority) {
				return 1;
			}
			return 0;
		});
	};

	const sortStatus = () => {
		employees = employees.sort((a, b) => {
			if (a.status.priority < b.status.priority) {
				return -1;
			}
			if (a.status.priority > b.status.priority) {
				return 1;
			}
			return 0;
		});
	};

	const findEmployee = () => {
		getTableContent();
		let filtered = employees.filter((person) => {
			return person.fullname.toLowerCase().includes(search.toLowerCase());
		});
		employees = filtered;
	};

	getTableContent();
</script>

<h1 class="mb-5 text-3xl">Сотрудники</h1>
<div class="flex">
	<input
		bind:value={search}
		on:input={() => {
			findEmployee();
		}}
		type="text"
		placeholder="Найти"
		class="mr-2 border-2 border-black p-2 focus:outline-none"
	/>
	<button
		class="mr-2 border-2 border-black bg-[#81B29A] p-2 active:scale-105"
		on:click={() => {
			sortAlpha();
		}}>По алфавиту</button
	>
	<button
		on:click={() => {
			sortDepartment();
		}}
		class="mr-2 border-2 border-black bg-[#81B29A] p-2 active:scale-105">По отделу</button
	>
	<button
		on:click={() => sortRole()}
		class="mr-2 border-2 border-black bg-[#81B29A] p-2 active:scale-105">По должности</button
	>
	<button
		on:click={() => {
			sortStatus();
		}}
		class="mr-2 border-2 border-black bg-[#81B29A] p-2 active:scale-105">По статусу</button
	>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<table class="mt-5 w-4/5 table-auto border-collapse border-2 border-black bg-[#F4F1DE] p-4">
	<thead class="bg-[#3D405B]">
		<tr class="text-[#F4F1DE]">
			{#each fields as field}
				<th class="border border-black p-2" id={field.id}>{field.title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each employees as person}
			<tr id={person.id}>
				<td class="border border-black p-2">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<p
						class="cursor-pointer font-medium underline"
						on:click|self={(e) => {
							showDetails(e);
							toggle(person.id);
						}}
					>
						{person.fullname}
					</p></td
				>
				<td class="border border-black p-2">{person.phone}</td>
				<td class="border border-black p-2"
					><a href="mailto:{person.mail}" class="underline">{person.mail}</a></td
				>
				<td class="border border-black p-2"
					><a href="https://tlgrm.ru/stickers/kontorapidarasov" class="font-medium underline"
						>{person.department}</a
					></td
				>
				<td class="border border-black p-2">{person.role.name}</td>
				<td class="border border-black p-2"
					><p class={setStatus(person.status.name)}>{person.status.name}</p>
				</td>
				<td class="border border-black p-2 font-medium">{person.schedule}</td>
			</tr>
			<!-- {#if show === person.id} -->
			<tr class="details-row collapse w-full overflow-hidden" bind:this={row}>
				<td colspan="7">
					<div class="detailed h-0 overflow-hidden">
						<h1 class="text-3xl">Hello {person.fullname}</h1>
						<p>
							Спорный момент, с одной стороны, полезно для вывода полной информации, с другой, а
							какая еще информация тут может понадобиться, так как её было бы логичнее и удобнее
							искать в соответствующих разделах
						</p>
						<p>
							Questionable decision, on one hand, it's really good for providing all info, on the
							other hand, what else may be necessary except already existing. It seems additional
							info would be more suitable in corresponding sections of the app.
						</p>
					</div>
				</td>
			</tr>
			<!-- {/if} -->
		{/each}
	</tbody>
</table>

<style>
	.detailed {
		transition: all 0.3s linear;
	}
	.closed {
		height: 0;
	}
	.expanded {
		height: 150px;
	}
</style>
