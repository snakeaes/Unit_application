import { writable } from 'svelte/store';
import type { Person } from '$lib/types';
import { PersonStatus, Roles } from '../../shared';

export let people = writable<Person[]>([
	{
		id: 't9d25',
		firstname: 'Олег',
		middlename: 'Олегович',
		lastname: 'Олегов',
		phone: 89151234567,
		mail: 'deffinetly_not_oleg@mail.ru',
		department: 'Администрация',
		role: {
			priority: 0,
			name: Roles.Chief
		},
		status: { priority: 2, name: PersonStatus.Vacation },
		working_from: new Date(2024, 2, 2, 8, 30),
		working_until: new Date(2024, 11, 26, 17, 30)
	},
	{
		id: 'y9dg5',
		firstname: 'Иван',
		middlename: 'Иванович',
		lastname: 'Иванов',
		phone: 89151234567,
		mail: 'oleg@mail.ru',
		department: 'Отдел продаж',
		role: { priority: 1, name: Roles.Deputy },
		status: { priority: 0, name: PersonStatus.Work },
		working_from: new Date(2024, 11, 11, 8, 30),
		working_until: new Date(2024, 11, 26, 17, 30)
	},
	{
		id: 'lhu71',
		firstname: 'Петр',
		middlename: 'Петрович',
		lastname: 'Петров',
		phone: 89151234567,
		mail: 'oleg@mail.ru',
		department: 'Склад',
		role: { priority: 2, name: Roles.Employee },
		status: { priority: 1, name: PersonStatus.BusinessTrip },
		working_from: new Date(2024, 4, 8, 8, 30),
		working_until: new Date(2024, 7, 14, 17, 30)
	},
	{
		id: 'm11j9',
		firstname: 'Алексей',
		middlename: 'Алексеевич',
		lastname: 'Алексеев',
		phone: 89151234567,
		mail: 'oleg@mail.ru',
		department: 'Отдел кадров',
		role: { priority: 2, name: Roles.Employee },
		status: { priority: 0, name: PersonStatus.Work },
		working_from: new Date(2024, 1, 22, 8, 30),
		working_until: new Date(2024, 8, 29, 17, 30)
	},
	{
		id: 'nm2c1',
		firstname: 'Степан',
		middlename: 'Степанович',
		lastname: 'Степанов',
		phone: 89151234567,
		mail: 'oleg@mail.ru',
		department: 'Отдел кадров',
		role: { priority: 0, name: Roles.Chief },
		status: { priority: 3, name: PersonStatus.Sick },
		working_from: new Date(2024, 9, 20, 8, 30),
		working_until: new Date(2024, 10, 9, 17, 30)
	},
	{
		id: 'gguy2',
		firstname: 'Юрий',
		middlename: 'Юрьевич',
		lastname: 'Юрьев',
		phone: 89151234567,
		mail: 'oleg@mail.ru',
		department: 'Отдел кадров',
		role: { priority: 0, name: Roles.Chief },
		status: { priority: 3, name: PersonStatus.Sick },
		working_from: new Date(2024, 11, 5, 8, 30),
		working_until: new Date(2024, 11, 17, 17, 30)
	}
]);
