<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { passwordLoginSchema } from './passwordLogin.form';
	import * as Form from '$lib/core/components/ui/form';
	import { Input } from '$lib/core/components/ui/input';
	import { Button } from '$lib/core/components/ui/button';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { z } from 'zod';
	import type { Snippet } from 'svelte';
	let {
		formData,
		registrationLink,
		logo_url
	}: {
		formData: SuperValidated<z.infer<typeof passwordLoginSchema>>;
		registrationLink?: Snippet;
		logo_url?: string;
	} = $props();

	const form = superForm(formData, {
		validators: zod(passwordLoginSchema, {
			defaults: {
				email: '',
				password: ''
			}
		})
	});
	const { enhance, form: inputData } = form;
</script>

<section>
	<form method="post" use:enhance class="rounded-md border border-primary p-8">
		{#if logo_url}
			<img src={logo_url} alt="Logo" class="mx-auto mb-4 aspect-square h-20" />
		{/if}
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} type="email" bind:value={$inputData.email} />
			</Form.Control>
			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Hasło</Form.Label>
				<Input {...attrs} type="password" bind:value={$inputData.password} />
			</Form.Control>
			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex flex-col gap-2">
			<Button type="submit">Zaloguj</Button>
			{#if registrationLink}
				{@render registrationLink()}
			{/if}
		</div>
	</form>
</section>
