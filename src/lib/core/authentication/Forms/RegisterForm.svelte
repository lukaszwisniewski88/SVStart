<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '$lib/core/components/ui/form';
	import { Input } from '$lib/core/components/ui/input';
	import { Button } from '$lib/core/components/ui/button';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { z } from 'zod';
	import type { Snippet } from 'svelte';
	import { registerSchema } from './registerForm';
	let {
		formData,
		loginLink,
		logo
	}: {
		formData: SuperValidated<z.infer<typeof registerSchema>>;
		loginLink?: Snippet;
		logo?: Snippet;
	} = $props();

	const form = superForm(formData, {
		validators: zod(registerSchema, {
			defaults: {
				email: '',
				password: '',
				confirmPassword: ''
			}
		})
	});
	const { enhance, form: inputData } = form;
</script>

<section>
	<form method="post" use:enhance class="rounded-md border border-primary p-8">
		{#if logo}
			{@render logo()}
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
			<Form.Description>
				Hasło musi zawierać co najmniej 8 znaków, w tym jedną cyfrę, jedną dużą literę i jeden znak
				specjalny.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="confirmPassword">
			<Form.Control let:attrs>
				<Form.Label>Powtórz hasło</Form.Label>
				<Input {...attrs} type="password" bind:value={$inputData.confirmPassword} />
			</Form.Control>
			<Form.Description></Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<div class="flex flex-col gap-2">
			<Button type="submit">Zarejestruj się</Button>
			{#if loginLink}
				{@render loginLink()}
			{/if}
		</div>
	</form>
</section>
