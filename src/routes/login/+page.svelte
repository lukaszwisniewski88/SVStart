<script lang="ts">
	import PasswordLoginForm from '$lib/core/authentication/Forms/PasswordLoginForm.svelte';
	import { Button } from '$lib/core/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#snippet registrationLink()}
	<Button variant="outline" size="sm" href="/register" class="text-sm text-primary"
		>Zarejestruj się</Button
	>
{/snippet}

<PasswordLoginForm formData={data.form} {registrationLink} logo_url="/images/LOGO_PR.png" />
