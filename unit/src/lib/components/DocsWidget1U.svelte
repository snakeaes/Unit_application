<script lang="ts">
	import { type Color, type DocWidget } from '$lib/types';
	import { DocStatus } from '../../shared';
	export let item: DocWidget;

	// let U1 = 384;
	// let widthU1 = `w-[${U1}px]`;

	let colors: Color[] = [
		{ name: 'beige', hex: '#F2CC8F' },
		{ name: 'teal', hex: '#81B29A' },
		{ name: 'dark', hex: '#3D405B' },
		{ name: 'red', hex: '#E07A5F' },
		{ name: 'light', hex: '#F4F1DE' }
	];

	const setDateDelay = (date: Date): string => {
		let diff = Math.floor((+Date.now() - +date) / 1000 / 60 / 60 / 24);
		if (diff > 6) {
			return 'text-rose-600';
		} else if (diff > 4) {
			return 'text-yellow-600';
		} else if (diff < 6) {
			return 'text-green-600';
		}
		return 'text-gray-400';
	};

	const setStatus = (status: DocStatus): string => {
		switch (status) {
			case DocStatus.NotOpened:
				return 'text-gray-400';
			case DocStatus.Processing:
				return 'text-yellow-600';
			case DocStatus.Denied:
				return 'text-rose-600';
			case DocStatus.Approved:
				return 'text-green-600';
			default:
				return 'text-gray-400';
		}
	};
</script>

<div class="mr-3 mt-3 h-96 min-w-96" style:background-color={colors[2].hex}>
	<div
		class="flex h-full w-full flex-col overflow-scroll border-2 border-slate-700 transition-all duration-100 hover:-translate-y-1 hover:translate-x-1"
	>
		<div class="flex h-1/5 min-h-[76px] w-full items-center" style:background-color={colors[1].hex}>
			<h2 class="p-2 text-3xl">Последние заявки</h2>
		</div>
		<div
			class="flex h-4/5 w-full flex-col justify-between p-4"
			style:background-color={colors[4].hex}
		>
			<ul class=" ml-4 list-outside list-disc">
				{#each item.items as request}
					<li class="mb-2">
						<div>
							<h2 class="text-xl">
								<span class="border border-black bg-slate-300 p-1 text-lg font-light"
									>{request.doc.title}</span
								>
								{request.title}
							</h2>
							<p>
								Отправлено: <span class={setDateDelay(request.date)}
									>{request.date.toLocaleDateString('ru-RU')}</span
								>
							</p>
							<p>
								Статус: <span class={setStatus(request.status)}>{request.status}</span>
							</p>
						</div>
					</li>
				{/each}

				<!-- <li class="mb-2">
					<div>
						<h2 class="text-xl">Дайте денег</h2>
						<p>Отправлено: <span class=" text-yellow-600">14.03.2024</span></p>
						<p>Статус: <span class="text-yellow-600">на рассмотрении</span></p>
					</div>
				</li>
				<li class="mb-2">
					<div>
						<h2 class="text-xl">Дайте денег</h2>
						<p>Отправлено: <span class="text-green-600">20.03.2024</span></p>
						<p>Статус: <span class="text-green-600">одобрено</span></p>
					</div>
				</li> -->
			</ul>
		</div>
	</div>
</div>
