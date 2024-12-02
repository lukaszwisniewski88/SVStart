<script lang="ts">
	import type { Snippet } from 'svelte';
	const { children }: { children: Snippet } = $props();
</script>

<main class="grid min-h-screen grid-cols-1 place-items-center md:grid-cols-12 md:gap-8">
	<div class="hidden h-full w-full object-left md:col-span-4 md:block">
		<enhanced:img
			src="$lib/images/login_pure.png"
			alt="Login"
			class="h-full -scale-x-100 object-cover"
		/>
	</div>
	<div class="p-4 md:col-span-4 md:p-20">
		<h2 class="text-center text-3xl font-bold leading-relaxed">Rejestracja</h2>
		{@render children()}
	</div>
	<div class="hidden h-full w-full md:col-span-4 md:block">
		<enhanced:img src="$lib/images/login.jpg" alt="Login" class="h-full object-cover" />
	</div>
</main>
