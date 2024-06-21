import { writable } from 'svelte/store';
import type { WidgetProps } from '$lib/types';

export let chosen = writable<WidgetProps[]>([]);
