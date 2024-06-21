import { writable } from 'svelte/store';
import { type DocRequest } from '$lib/types';
import { DocStatus, DocTheme } from '../../shared';

// it appears using not proper string format for Date may cause invalid date instead of proper value
export let requests = writable<DocRequest[]>([
	// {
	// 	id: 'r1',
	// 	title: 'На 14 дней с 22 июля',
	// 	date: new Date('2024-03-22'),
	// 	status: DocStatus.Processing,
	// 	doc: { id: DocTheme.Vacation, title: 'Отпуск' }
	// },
	// {
	// 	id: 'r2',
	// 	title: 'Дайте денег',
	// 	date: new Date('2024-03-17'),
	// 	status: DocStatus.Denied,
	// 	doc: { id: DocTheme.Vacation, title: 'Отпуск' }
	// },
	// {
	// 	id: 'r3',
	// 	title: 'Дайте денег',
	// 	date: new Date('2024-03-03'),
	// 	status: DocStatus.Denied,
	// 	doc: { id: DocTheme.Vacation, title: 'Отпуск' }
	// },
	// {
	// 	id: 'r4',
	// 	title: 'Дайте денег',
	// 	date: new Date('2024-03-14'),
	// 	status: DocStatus.Denied,
	// 	doc: { id: DocTheme.Vacation, title: 'Отпуск' }
	// },
	// {
	// 	id: 'r5',
	// 	title: 'Отпустите',
	// 	date: new Date('2024-03-26'),
	// 	status: DocStatus.Approved,
	// 	doc: { id: DocTheme.Fire, title: 'Увольнение' }
	// }
]);
