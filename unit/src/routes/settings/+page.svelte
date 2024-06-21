<script lang="ts">
	import TaskSettings from '$lib/components/TaskSettings.svelte';
	import DocsSettings from '$lib/components/DocsSettings.svelte';
</script>

<h1 class="mb-10 text-5xl">Settings</h1>
<h2 class="mb-10 text-3xl">Модули</h2>
<div class="flex flex-wrap">
	<TaskSettings></TaskSettings>
	<DocsSettings></DocsSettings>
</div>
