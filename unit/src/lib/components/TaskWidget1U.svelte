<script lang="ts">
	import type { Color, Task } from '$lib/types';

	export let item: Task;

	let colors: Color[] = [
		{ name: 'beige', hex: '#F2CC8F' },
		{ name: 'teal', hex: '#81B29A' },
		{ name: 'dark', hex: '#3D405B' },
		{ name: 'red', hex: '#E07A5F' },
		{ name: 'light', hex: '#F4F1DE' }
	];
</script>

<div class="mr-3 mt-3 h-96 w-96 min-w-96" style:background-color={colors[2].hex}>
	<div
		class="flex h-full w-full flex-col border-2 border-slate-700 transition-all duration-100 hover:-translate-y-1 hover:translate-x-1"
	>
		<div class="flex h-[76px] w-full items-center" style:background-color={colors[1].hex}>
			<h2 class="p-2 text-3xl">Ближайшая задача</h2>
		</div>
		<div
			class="flex h-4/5 w-full flex-col justify-between p-4"
			style:background-color={colors[4].hex}
		>
			<div>
				<div>
					<h3 class="mb-1 line-clamp-1 text-xl font-bold">
						{item.props.title}
					</h3>
					<p class="my-1 line-clamp-3">
						{item.props.description}
					</p>
					<div class="mt-3 flex justify-between">
						<p>Статус: <span class="text-green-600">{item.props.status}</span></p>
						<p>Приоритет: <span class="text-rose-600">{item.props.priority}</span></p>
					</div>
					<div class="mb-3 flex justify-between">
						<p>Автор: <span class="font-bold">{item.props.from}</span></p>
						<p>Проект: <span class="font-bold">{item.props.project}</span></p>
					</div>
					<div class="my-1 flex items-center justify-between">
						<div>
							<p>Сдать до:</p>
							<span class="text-rose-600">{item.props.until.toLocaleDateString('ru-RU')}</span>
						</div>
						<button
							class="p-2 transition-all duration-100 hover:scale-105 active:opacity-70"
							style:background-color={colors[1].hex}
							>Пометить как выполненное
						</button>
					</div>
				</div>
			</div>
			<div class="border-t-2 pt-2" style:border-color={colors[3].hex}>
				<p class="line-clamp-1 italic">
					{item.props.hint}
				</p>
			</div>
		</div>
	</div>
</div>
