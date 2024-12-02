<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<main class="grid min-h-screen grid-cols-1 place-items-center md:grid-cols-8 md:gap-8">
	<div class="p-4 md:col-span-2 md:p-20">
		<h2 class="text-center text-3xl font-bold leading-relaxed">Logowanie</h2>
		{@render children()}
	</div>

	<div class="hidden h-full w-full md:col-span-6 md:block">
		<enhanced:img src="$lib/images/login.jpg" alt="Login" class="h-full object-cover" />
	</div>
</main>
