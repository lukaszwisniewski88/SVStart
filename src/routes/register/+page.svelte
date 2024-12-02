<script lang="ts">
	import RegisterForm from '$lib/core/authentication/Forms/RegisterForm.svelte';
	import logo_pic from '$lib/images/LOGO_PR.png';
	import { Button } from '$lib/core/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#snippet login()}
	<Button variant="outline" size="sm" href="/login" class="text-sm text-primary"
		>Mam już konto</Button
	>
{/snippet}
{#snippet logo()}
	<enhanced:img src="$lib/images/LOGO_PR.png" alt="Logo" class="mx-auto my-4 h-20 w-20" />
{/snippet}

<RegisterForm formData={data.form} loginLink={login} {logo} />
