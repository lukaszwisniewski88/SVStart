<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '@iconify/svelte';
	const { children }: { children: Snippet } = $props();
</script>

<main class="grid h-screen grid-cols-1 md:grid-cols-12">
	<nav class="hidden h-full w-3/4 rounded-r-lg bg-primary md:col-span-1 md:block">
		<enhanced:img
			src="$lib/images/LOGO_PR.png"
			alt="Logo"
			class="mx-auto my-6 aspect-square w-1/2"
		/>
		<ul class="mt-12 flex flex-col items-center justify-start">
			<li class="py-4 transition-all">
				<a href="/panel" class=" group text-secondary hover:text-blue-400">
					<Icon icon="bi:house-door" width="32" height="32" />
				</a>
			</li>
			<li class="py-4">
				<a href="/panel/users" class="text-secondary">
					<Icon icon="bi:people" width="32" height="32" />
				</a>
			</li>
			<li class="py-4">
				<a href="/panel/roles" class="text-secondary">
					<Icon icon="bi:shield" width="32" height="32" />
				</a>
			</li>
			<li class="py-4">
				<a href="/panel/permissions" class="text-secondary">
					<Icon icon="bi:gear" width="32" height="32" />
				</a>
			</li>
		</ul>
	</nav>
	<section class="col-span-11 mt-2 overflow-y-auto overflow-x-clip p-2">
		<h2 class="text-5xl font-semibold">Nagłówek</h2>
		{@render children()}
	</section>
</main>
