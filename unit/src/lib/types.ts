import DocsWidget1U from '$lib/components/DocsWidget1U.svelte';
import TaskWidget1U from '$lib/components/TaskWidget1U.svelte';
import {
	type DocStatus,
	PersonStatus,
	type Priority,
	Roles,
	type Status,
	type WidgetOptions
} from '../shared';

export type Route = {
	path: string;
	title: string;
	icon: string;
};

export type Color = {
	name: string;
	hex: string;
};

export type DocRequest = {
	id: string;
	title: string;
	date: Date;
	status: DocStatus;
	doc: DocTemplate;
};

export type DocWidget = {
	type: WidgetOptions.Docs;
	items: DocRequest[];
};

export type Task = {
	type: WidgetOptions.Tasks;
	props: {
		id: string;
		title: string;
		description: string;
		from: string;
		to: string;
		status: Status;
		project: string;
		priority: Priority;
		created_at: Date;
		until: Date;
		hint: string;
	};
};

export type DocTemplate = {
	id: string;
	title: string;
};

export type DocSort = { id: string; title: string };

export type WidgetProps = Task | DocWidget;

export type Widget = typeof DocsWidget1U | typeof TaskWidget1U;

export type Person = {
	id: string;
	firstname: string;
	middlename: string;
	lastname: string;
	phone: number;
	mail: string;
	department: string;
	role: {
		priority: number;
		name: Roles;
	};
	status: { priority: number; name: PersonStatus };
	working_from: Date;
	working_until: Date;
};

export type PersonPresent = {
	id: string;
	fullname: string;
	phone: number;
	mail: string;
	department: string;
	role: {
		priority: number;
		name: Roles;
	};
	status: { priority: number; name: PersonStatus };
	schedule: string;
};

type VacationPerson = {
	name: string;
	role: string;
};

type VacationSigned = {
	day: string;
	month: string;
};

type VacationLength = {
	days: string;
	since: string;
};

type VacationApproved = {
	status: boolean;
	role: string;
	name: string;
	day: string;
	month: string;
};

export type VacationForm = {
	to: VacationPerson;
	from: VacationPerson;
	vacation: VacationLength;
	signed: VacationSigned;
	approved: VacationApproved;
	year: string;
};
