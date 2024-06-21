import { writable } from 'svelte/store';
import { type Task } from '$lib/types';
import { Priority, Status, WidgetOptions } from '../../shared';
export let tasks = writable<Task[]>([
	{
		type: WidgetOptions.Tasks,
		props: {
			id: 't1',
			description:
				'Tip: можно вывести закономерность, при которой срок будет зеленым если времени еще есть, желтым если не ок, и красным если все горит можно вывести закономерность, при которой срок будет зеленым если времени еще есть, желтым если не ок, и красным если все горит',
			from: 'Олег',
			title: 'Сделать что-нибудь не знаю что, нужно умное название',
			to: 'Я',
			status: Status.InProgress,
			project: 'Личное',
			priority: Priority.High,
			created_at: new Date('03.22.2024'),
			until: new Date('03.30.2024'),
			hint: 'Поле для отображения шпаргалок для себя, что куда и кому надо сделать'
		}
	},
	{
		type: WidgetOptions.Tasks,
		props: {
			id: 't2',
			description: 'Чисто опробовать',
			from: 'Олег',
			title: 'Т3',
			to: 'Я',
			status: Status.Planned,
			project: 'Работа',
			priority: Priority.Low,
			created_at: new Date('03.25.2024'),
			until: new Date('04.29.2024'),
			hint: 'Поле для отображения шпаргалок для себя, что куда и кому надо сделать'
		}
	}
]);
